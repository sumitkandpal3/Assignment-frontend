import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from '/hero.webp';
import API from "../../utils/API";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true);
        
        const productsResponse = await API.get("/products/all");
        
        setProducts(productsResponse.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    setLoading(true);
    try {
      const { data } = await API.post("/cart/add", {
        productId: productId,
        quantity: 1,
      });
      if (data.success) {
        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to MyStore</h1>
            <p className="text-xl mb-6">
              Discover our exclusive collection now!
            </p>
            <Link
              to="/products"
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sample Category */}
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <img
              src="/phones.webp"
              alt="Category 1"
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Electronics</h3>
            <Link to="/products" className="text-blue-500 hover:underline">
              Explore Electronics
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <img
              src="/fashion.webp"
              alt="Category 2"
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Fashion</h3>
            <Link to="/products" className="text-blue-500 hover:underline">
              Discover Fashion
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <img
              src="/electronic.jpg"
              alt="Category 3"
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Home Appliances</h3>
            <Link to="/products" className="text-blue-500 hover:underline">
              Browse Home Appliances
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Featured Products
        </h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg p-4 text-center">
                <img
                  src={product?.thumbnail || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">Category: {product.category.name}</p>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-gray-800 text-white py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg">
            <p className="italic">"Great products and fantastic service!"</p>
            <p className="mt-4 font-semibold">- John Doe</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <p className="italic">"I love the quality and the prices."</p>
            <p className="mt-4 font-semibold">- Jane Smith</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <p className="italic">
              "Fast shipping and excellent customer support."
            </p>
            <p className="mt-4 font-semibold">- Michael Brown</p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter for the latest updates and offers.
        </p>
        <form className="max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
