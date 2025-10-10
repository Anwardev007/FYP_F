import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        const formData = new FormData();
        formData.append('image', image);
        formData.append('question', question);
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/vqa', formData);
            setAnswer(res.data.answer);
            setLoading(false);
        } catch (error) {
            console.error('VQA failed:', error);
        }
        // finally {
        //     setLoading(false); // ✅ stop loading in both success or error
        // }
    };

    const goToToolkit = () => {
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">🧠 Visual Q&A System</h2>
            <input type="file" accept="image/*" onChange={handleImage} className="w-full mb-4" disabled={loading} />
            <input
                type="text"
                placeholder="Ask a question about the image"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full p-2 text-white rounded transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Asking...' : 'Ask'}
            </button>

            {loading && (
                <div className="flex justify-center items-center mt-6">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {answer && (
                <p className="mt-4 text-center text-lg font-semibold">Answer: {answer}</p>
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

export default VisualQnA;
