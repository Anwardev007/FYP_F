import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import PlagiarismDetection from './pages/PlagiarismDetection';
import Results from './pages/Results';
import Chatbot from './components/Chatbot';
import ToolkitPage from './pages/Toolkit';
import NewsReader from './pages/NewsReader';
import YoutubeDownloader from './pages/YoutubeDownloader';
import QrCodeGenerator from './pages/QrCodeGenerator';
import VisualQnA from './pages/VisualQnA';
import ProtectedRoute from './components/ProtectedRoute';
import SignatureForgery from './pages/SignatureForgery';
import FaceSpoofing from './pages/FaceSpoofing';
import VerifyEmail from './pages/VerifyEmail';
import MathSolver from "./pages/MathSolver";
import Translator from './pages/Translator';
import FileConverter from './pages/FileConverter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<ToolkitPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />

          <Route
            path="/plagiarism"
            element={
              <ProtectedRoute>
                <PlagiarismDetection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/file-converter"
            element={
              <ProtectedRoute>
                <FileConverter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/translate"
            element={
              <ProtectedRoute>
                <Translator />
              </ProtectedRoute>
            }
          />

          {/* <Route path="/math-solver" element={
            <ProtectedRoute><MathSolver
            />
            </ProtectedRoute>} /> */}
          <Route path="/results" element={<ProtectedRoute>
            <Results />
          </ProtectedRoute>} />
          {/* <Route path="/spoofing" element={
            <ProtectedRoute>
              <FaceSpoofing />
            </ProtectedRoute>
          } /> */}
          <Route path="/signature" element={
            <ProtectedRoute>
              <SignatureForgery />
            </ProtectedRoute>
          } />
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