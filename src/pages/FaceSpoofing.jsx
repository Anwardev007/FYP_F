import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
    width: 450,
    height: 350,
    facingMode: "user",
};

export default function FaceSpoofing() {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // 📸 Capture Image
    const captureImage = () => {
        const imgSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imgSrc);
        setResult(null);
    };

    // 📤 Upload to Backend
    const analyzeImage = async () => {
        if (!capturedImage) return alert("Please capture an image first!");

        try {
            setLoading(true);
            setResult(null);

            const blob = await (await fetch(capturedImage)).blob();
            const formData = new FormData();
            formData.append("file", blob, "captured.jpg");

            const res = await axios.post(
                "http://localhost:5000/spoofing",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setResult(res.data);
        } catch (err) {
            console.error("UPLOAD ERROR:", err.response?.data || err.message);
            alert("Error analyzing image.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black 
          flex flex-col items-center py-10 px-6 text-white"
        >
            <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r 
                from-purple-400 to-blue-400 text-transparent bg-clip-text drop-shadow-lg">
                🛡️ Face Spoofing Detection
            </h1>

            {/* WEBCAM FEED */}
            {!capturedImage && (
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 mb-4">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
            )}

            {/* CAPTURED IMAGE PREVIEW */}
            {capturedImage && (
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 mb-4">
                    <img src={capturedImage} alt="Captured" className="w-[450px] h-[350px]" />
                </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-4 mb-6">
                {!capturedImage ? (
                    <button
                        onClick={captureImage}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
                      text-white font-semibold shadow-lg transition-all"
                    >
                        📸 Capture
                    </button>
                ) : (
                    <>
                        <button
                            onClick={analyzeImage}
                            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 
                        text-white font-semibold shadow-lg transition-all"
                            disabled={loading}
                        >
                            {loading ? "Analyzing..." : "🔍 Analyze"}
                        </button>

                        <button
                            onClick={() => {
                                setCapturedImage(null);
                                setResult(null);
                            }}
                            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 
                        text-white font-semibold shadow-lg transition-all"
                        >
                            🔄 Retake
                        </button>
                    </>
                )}
            </div>

            {/* RESULT UI */}
            {result && (
                <div className="mt-6 bg-white/10 backdrop-blur-2xl p-6 rounded-2xl 
                        border border-white/20 shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold mb-3">🎯 Result</h2>

                    <p className="text-lg mb-2">
                        <strong>Status:</strong>{" "}
                        {result.is_spoof ? (
                            <span className="text-red-400 font-bold">Fake / Spoof</span>
                        ) : (
                            <span className="text-green-400 font-bold">Real Face</span>
                        )}
                    </p>

                    <p className="text-white/70">
                        <strong>Real Score:</strong> {result.real_score}%
                    </p>
                    <p className="text-white/70">
                        <strong>Spoof Score:</strong> {result.spoof_score}%
                    </p>

                    <p className="mt-4 italic text-white/60">{result.message}</p>
                </div>
            )}
        </div>
    );
}
