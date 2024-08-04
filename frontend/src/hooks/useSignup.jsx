import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const signup = async ({
    fullname,
    username,
    password,
    confirmpassword,
    gender,
  }) => {
    if (!handleError(fullname, username, password, confirmpassword, gender)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmpassword,
          gender,
        }),
      });

      const data = await res.json();

      // Log the response for debugging
      console.log("Signup response:", data);

      if (res.ok && data.success) {
        // Extract token and user data
        const { token, user } = data;

        // Store token in localStorage
        localStorage.setItem("chat-token", token);

        // Update auth context with user and token
        setAuthUser({ ...user, token });

        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to signup");
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Signup error:", error.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleError(fullname, username, password, confirmpassword, gender) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmpassword) {
    toast.error("Passwords don't match");
    return false;
  }
  return true;
}
