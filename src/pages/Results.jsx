import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Results() {
  const [comparisons, setComparisons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/results', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setComparisons(response.data.comparisons || []);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResults();
  }, []);

  const goToToolkit = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Comparison Results</h2>
      {comparisons.length === 0 ? (
        <p className="text-center">No results to display.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">File A</th>
              <th className="p-2 border">File B</th>
              <th className="p-2 border">Similarity %</th>
              <th className="p-2 border">Plagiarized</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((comp, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{comp.file1}</td>
                <td className="p-2 border">{comp.file2}</td>
                <td className="p-2 border">{comp.similarity}%</td>
                <td className="p-2 border">{comp.plagiarized ? "✅ Yes" : "❌ No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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

export default Results;
