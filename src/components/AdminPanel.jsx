import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/API";
import axios from "axios";

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState("");

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const navigate = useNavigate();

  const handleUpdate = async (id) => {
    navigate(`/admin/product/update/${id}`);
  };

  const fetchData = async () => {
    try {
      const categoryRes = await API.get("/categories/all");

      setCategories(categoryRes.data.categories);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  const handleCategory = async () => {
    if (!cat) return;
    try {
      const { data } = await API.post("/categories/create", { name: cat });
      setCat("");
      fetchData();
    } catch (e) {
      setError("Failed to add category");
    }
  };

  const handleChange = (event) => {
    setLoading(true);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result;

        // Prepare the form data to send to Cloudinary
        const formData = { file: base64Image, upload_preset: "chat-app" };

        try {
          // Make the request to Cloudinary's API
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dwlezv6pr/image/upload",
            formData
          );

          // Get the URL of the uploaded image
          const cloudinaryUrl = response.data.secure_url;

          // Set the thumbnail to the Cloudinary URL
          setThumbnail(cloudinaryUrl);

          console.log("Uploaded to Cloudinary, URL:", cloudinaryUrl);
        } catch (error) {
          console.log("Error uploading to Cloudinary:", error);
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const convertFilesToUrls = (filesArray) => {
    const urls = [];
    try {
      filesArray.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result;

          // Prepare the form data to send to Cloudinary
          const formData = { file: base64Image, upload_preset: "chat-app" };

          try {
            setLoading(true);
            // Make the request to Cloudinary's API
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dwlezv6pr/image/upload", // Replace with your Cloudinary cloud name
              formData
            );

            // Get the URL of the uploaded image
            const cloudinaryUrl = response.data.secure_url;

            urls.push(cloudinaryUrl);

            console.log("Uploaded to Cloudinary, URL:", cloudinaryUrl);
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
          }

          // Update the state when all files are processed
          if (urls.length === filesArray.length) {
            console.log("urls: ", urls);
            setImages(urls);
            setLoading(false);
          }
        };
        reader.readAsDataURL(file);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const bodyData = {
      name,
      description,
      price,
      category,
      thumbnail,
      images,
      stock,
    };
    console.log(bodyData);

    try {
      setLoading(true);
      const { data } = await API.post("/products/create", bodyData);

      if (data.success) {
        fetchData();
        // setProducts([...products, data.product]);
        setName("");
        setDescription("");
        setStock("");
        setCategory("");
        setThumbnail("");
        setImages([]);
        setPrice("");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        if (fileInputRef2.current) {
          fileInputRef2.current.value = null;
        }
      } else {
        setError("Failed to add product");
      }
    } catch (err) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-8">
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Add new category
            </label>
            <div className="flex">
              <input
                type="text"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="p-1 border border-gray-300 rounded"
              />
              <div
                className="btn px-2 py-1 bg-blue-300"
                onClick={handleCategory}
              >
                Add
              </div>
            </div>
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ThumbNail Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Images
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              ref={fileInputRef2}
              multiple
              onChange={(e) => {
                const filesArray = Array.from(e.target.files); // Convert FileList to array
                convertFilesToUrls(filesArray);
              }}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          {loading ? (
            <>
              <button className="w-full bg-blue-300 text-white py-2 px-4 rounded">
                uploading...
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          )}
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">{product.price}</td>
                <td className="px-4 py-2 border-b">{product.category.name}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
