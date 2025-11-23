import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const YoutubeDownloader = () => {
    const [url, setUrl] = useState("");
    const [videos, setVideos] = useState([]);
    const [progressText, setProgressText] = useState("");
    const [progressValue, setProgressValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Start Download
    const handleDownload = () => {
        if (!url.trim()) return alert("Enter YouTube URL");

        setProgressText("Starting...");
        setProgressValue(0);
        setLoading(true);

        const eventSource = new EventSource(
            `http://localhost:5000/youtube?url=${encodeURIComponent(url)}`
        );

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // 📥 Real-time Progress
                if (data.status === "downloading") {
                    const percent = parseFloat(data.percent.replace("%", "")); // extract numeric value
                    setProgressValue(percent); // update bar
                    setProgressText(
                        `📥 ${data.percent} | ⚡ ${data.speed || "..."} | ⏳ ${data.eta || "..."}`
                    );
                }

                // 🔄 Processing stage
                if (data.status === "processing") {
                    setProgressText("Processing video...");
                }

                // 🎉 Finished
                if (data.status === "finished") {
                    setProgressValue(100);
                    setProgressText("✅ Download Completed!");

                    setTimeout(() => {
                        setProgressValue(0);
                        setProgressText("");
                    }, 1500);

                    setUrl("");
                    setLoading(false);

                    fetchVideos(); // refresh list immediately
                }

                // ❌ Error
                if (data.status === "error") {
                    setProgressText(`❌ ${data.message}`);
                    setLoading(false);
                }
            } catch (err) {
                console.warn("Invalid SSE message:", event.data);
            }
        };

        // Close stream when Python ends
        eventSource.addEventListener("done", () => {
            eventSource.close();
        });
    };

    const handleDelete = async (name) => {
        // Stop the video streaming before deletion
        const videoEl = document.querySelector(`video[data-name="${name}"]`);
        if (videoEl) {
            videoEl.pause();
            videoEl.src = "";
            videoEl.load();
        }

        const yes = window.confirm("Are you sure you want to delete this video?");
        if (!yes) return;

        try {
            await axios.delete(`http://localhost:5000/videos/${name}`);
            fetchVideos();
        } catch (err) {
            alert("Failed to delete video");
        }
    };



    // 📁 Load existing downloads
    const fetchVideos = () => {
        axios
            .get("http://localhost:5000/videos")
            .then((res) => setVideos(res.data.videos || []))
            .catch(console.error);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <Layout>
            <div
                className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black 
                 flex items-center justify-center px-4"
                style={{ backgroundAttachment: "fixed" }}
            >
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 max-w-3xl w-full border border-white/20">

                    {/* HEADER */}
                    <h2 className="text-4xl font-bold text-center mb-2 text-white drop-shadow-lg">
                        📥 AI YouTube Downloader
                    </h2>
                    <p className="text-center text-white/80 mb-6 text-lg">
                        Paste a YouTube URL and let AI handle downloads seamlessly.
                    </p>

                    {/* INPUT */}
                    <input
                        type="text"
                        placeholder="Enter YouTube URL"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            if (e.target.value.trim() !== "") setLoading(false);
                        }}
                        className="w-full p-4 bg-white/10 border border-white/30 text-white placeholder-white/50 
         rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-inner transition-all"
                    />

                    {/* BUTTON */}
                    <button
                        onClick={handleDownload}
                        disabled={loading || url.trim() === ""}
                        className={`w-full mt-5 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${loading || url.trim() === ""
                            ? "bg-gray-500 cursor-not-allowed text-gray-300"
                            : "bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 shadow-lg text-white"
                            }`}
                    >
                        {loading ? "Downloading..." : "Start Download"}
                    </button>

                    {/* PROGRESS BAR */}
                    {progressText && (
                        <div className="mt-6">
                            <p className="text-center text-white/90 mb-2">{progressText}</p>

                            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                                    style={{ width: `${progressValue}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* --- DOWNLOADED VIDEOS --- */}
                    <div className="mt-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 shadow-inner border border-white/20 text-white">
                        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            🎞️ Previously Downloaded
                        </h3>

                        {videos.length > 0 ? (
                            <div className="space-y-4">
                                {videos.map((v, i) => (
                                    <div
                                        key={i}
                                        className="bg-black/30 border border-white/15 rounded-xl p-4 flex flex-col gap-2"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="font-semibold truncate">{v.name}</span>

                                            <div className="flex gap-2">
                                                {/* Download Button */}
                                                <a
                                                    href={v.url}
                                                    download
                                                    className="px-3 py-1 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                                                >
                                                    ⬇️ Download
                                                </a>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(v.name)}
                                                    className="px-3 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                                                >
                                                    ❌ Delete
                                                </button>
                                            </div>
                                        </div>

                                        {/* Inline video preview */}
                                        <video
                                            data-name={v.name}
                                            src={v.url}
                                            controls
                                            className="w-full rounded-lg mt-2 max-h-56 bg-black"
                                        />

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white/70 italic">No videos downloaded yet.</p>
                        )}
                    </div>


                    {/* TOOLKIT BUTTON */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => navigate("/")}
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

export default YoutubeDownloader;
