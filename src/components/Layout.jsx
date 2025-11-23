import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const getUser = () => {
    try {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : null;
    } catch {
        return null;
    }
};

const Layout = ({ children }) => {
    const user = getUser();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen">
            {/* SIDEBAR */}
            <div className="w-72 bg-gradient-to-br from-[#1D1F3F] to-[#3C0B52] 
          p-6 text-white flex flex-col gap-8 shadow-xl">

                {/* LOGO */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 text-transparent bg-clip-text">
                        🤖 AI Toolkit
                    </h1>
                    <p className="text-sm text-white/60">FacewellAI-Suite</p>
                </div>

                {/* SHOW USER ONLY IF LOGGED IN */}
                {user && (
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 shadow-inner">
                        <p className="text-xs text-white/60">Logged in as</p>
                        <p className="font-semibold text-lg">{user.username}</p>

                        <button
                            onClick={logout}
                            className="mt-3 text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg w-full"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* NAVIGATION */}
                <nav className="flex flex-col gap-4 mt-4">

                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/">
                        <span>⚙️</span> Toolkit
                    </Link>

                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/plagiarism">
                        <span>📝</span> Plagiarism
                    </Link>

                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/news">
                        <span>🗞️</span> News Reader
                    </Link>

                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/youtube">
                        <span>📥</span> YouTube
                    </Link>

                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/qrcode">
                        <span>🔳</span> QR Code
                    </Link>

                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/vqa">
                        <span>🧠</span> Visual Q&A
                    </Link>
                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/translate">
                        <span>🌍</span> Translator
                    </Link>
                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/signature">
                        <span>✒️</span> Signature Forgery Detection
                    </Link>
                    <Link className="flex items-center gap-3 hover:text-purple-300" to="/file-converter">
                        <span>📄</span> File Converter
                    </Link>
                </nav>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default Layout;
