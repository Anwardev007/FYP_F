import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear token
        localStorage.removeItem("token");

        // Delay UI animation then redirect
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    }, [navigate]);

    return (
        <Layout>
            <div
                className="min-h-screen flex items-center justify-center 
                       bg-gradient-to-br from-blue-900 via-purple-900 to-black px-4"
                style={{ backgroundAttachment: "fixed" }}
            >
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
                            shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">

                    <h2 className="text-3xl font-extrabold text-white drop-shadow mb-4">
                        👋 Logging Out...
                    </h2>

                    <p className="text-white/70 mb-6">
                        Please wait a moment while we securely end your session.
                    </p>

                    {/* Loader */}
                    <div className="flex justify-center">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-blue-400 
                                    rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Logout;
