import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const QrCodeGenerator = () => {
    const [text, setText] = useState('');
    const [qrImage, setQrImage] = useState(null);
    const navigate = useNavigate(); // Hook for redirection

    const generateQR = async () => {
        try {
            const res = await axios.post('http://localhost:5000/qrcode', { text });
            setQrImage(res.data.file);
        } catch (error) {
            console.error('QR generation failed:', error);
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
            console.error('Failed to download QR code:', error);
        }
    };

    const goToToolkit = () => {
        navigate('/');
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">🔳 QR Code Generator</h2>
            <input
                type="text"
                placeholder="Enter text or URL"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={generateQR}
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
                Generate QR Code
            </button>

            {qrImage && (
                <div className="mt-6 text-center">
                    <img
                        src={`http://localhost:5000/${qrImage}`}
                        alt="QR Code"
                        className="mx-auto mb-4"
                    />
                    <button
                        onClick={downloadQR}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        ⬇️ Download QR Code
                    </button>
                </div>
            )}

            <div className="mt-10 text-center">
                <button
                    onClick={goToToolkit}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Go to Toolkit
                </button>
            </div>
        </div>
    );
};

export default QrCodeGenerator;
