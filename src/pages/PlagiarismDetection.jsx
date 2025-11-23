import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const PlagiarismDetection = () => {
  const [files, setFiles] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/recommendations')
      .then((response) => setRecommendations(response.data.recommendations))
      .catch((error) => console.error('Error fetching recommendations:', error));
  }, []);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length < 2) {
      alert('Please select at least two files');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/results');
    } catch (error) {
      console.error('Error uploading files:', error);
      setLoading(false);
    }
  };

  const goToToolkit = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black 
                 flex items-center justify-center px-4"
        style={{ backgroundAttachment: 'fixed' }}
      >
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 max-w-3xl w-full border border-white/20">
          {/* --- HEADER --- */}
          <h2 className="text-4xl font-bold text-center mb-2 text-white drop-shadow-lg">
            🧠 AI Plagiarism Detector
          </h2>
          <p className="text-center text-white/80 mb-6 text-lg">
            Compare and detect similarity between multiple handwritten or typed PDFs using AI.
          </p>

          {/* --- UPLOAD SECTION --- */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3 text-white/90">
                Upload Multiple Assignment Files
              </label>

              <div className="border-2 border-dashed border-blue-400/40 bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-all cursor-pointer">
                <label className="text-white/80 font-medium cursor-pointer">
                  📄 Click or Drag & Drop PDFs here
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* --- SUBMIT BUTTON --- */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${loading
                ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 shadow-lg text-white'
                }`}
            >
              {loading ? 'Comparing Files...' : 'Compare All Files'}
            </button>

            {/* --- LOADING INDICATOR --- */}
            {loading && (
              <div className="flex justify-center items-center mt-6">
                <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </form>

          {/* --- RECOMMENDATIONS --- */}
          <div className="mt-10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 shadow-inner border border-white/20 text-white">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              💡 Recommendations
            </h3>
            {recommendations.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2 text-white/90">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white/70 italic">No recommendations yet.</p>
            )}
          </div>

          {/* --- GO TO TOOLKIT BUTTON --- */}
          <div className="mt-10 text-center">
            <button
              onClick={goToToolkit}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold 
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

export default PlagiarismDetection;
