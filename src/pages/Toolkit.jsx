import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const tools = [
    { name: 'Plagiarism Detection', route: '/plagiarism', icon: '📝' },
    { name: 'News Reader', route: '/news', icon: '🗞️' },
    { name: 'YouTube Downloader', route: '/youtube', icon: '📥' },
    { name: 'QR Code Generator', route: '/qrcode', icon: '🔳' },
    { name: 'Visual Q&A', route: '/vqa', icon: '🧠' },
];

const ToolkitPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-10">🤖 AI Toolkit</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => navigate(tool.route)}
                        className="cursor-pointer bg-gray-700 rounded-2xl shadow-xl p-6 text-center hover:bg-gray-600 transition-colors duration-200"
                    >
                        <div className="text-5xl mb-4">{tool.icon}</div>
                        <h2 className="text-xl font-semibold">{tool.name}</h2>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ToolkitPage;
