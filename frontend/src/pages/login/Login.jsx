import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import "../../index.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loading, login } = useLogin();

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await login(inputs);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-500">Chatapp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="w-full input input-bordered h-10 mt-2"
              placeholder="Username"
              value={inputs.username}
              onChange={handleChange}
              name="username"
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full input input-bordered h-10 mt-2"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/signup"
          >
            Don't have an account? Sign Up
          </Link>
          <button
            type="submit"
            className="btn btn-block btn-sm mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
