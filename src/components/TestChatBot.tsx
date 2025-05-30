'use client'

import { useState } from 'react'
import VoiceInput from './VoiceInput'

export default function TestChatBot() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleVoiceTranscript = (transcript: string) => {
    setMessage(prev => prev + ' ' + transcript)
  }

  const sendMessage = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Er is een fout opgetreden')
      }

      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Error: ' + (error instanceof Error ? error.message : 'Onbekende fout'))
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
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4 border">
        <div className="flex space-x-3">
          {/* Text Input */}
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type je vraag hier of gebruik de microfoon..."
              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          {/* Voice Input */}
          <div className="flex flex-col justify-center">
            <VoiceInput 
              onTranscript={handleVoiceTranscript}
              isDisabled={isLoading}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="text-xs text-gray-500">
            {message.length > 0 && `${message.length} karakters`}
          </div>
          <button
            onClick={sendMessage}
            disabled={!message.trim() || isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Bezig...' : 'Verstuur'}
          </button>
        </div>
      </div>

      {response && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Gemini AI Antwoord:</h4>
          <div className="text-blue-700 whitespace-pre-wrap">{response}</div>
        </div>
      )}
    </div>
  )
} 