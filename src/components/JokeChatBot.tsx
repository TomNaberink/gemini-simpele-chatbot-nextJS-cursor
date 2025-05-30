'use client'

import { useState } from 'react'

export default function JokeChatBot() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot', content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const systemPrompt = `Je bent een vrolijke chatbot die graag grapjes maakt. 
Als iemand om een grap vraagt, vertel je een leuke, nette grap. 
Als iemand iets anders vraagt, probeer je op een grappige manier te antwoorden en eindig je met een passende grap.
Houd je antwoorden kort en bondig.
Gebruik emoji's om je antwoorden leuker te maken.`

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${systemPrompt}\n\nGebruiker: ${userMessage}`
        }),
      })

      if (!response.ok) {
        throw new Error('Er ging iets mis bij het ophalen van een antwoord')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'bot', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: '😅 Oeps! Er ging iets mis. Maar weet je wat nooit faalt? Een glimlach! 😊' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="h-[500px] p-4 overflow-y-auto flex flex-col space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>👋 Hoi! Ik ben de Grappenmaker Bot!</p>
            <p className="mt-2">Vraag me om een grap of stel me een vraag!</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Typ je bericht..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  )
}