import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from "../components/Layout";

const tools = [
    { name: 'Plagiarism Detection', route: '/plagiarism', icon: '📝', color: 'from-blue-500 to-purple-600' },
    { name: 'News Reader', route: '/news', icon: '🗞️', color: 'from-yellow-400 to-orange-500' },
    { name: 'YouTube Downloader', route: '/youtube', icon: '📥', color: 'from-green-500 to-teal-500' },
    { name: 'QR Code Generator', route: '/qrcode', icon: '🔳', color: 'from-pink-500 to-purple-600' },
    { name: 'Visual Q&A', route: '/vqa', icon: '🧠', color: 'from-cyan-500 to-blue-600' },
    { name: "Signature Forgery Detection", route: "/signature", icon: "✍️", color: "from-amber-500 to-red-500" },
    // { name: "Face Spoofing Detection", route: "/spoofing", icon: "🕵️‍♂️", color: "from-emerald-500 to-lime-500" },
    // { name: 'Math Solver', route: '/math-solver', icon: '✏️', color: 'from-emerald-500 to-lime-500' },
    { name: 'Translator', route: '/translate', icon: '🌍', color: 'from-emerald-500 to-lime-500' },
    { name: 'File Converter', route: '/file-converter', icon: '📄', color: 'from-emerald-500 to-lime-500' },
];

// Get logged in user
const getUser = () => {
    try {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : null;
    } catch {
        return null;
    }
};

const ToolkitPage = () => {
    const navigate = useNavigate();
    const user = getUser();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <Layout>
            <div
                className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black 
                text-white flex flex-col items-center px-6 py-12"
                style={{ backgroundAttachment: "fixed" }}
            >

                {/* SHOW THIS ONLY IF USER IS LOGGED IN */}
                {user && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-6xl 
                        bg-white/10 backdrop-blur-2xl 
                        border border-white/20 
                        rounded-2xl shadow-lg 
                        px-6 py-4 mb-10
                        flex justify-between items-center"
                    >
                        <h1 className="text-xl font-bold text-white">🔥 Multi-Module AI Document Processing & Assistance System</h1>

                        <div className="flex items-center gap-4">
                            {/* Logged-in user */}
                            <div className="text-right">
                                <p className="text-xs text-white/60">Logged in as</p>
                                <p className="font-semibold">{user.username || user.email}</p>
                            </div>

                            {/* Logout button */}
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* PAGE TITLE */}
                <motion.h1
                    className="text-5xl font-extrabold text-center mb-12 drop-shadow-lg"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    🤖 <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        AI Toolkit
                    </span>
                </motion.h1>

                {/* TOOL GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            whileHover={{ scale: 1.08, rotate: 1 }}
                            whileTap={{ scale: 0.96 }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(tool.route)}
                            className={`cursor-pointer relative group bg-white/10 backdrop-blur-2xl 
                            border border-white/20 rounded-3xl shadow-2xl p-8 text-center`}
                        >
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tool.color} 
                                opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}>
                            </div>
                            <div className="relative z-10">
                                <div className="text-6xl mb-4 drop-shadow-lg">{tool.icon}</div>
                                <h2 className="text-xl font-semibold tracking-wide">{tool.name}</h2>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FOOTER */}
                <motion.footer
                    className="mt-16 text-white/60 text-sm tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    © {new Date().getFullYear()} AI Toolkit Suite — Developed by Anwar 🚀
                </motion.footer>
            </div>
        </Layout>
    );
};

export default ToolkitPage;
