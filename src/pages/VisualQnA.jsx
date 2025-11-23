import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const VisualQnA = () => {
    const [image, setImage] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!image || !question.trim()) {
            alert('Please upload an image and enter a question.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('question', question);
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/vqa', formData);
            setAnswer(res.data.answer);
        } catch (error) {
            console.error('❌ VQA failed:', error);
            setAnswer('Error: Unable to process the question.');
        } finally {
            setLoading(false);
        }
    };

    const goToToolkit = () => navigate('/');

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
                        🧠 Visual Question & Answer
                    </h2>
                    <p className="text-center text-white/80 mb-6 text-lg">
                        Upload an image and ask a question — let AI describe or analyze it for you.
                    </p>

                    {/* --- IMAGE UPLOAD --- */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-3 text-white/90">
                            Upload Image
                        </label>
                        <div className="border-2 border-dashed border-blue-400/40 bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all cursor-pointer">
                            <label className="text-white/80 font-medium cursor-pointer">
                                📷 Click or drag an image here
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                    disabled={loading}
                                />
                            </label>
                        </div>
                    </div>

                    {/* --- QUESTION INPUT --- */}
                    <input
                        type="text"
                        placeholder="Ask a question about the image..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/30 text-white placeholder-white/50 
                     rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-inner transition-all mb-5"
                        disabled={loading}
                    />

                    {/* --- ASK BUTTON --- */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${loading
                            ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 shadow-lg text-white'
                            }`}
                    >
                        {loading ? 'Processing...' : 'Ask AI'}
                    </button>

                    {/* --- LOADING SPINNER --- */}
                    {loading && (
                        <div className="flex justify-center items-center mt-6">
                            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* --- RESULT SECTION --- */}
                    {answer && (
                        <div className="mt-8 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 shadow-inner border border-white/20 text-white">
                            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                🤖 AI’s Response
                            </h3>
                            <p className="text-white/90 leading-relaxed">{answer}</p>
                        </div>
                    )}

                    {/* --- TOOLKIT NAV BUTTON --- */}
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

export default VisualQnA;
