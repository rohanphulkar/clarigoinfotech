import React from "react";
import { Error } from "../../components/Toast";
import axios from "axios";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login/`,
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const status = await response.status;
      if (status == 200) {
        const data = response.data;
        sessionStorage.setItem("jwt", data.token);
        sessionStorage.setItem("username", data.username);
        window.location.replace("/");
      } else {
        Error("Something went wrong!");
      }
    } catch {
      Error("Something went wrong!");
    }
  };
  return (
    <div>
      <main className="w-full max-w-md mx-auto p-6 py-7">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-xl shadow-blue-100">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">Login</h1>
            </div>
            <div className="mt-5">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label htmlFor="username" className="block text-sm mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  {/* End Form Group */}
                  {/* Form Group */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm mb-2">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="py-3 border px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  {/* End Form Group */}

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >
                    Login
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
