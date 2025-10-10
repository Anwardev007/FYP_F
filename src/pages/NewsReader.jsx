import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this line

const NewsReader = () => {
    const [inputText, setInputText] = useState('');
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/news', {
                text: inputText,
            });
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
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">📰 AI News Summarizer</h2>
            <textarea
                rows={6}
                className="w-full p-3 border rounded shadow"
                placeholder="Paste or type your news article here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Summarizing...' : 'Summarize News'}
            </button>

            {news && (
                <div className="mt-6 p-4 shadow-md bg-white rounded">
                    <h3 className="text-xl font-semibold">{news.title}</h3>
                    <p className="text-sm text-gray-700 mt-2">{news.summary}</p>
                </div>
            )}

            <div className="mt-10 text-center">
                <button
                    onClick={goToToolkit}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Go to Toolkit
                </button>
            </div>
        </div>
    );
};

export default NewsReader;
