import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Error } from "../../components/Toast";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`
      );
      const status = await response.status;
      if (status === 200) {
        setProduct(response.data);
      } else {
        Error("Something went wrong!");
      }
    } catch {
      Error("Something went wrong!");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  return (
    <div>
      <div>
        <div className="max-w-7xl px-4  py-20 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            {product && (
              <>
                <div
                  className="space-y-5 md:space-y-8"
                  data-aos="fade-zoom-in"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="false"
                >
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold md:text-3xl capitalize">
                      {product.name}
                    </h2>
                    <p className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-lg font-bold text-blue-600">
                      Price : &#36;{product.price}
                    </p>
                    <div>
                      <p className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200">
                        Quantity :{" "}
                        <span className="font-bold">{product.quantity}</span>
                      </p>
                    </div>
                  </div>

                  <img
                    className="w-full object-cover rounded-xl"
                    src={product.image}
                    alt={product.name}
                  />

                  <p className="text-lg text-gray-800">{product.description}</p>
                </div>
              </>
            )}

            {/* End Content */}
            <div className="my-8">
              <Link to={`/update/${id}`}>
                <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all  mx-auto">
                  Update Product
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
