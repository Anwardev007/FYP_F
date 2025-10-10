import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PlagiarismDetection from './pages/PlagiarismDetection';
import Results from './pages/Results';
import Chatbot from './components/Chatbot';
import ToolkitPage from './pages/Toolkit';
import NewsReader from './pages/NewsReader';
import YoutubeDownloader from './pages/YoutubeDownloader';
import QrCodeGenerator from './pages/QrCodeGenerator';
import VisualQnA from './pages/VisualQnA';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<ToolkitPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/plagiarism"
            element={
              <ProtectedRoute>
                <PlagiarismDetection />
              </ProtectedRoute>
            }
          />
          <Route path="/results" element={<ProtectedRoute>
            <Results />
          </ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute>
            <NewsReader />
          </ProtectedRoute>} />
          <Route path="/youtube" element={<ProtectedRoute>
            <YoutubeDownloader />
          </ProtectedRoute>} />
          <Route path="/qrcode" element={<ProtectedRoute>
            <QrCodeGenerator />
          </ProtectedRoute>} />
          <Route path="/vqa" element={<ProtectedRoute>
            <VisualQnA />
          </ProtectedRoute>} />
        </Routes>
        <Chatbot />
      </Router>
    </div>
  );
}

export default App;