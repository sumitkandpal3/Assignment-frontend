import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    thumbnail: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        const categoryRes = await API.get("/categories/all");
        setCategories(categoryRes.data.categories);
        const data = response.data.product;
        setProduct({
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category,
          stock: data.stock,
          thumbnail: data.thumbnail,
          images: data.images,
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleThumbnailChange = async (event) => {
    setLoading(true);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        const formData = { file: base64Image, upload_preset: "chat-app" };

        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dwlezv6pr/image/upload",
            formData
          );
          const cloudinaryUrl = response.data.secure_url;
          setProduct({ ...product, thumbnail: cloudinaryUrl });
          console.log("Uploaded thumbnail to Cloudinary, URL:", cloudinaryUrl);
        } catch (error) {
          console.error("Error uploading thumbnail to Cloudinary:", error);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setLoading(false);
    }
  };

  const handleImagesChange = (event) => {
    const filesArray = Array.from(event.target.files);
    convertFilesToUrls(filesArray);
  };

  const convertFilesToUrls = async (filesArray) => {
    const urls = [];
    setLoading(true);

    try {
      for (let file of filesArray) {
        const reader = new FileReader();

        const fileUploadPromise = new Promise((resolve, reject) => {
          reader.onloadend = async () => {
            const base64Image = reader.result;
            const formData = { file: base64Image, upload_preset: "chat-app" };

            try {
              const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dwlezv6pr/image/upload",
                formData
              );
              const cloudinaryUrl = response.data.secure_url;
              urls.push(cloudinaryUrl);
              console.log("Uploaded to Cloudinary, URL:", cloudinaryUrl);
              resolve();
            } catch (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(error);
            }
          };
          reader.readAsDataURL(file);
        });

        await fileUploadPromise;
      }

      setProduct({ ...product, images: [...product.images, ...urls] });
    } catch (error) {
      console.error("Error processing images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await API.put(`/products/update/${id}`, product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Product updated successfully!");
    } catch (error) {
      console.log("Error updating product:", error);
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Update Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={product.category.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          {product.thumbnail && (
            <div className="relative w-[10rem] z-0">
              <img
                src={product.thumbnail}
                alt={`add thumbnail`}
                className="h-24 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => setProduct({ ...product, thumbnail: "" })}
                className="absolute top-0 right-1 bg-gray-500/50 text-white w-7 h-7 rounded-full"
              >
                X
              </button>
            </div>
          )}
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="image"
            name="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            ref={fileInputRef}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Existing Images
          </label>
          <div className="grid grid-cols-3 gap-4">
            {product.images?.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt={`Product Image ${index + 1}`}
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-1 bg-gray-500/50 text-white w-7 h-7 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="newImages"
            className="block text-sm font-medium text-gray-700"
          >
            Upload New Images
          </label>
          <input
            type="file"
            id="newImages"
            name="newImages"
            ref={fileInputRef2}
            multiple
            onChange={handleImagesChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-center mt-20">
          {!loading ? (
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600/80 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Product
            </button>
          ) : (
            <button className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600/30">
              uploading...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
