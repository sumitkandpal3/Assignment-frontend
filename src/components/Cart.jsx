import React, { useEffect, useState } from "react";
import API from "../../utils/API";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/cart/all");
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      setError(error.messsage);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const { data } = await API.put(`/cart/update/${id}`, { newQuantity });
      if (data.success) {
        setCart(data.cart);
      } else {
        setError("Failed to remove from cart");
      }
    } catch (error) {
      setError(error.messsage);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const { data } = await API.delete(`/cart/remove/${id}`);
      if (data.success) {
        setCart(data.cart);
        fetchCartItems();
      } else {
        setError("Failed to remove from cart");
      }
    } catch (error) {
      setError(error.messsage);
    }
  };

  const calculateTotal = () => {
    return cart?.items && cart.items.length > 0
      ? cart.items
          .reduce(
            (total, item) => total + item.product?.price * item.quantity,
            0
          )
          .toFixed(2)
      : 0;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </header>

      {/* Cart Items Section */}
      <section className="container mx-auto py-8">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold">Your Cart</h2>
          </div>
          <div className="p-4">
            {loading ? (
              <>loading...</>
            ) : !cart ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                <ul>
                  {cart.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center border-b border-gray-300 py-4"
                    >
                      <img
                        src={item.product?.thumbnail}
                        alt={item.product?.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-semibold">
                          {item.product?.name}
                        </h3>
                        <p className="text-gray-600">
                          Price: ₹{item.product?.price}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="mx-2 w-16 text-center border border-gray-300 rounded"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-4 border-t border-gray-300">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Cart;
