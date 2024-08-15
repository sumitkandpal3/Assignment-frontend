import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const productRes = await API.get("/products/all");
      setProducts(productRes.data.products);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };
  const handleUpdate = async (id) => {
    navigate(`/admin/product/update/${id}`);
  };
  const handleDeleteProduct = async (productId) => {
    try {
      const { data } = await API.delete(`/products/delete/${productId}`);
      if (data.success) {
        // setProducts(products.filter((product) => product._id !== productId));
        fetchData();
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="px-5 overflow-x-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center my-10">
          All Product List
        </h2>
        <table className="min-w-full px-5 text-sm   my-10 overflow-x-auto bg-white border border-gray-300 rounded shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b" colSpan={3}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border-b">{product._id}</td>
                <td className="px-4 py-2 border-b">
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="w-24 object-contain"
                  />
                </td>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">{product.price}</td>
                <td className="px-4 py-2 border-b">{product.category.name}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
                <td className="pr-5">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProducts;
