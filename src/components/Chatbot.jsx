import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    // add user message
    setChat(prev => [...prev, { user: message, bot: '' }]);

    try {
      const response = await axios.post('http://localhost:5000/chatbot', { message });

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

  const clearChat = () => {
    setChat([]);     // clear all messages
    setMessage('');  // clear input
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>

      {isOpen && (
        <div className="bg-white w-80 h-96 p-4 rounded shadow-lg mt-2 flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-700">Chat Assistant</h2>

            <button
              onClick={clearChat}
              className="text-red-600 text-sm hover:text-red-800"
            >
              🧹 Clear
            </button>
          </div>

          {/* Chat Box */}
          <div className="flex-1 overflow-y-auto space-y-2 border p-2 rounded bg-gray-50">
            {chat.map((msg, index) => (
              <div key={index} className="text-sm">
                <p className="text-blue-700 font-semibold">You: {msg.user}</p>
                <p className="text-gray-700">Bot: {msg.bot || 'Typing...'}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex space-x-2 mt-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Ask something..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

export default Chatbot;
