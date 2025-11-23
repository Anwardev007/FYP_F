import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Translator() {
    const [inputText, setInputText] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [lang, setLang] = useState("en");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendRequest = async () => {
        if (!file && !inputText.trim()) {
            alert("Please upload an image OR type some text.");
            return;
        }

        const formData = new FormData();
        if (file) formData.append("image", file);
        formData.append("text", inputText);
        formData.append("target_lang", lang);

        setLoading(true);
        setResult(null);

        try {
            const res = await axios.post("http://localhost:5000/translate", formData);
            setResult(res.data);
        } catch (error) {
            setResult({
                original_text: inputText || "",
                translated_text: "⚠ Translation failed. Try again.",
                src_lang: "unknown",
                target_lang: lang,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        setFile(f);
        if (f) setPreview(URL.createObjectURL(f));
    };

    return (
        <Layout>
            <div className="min-h-screen flex justify-center items-center px-4 py-10 
                        bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">

                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 
                            rounded-3xl p-8 shadow-2xl">

                    {/* Header */}
                    <h1 className="text-3xl font-extrabold mb-4 text-center">
                        🌍 Language Translator
                    </h1>
                    <p className="text-center text-white/70 mb-6">
                        Translate text or extract & translate from an uploaded image.
                    </p>

                    {/* Text Input */}
                    <textarea
                        className="w-full p-4 rounded-xl text-black bg-white shadow-md 
                               focus:ring-2 focus:ring-blue-400 outline-none transition"
                        rows="4"
                        placeholder="Type text here..."
                        onChange={(e) => setInputText(e.target.value)}
                    />

                    {/* File Upload */}
                    <div className="mt-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="text-sm block w-full text-white 
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-lg file:border-0
                                   file:bg-blue-600 file:text-white
                                   hover:file:bg-blue-700 cursor-pointer"
                        />

                        {/* Preview */}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-4 max-h-48 rounded-xl shadow-lg 
                                       border border-white/30 object-contain"
                            />
                        )}
                    </div>

                    {/* Language Dropdown */}
                    <div className="mt-4">
                        <label className="font-semibold">Select Target Language:</label>
                        <select
                            className="w-full mt-2 p-3 rounded-xl text-black bg-white shadow-md 
                                   focus:ring-2 focus:ring-blue-400 transition"
                            onChange={(e) => setLang(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="ur">Urdu</option>
                            <option value="ar">Arabic</option>
                            <option value="hi">Hindi</option>
                            <option value="tr">Turkish</option>
                            <option value="zh-cn">Chinese</option>
                        </select>
                    </div>

                    {/* Translate Button */}
                    <button
                        className={`w-full mt-6 py-3 rounded-xl font-semibold text-lg shadow-lg 
                        transition-all duration-300
                        ${loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-green-500 hover:scale-105"
                            }`}
                        disabled={loading}
                        onClick={sendRequest}
                    >
                        {loading ? "Translating..." : "Translate"}
                    </button>

                    {/* Loader */}
                    {loading && (
                        <div className="mt-4 flex justify-center">
                            <div className="w-10 h-10 border-4 border-white/30 border-t-white 
                                        rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Result Card */}
                    {result && (
                        <div className="mt-6 p-5 bg-black/30 border border-white/20 rounded-2xl shadow-inner">
                            <p className="mb-2">
                                <b>Source ({result.src_lang}):</b> {result.original_text}
                            </p>
                            <p>
                                <b>Translated ({result.target_lang}):</b>{" "}
                                <span className="text-green-300">{result.translated_text}</span>
                            </p>
                        </div>
                    )}

                    {/* Back to Toolkit */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 
                                   text-white font-semibold rounded-xl hover:scale-105 
                                   transition-all duration-300 shadow-lg"
                        >
                            ⬅ Back to Toolkit
                        </button>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
