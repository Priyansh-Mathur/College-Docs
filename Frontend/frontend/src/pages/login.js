import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  const handleemialChange = (e) => setemail(e.target.value);
  const handlepasschange = (e) => setpassword(e.target.value);

  const handleclick = async (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);
    try {
      const res = await fetch(apiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert("Server down");
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome Back 👋</h2>

          <form onSubmit={handleclick} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleemialChange}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-white/70 text-white"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handlepasschange}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-white/70 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-lg text-lg font-semibold shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-center text-white/80 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-300 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
