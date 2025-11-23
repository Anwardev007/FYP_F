import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const QrCodeGenerator = () => {
    const [text, setText] = useState('');
    const [qrImage, setQrImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const generateQR = async () => {
        if (!text.trim()) return alert('Please enter text or URL!');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/qrcode', { text });
            setQrImage(res.data.file);
        } catch (error) {
            console.error('❌ QR generation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = async () => {
        try {
            const response = await fetch(`http://localhost:5000/${qrImage}`);
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `qr-code-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('❌ Failed to download QR code:', error);
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
                        🔳 AI QR Code Generator
                    </h2>
                    <p className="text-center text-white/80 mb-6 text-lg">
                        Instantly create and download QR codes for any text or URL.
                    </p>

                    {/* --- INPUT --- */}
                    <input
                        type="text"
                        placeholder="Enter text or URL..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/30 text-white placeholder-white/50 
                     rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-inner transition-all mb-5"
                        disabled={loading}
                    />

                    {/* --- GENERATE BUTTON --- */}
                    <button
                        onClick={generateQR}
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${loading
                            ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 shadow-lg text-white'
                            }`}
                    >
                        {loading ? 'Generating...' : 'Generate QR Code'}
                    </button>

                    {/* --- QR CODE DISPLAY --- */}
                    {qrImage && (
                        <div className="mt-8 flex flex-col items-center bg-white/10 border border-white/20 rounded-xl p-6">
                            <img
                                src={`http://localhost:5000/${qrImage}`}
                                alt="QR Code"
                                className="w-48 h-48 object-contain mb-4 rounded-lg shadow-md"
                            />
                            <button
                                onClick={downloadQR}
                                className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white 
                         font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                ⬇️ Download QR Code
                            </button>
                        </div>
                    )}

                    {/* --- LOADING SPINNER --- */}
                    {loading && (
                        <div className="flex justify-center items-center mt-6">
                            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* --- TOOLKIT NAVIGATION --- */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={goToToolkit}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold 
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

export default QrCodeGenerator;
