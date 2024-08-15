import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await API.get("/products/all");

        let updatedProducts = data?.products?.filter(
          (product) =>
            (selectedCategory === "All" ||
              product.category.name === selectedCategory) &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        updatedProducts = updatedProducts.sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

        setFilteredProducts(updatedProducts);
      } catch (e) {
        console.log(e);
        setFilteredProducts([]);
      }
    };
    getAllProducts();
  }, [searchTerm, selectedCategory, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <p className="text-xl">Explore our diverse range of products</p>
      </header>

      {/* Filter and Search Section */}
      <section className="container mx-auto py-8 px-5 md:px-10 ">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-1/3 p-3 border border-gray-300 rounded mb-4 sm:mb-0"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-3 border border-gray-300 rounded mb-4 sm:mb-0"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home Appliances">Home Appliances</option>
            {/* Add more categories as needed */}
          </select>

          {/* Sort By */}
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="p-3 border border-gray-300 rounded"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto py-8 px-5 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 &&
            filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg flex flex-col justify-between py-4 overflow-hidden border border-gray-300"
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 truncate max-w-full">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Category: {product.category.name}
                  </p>
                  <p className="text-xl font-bold mb-4">₹{product.price}</p>
                  <Link
                    to={`/products/${product._id}`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
