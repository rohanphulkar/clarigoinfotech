import axios from "axios";
import React, { useEffect, useState } from "react";
import { Error, Success } from "../../components/Toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState();
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/`
      );
      const status = await response.status;
      if (status === 200) {
        setProducts(response.data.products);
      } else {
        Error("Something went wrong!");
      }
    } catch {
      Error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/product/${id}`
      );
      const status = await response.status;
      if (status === 200) {
        Success("Product has been deleted sucessfully.");
        await fetchProducts();
      } else {
        Error("Something went wrong!");
      }
    } catch {
      Error("Something went wrong!");
    }
  };
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Dashboard
          </h2>
        </div>
        <div className="my-4">
          <Link to="/add">
            <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all ">
              Add New Product
            </button>
          </Link>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl"
              >
                <div className="flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="p-4 md:p-6">
                  <span className="block mb-1  font-semibold uppercase text-blue-600">
                    &#36;{product.price.toLocaleString()}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-gray-500">
                    {product.description.slice(0, 100)}
                  </p>
                </div>
                <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
                  <Link to={`/product/${product._id}`} className="w-full">
                    <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4">
                      View Product
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-red-700 text-white shadow-sm align-middle hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600 transition-all text-sm sm:p-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          {/* Card */}

          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default Dashboard;
