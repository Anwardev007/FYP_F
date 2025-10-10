import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YoutubeDownloader = () => {
    const [url, setUrl] = useState('');
    const [videos, setVideos] = useState([]);
    const [progress, setProgress] = useState('');
    const navigate = useNavigate();

    const handleDownload = () => {
        setProgress('');
        const eventSource = new EventSource(`http://localhost:5000/youtube?url=${encodeURIComponent(url)}`);

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.status === "downloading") {
                    setProgress(`Progress: ${data.percent} | Speed: ${data.speed} | ETA: ${data.eta}`);
                } else if (data.status === "finished") {
                    setProgress("✅ Download complete!");
                    fetchVideos(); // refresh list
                }
            } catch {
                console.log("Raw:", event.data);
            }
        };

        eventSource.addEventListener('done', () => {
            eventSource.close();
        });
    };

    const fetchVideos = () => {
        axios.get('http://localhost:5000/videos')
            .then(res => setVideos(res.data.videos))
            .catch(console.error);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">📥 YouTube Video Downloader</h2>

            <input
                type="text"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />

            <button
                onClick={handleDownload}
                className="w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white"
            >
                Start Download
            </button>

            {progress && <p className="mt-4 text-blue-600 text-center">{progress}</p>}

            <h3 className="text-xl mt-8 mb-4 font-semibold">Previously Downloaded</h3>
            <ul>
                {videos.map((v, i) => (
                    <li key={i} className="mb-2">
                        <a href={v.url} download className="text-blue-500 underline">{v.name}</a>
                    </li>
                ))}
            </ul>

            <div className="mt-10 text-center">
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Go to Toolkit
                </button>
            </div>
        </div>
    );
};

export default YoutubeDownloader;
