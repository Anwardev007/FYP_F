// src/pages/SignatureForgery.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';

const SignatureForgery = () => {
    const [sig1, setSig1] = useState(null);
    const [sig2, setSig2] = useState(null);
    const [preview1, setPreview1] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFile1 = (e) => {
        const file = e.target.files[0];
        setSig1(file);
        setPreview1(file ? URL.createObjectURL(file) : null);
    };

    const handleFile2 = (e) => {
        const file = e.target.files[0];
        setSig2(file);
        setPreview2(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async () => {
        if (!sig1 || !sig2) {
            return alert("Please upload both signatures");
        }

        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("signature1", sig1);
        formData.append("signature2", sig2);

        try {
            const res = await axios.post(
                "http://localhost:5000/signature",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    },
                }
            );
            setResult(res.data);
        } catch (err) {
            console.error(err);
            alert("Error verifying signatures");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div
                className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black 
                 flex items-center justify-center px-4"
                style={{ backgroundAttachment: "fixed" }}
            >
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 max-w-4xl w-full border border-white/20 text-white">
                    <h2 className="text-4xl font-bold text-center mb-2 drop-shadow-lg">
                        ✍️ Signature Forgery Detection
                    </h2>
                    <p className="text-center text-white/80 mb-6 text-lg">
                        Upload two signatures and let AI check if they belong to the same
                        person or are likely forged.
                    </p>

                    {/* Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex flex-col items-center">
                            <label className="mb-2 font-semibold">Signature A</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFile1}
                                className="w-full text-sm file:mr-3 file:px-3 file:py-2 
                         file:rounded-lg file:border-0 file:bg-blue-500 file:text-white
                         bg-white/10 border border-white/30 rounded-xl p-2"
                            />
                            {preview1 && (
                                <img
                                    src={preview1}
                                    alt="Signature 1"
                                    className="mt-4 max-h-40 object-contain rounded-lg bg-black/40 p-2"
                                />
                            )}
                        </div>

                        <div className="flex flex-col items-center">
                            <label className="mb-2 font-semibold">Signature B</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFile2}
                                className="w-full text-sm file:mr-3 file:px-3 file:py-2 
                         file:rounded-lg file:border-0 file:bg-purple-500 file:text-white
                         bg-white/10 border border-white/30 rounded-xl p-2"
                            />
                            {preview2 && (
                                <img
                                    src={preview2}
                                    alt="Signature 2"
                                    className="mt-4 max-h-40 object-contain rounded-lg bg-black/40 p-2"
                                />
                            )}
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !sig1 || !sig2}
                        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${loading || !sig1 || !sig2
                            ? "bg-gray-500 cursor-not-allowed text-gray-300"
                            : "bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 shadow-lg text-white"
                            }`}
                    >
                        {loading ? "Analyzing..." : "Analyze Signatures"}
                    </button>

                    {/* Result */}
                    {result && result.status === "ok" && (
                        <div className="mt-8 bg-black/40 border border-white/20 rounded-xl p-5">
                            <h3 className="text-2xl font-semibold mb-2">Result</h3>
                            <p className="text-white/90 mb-1">
                                Overall Similarity:{" "}
                                <span className="font-bold">{result.similarity}%</span>
                            </p>
                            <p className="text-white/80 text-sm mb-1">
                                SSIM: {result.ssim_percent}% | ORB Match: {result.orb_percent}%
                            </p>
                            <p className="mt-3 text-lg font-bold">
                                {result.forged ? "⚠️ Likely Forged / Not Same Writer" : "✅ Likely Genuine / Same Writer"}
                            </p>
                        </div>
                    )}

                    {result && result.status === "error" && (
                        <p className="mt-6 text-red-400 text-center">
                            Error: {result.message}
                        </p>
                    )}

                    {/* Back button */}
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


export default SignatureForgery;
