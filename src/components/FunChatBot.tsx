import { useState, useRef } from 'react';
import VoiceInput from './VoiceInput';

interface Message {
  role: 'user' | 'bot';
  content: string;
  attachment?: {
    name: string;
    content: string;
  };
}

export default function FunChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const systemPrompt = `Je bent een vrolijke chatbot die graag grapjes maakt. 
Als iemand om een grap vraagt, vertel je een leuke, nette grap. 
Als iemand een document uploadt, maak je een grap die past bij de inhoud.
Als iemand iets anders vraagt, probeer je op een grappige manier te antwoorden.
Gebruik emoji's om je antwoorden leuker te maken.
Houd je antwoorden kort en bondig.`;

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.docx') && !file.name.endsWith('.pdf')) {
      alert('Alleen .docx en .pdf bestanden zijn toegestaan!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-docx', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newMessage: Message = {
          role: 'user',
          content: 'Hier is een document om over te praten:',
          attachment: {
            name: file.name,
            content: data.content
          }
        };
        setMessages(prev => [...prev, newMessage]);
        sendToBot(data.content);
      }
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
    if (transcript.trim()) {
      handleSend(transcript);
    }
  };

  const sendToBot = async (content: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${systemPrompt}\n\nGebruiker: ${content}`
        }),
      });

      if (!response.ok) {
        throw new Error('Er ging iets mis bij het ophalen van een antwoord');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: '😅 Oeps! Er ging iets mis. Maar weet je wat nooit faalt? Een glimlach! 😊'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (messageContent: string = input) => {
    if (!messageContent.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: messageContent }]);
    setInput('');
    await sendToBot(messageContent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Chat Messages */}
      <div className="h-[500px] p-4 overflow-y-auto flex flex-col space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>👋 Hoi! Ik ben de Grappenmaker!</p>
            <p className="mt-2">Stuur me een bericht, upload een document, of gebruik de microfoon!</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {message.attachment ? (
                <>
                  <p>{message.content}</p>
                  <div className="mt-2 p-2 bg-white/10 rounded">
                    <p className="text-sm">📎 {message.attachment.name}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.attachment.content.substring(0, 100)}...
                    </p>
                  </div>
                </>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Typ je bericht..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={2}
              disabled={isLoading}
            />
          </div>

          <div className="flex space-x-2">
            {/* File Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Upload document"
            >
              📎
            </button>

            {/* Voice Input */}
            <VoiceInput
              onTranscript={handleVoiceInput}
              isDisabled={isLoading}
            />

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="hidden"
        />
      </div>
    </div>
  );
}