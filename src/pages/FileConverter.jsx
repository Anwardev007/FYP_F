import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function FileConverter() {
    const [file, setFile] = useState(null);
    const [mode, setMode] = useState("word-to-pdf");
    const [loading, setLoading] = useState(false);
    const [convertedUrl, setConvertedUrl] = useState("");
    const [fileName, setFileName] = useState("");

    const convertFile = async () => {
        if (!file) return alert("Select a file first!");

        setLoading(true);
        setConvertedUrl("");
        setFileName("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(
                `http://localhost:5000/file-converter/${mode}`,
                formData
            );

            if (res.data.status === "ok") {
                setConvertedUrl(res.data.file_url);
                setFileName(res.data.filename);
            } else {
                alert("Conversion failed");
            }
        } catch (e) {
            console.error(e);
            alert("Conversion failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-black px-6 py-10 text-white">

                {/* CENTER CARD */}
                <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/20">

                    <h1 className="text-4xl font-extrabold text-center mb-8">
                        📄 File Converter
                    </h1>

                    {/* MODE DROPDOWN */}
                    <div className="flex justify-center mb-6">
                        <select
                            className="p-3 rounded-lg text-black w-60 shadow-md border border-gray-300"
                            onChange={(e) => setMode(e.target.value)}
                        >
                            <option value="word-to-pdf">Word → PDF</option>
                            <option value="pdf-to-word">PDF → Word</option>
                        </select>
                    </div>

                    {/* FILE SELECT */}
                    <div className="flex justify-center">
                        <input
                            className="block w-full max-w-sm text-white bg-white/5 border border-white/30 rounded-lg p-3 cursor-pointer"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    {/* CONVERT BUTTON */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={convertFile}
                            className="px-7 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 transition font-semibold shadow-lg"
                        >
                            {loading ? "Converting..." : "Convert File"}
                        </button>
                    </div>

                    {/* RESULT BOX */}
                    {convertedUrl && (
                        <div className="mt-10 bg-white/10 p-6 rounded-xl border border-white/20">

                            <h2 className="text-2xl font-semibold text-center mb-4">
                                ✅ Conversion Successful
                            </h2>

                            {mode === "word-to-pdf" ? (
                                <iframe
                                    src={convertedUrl}
                                    className="w-full h-[500px] rounded-xl border border-white/20 shadow-xl"
                                ></iframe>
                            ) : (
                                <p className="text-white/80 text-center mb-4">
                                    Word documents cannot be previewed. Download the converted file below.
                                </p>
                            )}

                            <div className="text-center">
                                <a
                                    href={convertedUrl}
                                    download={fileName}
                                    className="mt-4 inline-block px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 transition shadow-lg"
                                >
                                    ⬇ Download {fileName}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
