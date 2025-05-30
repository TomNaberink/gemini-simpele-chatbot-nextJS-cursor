'use client'

import { useState } from 'react'

interface Translation {
  dutch: string
  french: string
}

export default function WordTranslator() {
  const [word, setWord] = useState('')
  const [translations, setTranslations] = useState<Translation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!word.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: `Translate the Dutch word "${word.trim()}" to French. Only respond with the French translation, nothing else.` 
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Translation failed')
      }

      const newTranslation = {
        dutch: word.trim(),
        french: data.response.trim()
      }

      setTranslations(prev => [...prev, newTranslation])
      setWord('')
    } catch (error) {
      console.error('Translation error:', error)
      alert('Er is een fout opgetreden bij het vertalen. Probeer het opnieuw.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleAddWord} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Voer een Nederlands woord in..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Bezig...' : 'Vertaal'}
          </button>
        </div>
      </form>

      {translations.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nederlands
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frans
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {translations.map((translation, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {translation.dutch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {translation.french}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}