import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        if (data.success) {
          setProduct(data.product);
          setCurrentImage(data.product.thumbnail);
        } else {
          setError("Failed to fetch product details.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const { data } = await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      if (data.success) {
        setSuccessMessage("Product added to cart successfully!");
      } else {
        setError("Failed to add product to cart.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  if (!product) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Product Detail */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto border border-gray-200">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            {/* Main Image */}
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
            />
            {/* Thumbnails */}
            <div className="flex justify-center space-x-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover cursor-pointer rounded-lg shadow-md hover:border-blue-500 hover:border-2 transition duration-300"
                    onClick={() => setCurrentImage(image)}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold text-blue-600 mb-4">
              ₹{product.price}
            </p>
            <p className="text-lg font-medium mb-4 text-gray-800">
              Category:{" "}
              <span className="font-normal text-gray-600">
                {product.category?.name || "N/A"}
              </span>
            </p>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Adding to Cart..." : "Add to Cart"}
            </button>
            {successMessage && (
              <p className="text-green-500 mt-4">{successMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">
          Customer Reviews
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-300 py-4 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.user}
                </h3>
                <p className="text-yellow-500">Rating: {review.rating} ★</p>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            product.relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {relatedProduct.name}
                  </h3>
                  <Link to={`/products/${relatedProduct.id}`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No related products found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
