import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
                 bg-gradient-to-br from-blue-900 via-purple-900 to-black"
      style={{ backgroundAttachment: "fixed" }}
    >
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
                      shadow-2xl rounded-3xl p-8 w-full max-w-md">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-lg mb-2">
          📝 Sign Up
        </h2>
        <p className="text-center text-white/70 mb-6">
          Create your account and join the AI Toolkit.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-200 
                          p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-white/80 text-sm mb-1 block">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 text-white
                         border border-white/30 placeholder-white/40 
                         focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white/80 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 text-white
                         border border-white/30 placeholder-white/40 
                         focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white/80 text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 text-white
                         border border-white/30 placeholder-white/40 
                         focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl text-lg font-semibold text-white
                       bg-gradient-to-r from-purple-500 to-blue-500
                       hover:scale-105 transition-transform shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-white/70 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-300 hover:underline font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
