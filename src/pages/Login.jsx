import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };


  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center px-4
                 bg-gradient-to-br from-blue-900 via-purple-900 to-black"
        style={{ backgroundAttachment: "fixed" }}
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
                      shadow-2xl rounded-3xl p-8 w-full max-w-md">

          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-white text-center drop-shadow-lg mb-2">
            🔐 Login
          </h2>
          <p className="text-center text-white/70 mb-6">
            Access your AI Toolkit dashboard.
          </p>

          {/* Error Box */}
          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-200 
                          p-3 rounded-lg text-center mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                         focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-white/80 text-sm mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white
                         border border-white/30 placeholder-white/40 
                         focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl text-lg font-semibold text-white
                       bg-gradient-to-r from-blue-500 to-purple-600
                       hover:scale-105 transition-transform shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Redirect */}
          <p className="text-center text-white/70 mt-4">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-300 hover:underline font-semibold"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
