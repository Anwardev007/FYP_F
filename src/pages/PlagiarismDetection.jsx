import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlagiarismDetection() {
  const [files, setFiles] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/recommendations')
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
          'Authorization': `Bearer ${token}`,
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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Assignments Matching System</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium">Upload Multiple Assignment Files</label>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? 'Comparing...' : 'Compare All Files'}
        </button>

        {loading && (
          <div className="flex justify-center items-center mt-6">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4">Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={goToToolkit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Toolkit
        </button>
      </div>
    </div>
  );
}

export default PlagiarismDetection;
