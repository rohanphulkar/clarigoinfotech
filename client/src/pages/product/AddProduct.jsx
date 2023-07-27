import axios from "axios";
import React from "react";
import { Error, Success } from "../../components/Toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/add/`,
        {
          name: e.target.name.value,
          category: e.target.category.value,
          price: e.target.price.value,
          quantity: e.target.quantity.value,
          description: e.target.description.value,
          image: e.target.image.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      const status = await response.status;
      if (status == 201) {
        Success("Product has been added");
        navigate("/");
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
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
              Add Product
            </h2>
          </div>
          {/* Card */}
          <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="py-3 px-4 border block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 "
                  placeholder="Name"
                />
              </div>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="py-3 px-4 border block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 "
                  required
                  placeholder="category"
                />
              </div>
              <div className="flex itesm-center gap-x-3">
                <div className="mb-4 sm:mb-8 w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="py-3 px-4 border block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 "
                    required
                    placeholder="Price"
                  />
                </div>
                <div className="mb-4 sm:mb-8 w-full">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    required
                    className="py-3 px-4 border block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 "
                    placeholder="Quantity"
                  />
                </div>
              </div>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  required
                  className="py-3 px-4 border block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 "
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 "
                    required
                    placeholder="Description"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          {/* End Card */}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
