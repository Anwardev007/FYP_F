import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        axios
            .get(`http://localhost:5000/verify/${token}`)
            .then(() => {
                setStatus("✅ Email verified! You can now log in.");
                setTimeout(() => navigate("/login"), 2000);
            })
            .catch(() => {
                setStatus("❌ Invalid or expired verification link.");
            });
    }, [token, navigate]);

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white px-4">
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 max-w-lg w-full text-center">
                    <h1 className="text-3xl font-bold mb-4">Email Verification</h1>
                    <p className="text-lg">{status}</p>
                </div>
            </div>
        </Layout>
    );
};

export default VerifyEmail;
