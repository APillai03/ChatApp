import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useSignup from "../../hooks/useSignup";
import "../../index.css";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup <span className="text-blue-500">Chatapp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="w-full input input-bordered h-10 mt-2"
              placeholder="Full Name"
              value={inputs.fullname}
              onChange={handleChange}
              name="fullname"
            />
          </div>
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
          <div>
            <input
              type="password"
              className="w-full input input-bordered h-10 mt-2"
              placeholder="Confirm Password"
              value={inputs.confirmpassword}
              onChange={handleChange}
              name="confirmpassword"
            />
          </div>
          <div>
            <select
              aria-placeholder="Gender"
              className="w-full input input-bordered h-10 mt-2"
              name="gender"
              value={inputs.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Link
            className="hover:underline hover:text-blue-500 inline-block mt-2"
            to="/login"
          >
            Already have an account?
          </Link>
          <button
            type="submit"
            className="btn btn-block btn-sm mt-2"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
