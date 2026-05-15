import React, { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { apiUrl } from "../config/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //spread operator

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    try {
      const payload = {
        ...formData,
        scholar_id: Number(formData.scholar_id),
        year: Number(formData.year),
      };

      const res = await fetch(apiUrl("/api/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        console.log(data);
        alert("Signup successful");
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert("Error occurred: " + e.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Create Account ✨</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-white/70 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-white/70 text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-white/70 text-white"
            />
            <input
              type="text"
              name="scholar_id"
              placeholder="Scholar Number"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-white/70 text-white"
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-white/70 text-white"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-white/70 text-white"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-3 rounded-lg text-lg font-semibold shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-white/80 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
