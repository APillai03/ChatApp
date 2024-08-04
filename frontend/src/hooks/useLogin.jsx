import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();

  const login = async ({ username, password }) => {
    if (!handleError(username)) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      console.log("Login response:", data);

      const { token, user } = data;

      setAuthUser({ ...user, token });

      localStorage.setItem("chat-token", token);

      if (user && user.username) {
        localStorage.setItem("chat-user", JSON.stringify(user));
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleError(username) {
  if (!username) {
    toast.error("Please fill in the username field");
    return false;
  }
  return true;
}
