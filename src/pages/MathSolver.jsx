// frontend/src/pages/MathSolver.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MathSolver = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [rawLatex, setRawLatex] = useState("");
    const [plainText, setPlainText] = useState("");
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        setError("");
        setResult(null);
        setRawLatex("");
        setPlainText("");
        setExpression("");

        if (f) {
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleSolve = async () => {
        if (!file) {
            setError("Please select an image containing a math expression.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post("http://localhost:5000/math-solver", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.status === "ok") {
                setRawLatex(res.data.raw_latex || "");
                setPlainText(res.data.plain_text || "");
                setExpression(res.data.expression || "");
                setResult(res.data.result || null);
            } else {
                setError(res.data.message || "Failed to solve expression.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error while solving expression.");
        } finally {
            setLoading(false);
        }
    };

    const renderResult = () => {
        if (!result) return null;

        if (result.type === "equation") {
            return (
                <div className="mt-4 text-sm sm:text-base">
                    <p className="font-semibold mb-2">Solutions:</p>
                    {Array.isArray(result.solutions) &&
                        result.solutions.map((sol, i) => (
                            <div key={i} className="mb-1">
                                {Object.entries(sol).map(([variable, value]) => (
                                    <p key={variable}>{variable} = {value}</p>
                                ))}
                            </div>
                        ))}
                </div>
            );
        }

        if (result.type === "expression") {
            return (
                <div className="mt-4 text-sm sm:text-base">
                    <p>
                        <span className="font-semibold">Detected Expression:</span>{" "}
                        {expression}
                    </p>

                    <p>
                        <span className="font-semibold">Simplified:</span>{" "}
                        {result.simplified}
                    </p>

                    {result.numeric !== null && (
                        <p>
                            <span className="font-semibold">Numeric value:</span>{" "}
                            {result.numeric}
                        </p>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br 
            from-blue-900 via-purple-900 to-black px-4 sm:px-6 py-10"
            style={{ backgroundAttachment: "fixed" }}
        >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
                rounded-3xl shadow-2xl p-6 sm:p-8 max-w-4xl w-full text-white">

                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-3">
                    ✏️ Math Solver (Handwritten / Printed)
                </h2>
                <p className="text-center text-white/80 mb-6 text-sm sm:text-base">
                    Upload the equation and we will read it using AI + Pix2Tex and solve it automatically.
                </p>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-2">
                            Select Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm text-white/90 
                                file:mr-3 file:py-2 file:px-4 
                                file:rounded-lg file:border-0 
                                file:text-sm file:font-semibold 
                                file:bg-blue-500 file:text-white 
                                hover:file:bg-blue-600"
                        />

                        <button
                            onClick={handleSolve}
                            disabled={loading || !file}
                            className={`w-full mt-4 py-3 rounded-xl font-semibold text-lg transition-all duration-300 
                                ${loading || !file
                                    ? "bg-gray-500 cursor-not-allowed text-gray-300"
                                    : "bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 shadow-lg text-white"
                                }`}
                        >
                            {loading ? "Solving..." : "Solve Expression"}
                        </button>

                        {error && (
                            <p className="mt-3 text-red-300 text-sm">{error}</p>
                        )}

                        {rawLatex && (
                            <div className="mt-4 text-xs sm:text-sm bg-black/30 border border-white/15 rounded-xl p-3">
                                <p className="font-semibold mb-1">Pix2Tex LaTeX Output:</p>
                                <p className="break-words">{rawLatex}</p>
                            </div>
                        )}

                        {plainText && (
                            <div className="mt-3 text-xs sm:text-sm bg-black/30 border border-white/15 rounded-xl p-3">
                                <p className="font-semibold mb-1">Converted Math Expression:</p>
                                <p className="break-words">{plainText}</p>
                            </div>
                        )}

                        {renderResult()}
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Math preview"
                                className="max-h-64 rounded-2xl border border-white/20 shadow-lg object-contain bg-black/40"
                            />
                        ) : (
                            <div className="h-48 w-full flex items-center justify-center 
                                bg-black/30 border border-dashed border-white/30 
                                rounded-2xl text-white/60 text-sm sm:text-base">
                                Preview appears here after selecting an image.
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 
                        text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        ⬅ Back to Toolkit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MathSolver;
