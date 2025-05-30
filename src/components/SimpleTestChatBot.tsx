'use client';

import { useState } from 'react';

export default function SimpleTestChatBot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Er ging iets mis');
      }

      const data = await res.json();
      setResponse(data.response);
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Onbekende fout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">
        🤖 Test je Gemini API
      </h2>
      
      <div className="space-y-4">
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Typ hier je bericht voor Gemini..."
            className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>

        <button
          onClick={sendMessage}
          disabled={isLoading || !message.trim()}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {isLoading ? 'Gemini aan het werk...' : 'Verstuur naar Gemini ✨'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <strong>Fout:</strong> {error}
          </div>
        )}

        {response && (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <strong className="text-purple-800">Gemini antwoordt:</strong>
            <div className="mt-2 text-gray-700 whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>💡 <strong>Tip:</strong> Als deze test werkt, dan is je Gemini API correct geconfigureerd!</p>
      </div>
    </div>
  );
} 