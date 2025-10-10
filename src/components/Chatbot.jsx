import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setChat([...chat, { user: message, bot: '' }]);
    try {
      const response = await axios.post('http://localhost:5000/api/ai/chatbot', { message });
      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot = response.data.reply;
        return updated;
      });
    } catch (error) {
      console.error('Chatbot error:', error);
    }
    setMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full"
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>
      {isOpen && (
        <div className="bg-white w-80 h-96 p-4 rounded shadow-lg mt-2 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-2">
            {chat.map((msg, index) => (
              <div key={index}>
                <p className="text-blue-600">You: {msg.user}</p>
                <p className="text-gray-600">Bot: {msg.bot || 'Typing...'}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Ask something..."
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;