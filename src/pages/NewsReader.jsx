import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const NewsReader = () => {
    const [inputText, setInputText] = useState('');
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/news', { text: inputText });
            setNews(res.data);
        } catch (error) {
            console.error('❌ Failed to summarize news:', error);
            setNews({ title: 'Error', summary: 'Failed to summarize news.' });
        }
        setLoading(false);
    };

    const goToToolkit = () => {
        navigate('/');
    };

    return (
        <Layout>
            <div
                className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black 
                 flex items-center justify-center px-4"
                style={{ backgroundAttachment: 'fixed' }}
            >
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 max-w-3xl w-full border border-white/20">
                    {/* --- HEADER --- */}
                    <h2 className="text-4xl font-bold text-center mb-2 text-white drop-shadow-lg">
                        📰 AI News Summarizer
                    </h2>
                    <p className="text-center text-white/80 mb-6 text-lg">
                        Instantly summarize long news articles into concise insights using AI.
                    </p>

                    {/* --- TEXTAREA INPUT --- */}
                    <textarea
                        rows={6}
                        className="w-full p-4 bg-white/10 border border-white/30 text-white placeholder-white/50 
                     rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-inner transition-all"
                        placeholder="Paste or type your news article here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={loading}
                    />

                    {/* --- ACTION BUTTON --- */}
                    <button
                        className={`w-full mt-5 py-3 rounded-xl font-semibold text-lg transition-all duration-300 
            ${loading
                                ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 shadow-lg text-white'
                            }`}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Summarizing...' : 'Summarize News'}
                    </button>

                    {/* --- LOADING FEEDBACK --- */}
                    {loading && (
                        <div className="flex justify-center items-center mt-6">
                            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* --- RESULT CARD --- */}
                    {news && (
                        <div className="mt-8 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 
                          shadow-inner border border-white/20 text-white">
                            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                🧩 {news.title || 'Summarized News'}
                            </h3>
                            <p className="text-white/90 leading-relaxed">{news.summary}</p>
                        </div>
                    )}

                    {/* --- TOOLKIT BUTTON --- */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={goToToolkit}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold 
                       rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Go to Toolkit
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NewsReader;
