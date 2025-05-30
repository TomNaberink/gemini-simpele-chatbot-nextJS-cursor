'use client'

import { useState } from 'react'

interface Translation {
  dutch: string
  french: string
}

export default function WordTranslator() {
  const [word, setWord] = useState('')
  const [translations, setTranslations] = useState<Translation[]>([])

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!word.trim()) return

    // In a real application, you would call an API here to get the translation
    // For demo purposes, we'll use a simple mapping
    const frenchTranslation = {
      dutch: word.trim(),
      french: translateToDutch(word.trim())
    }

    setTranslations([...translations, frenchTranslation])
    setWord('')
  }

  // Simple translation function (for demo purposes)
  const translateToDutch = (word: string): string => {
    const translations: { [key: string]: string } = {
      'hallo': 'bonjour',
      'dag': 'salut',
      'kat': 'chat',
      'hond': 'chien',
      'huis': 'maison',
      'auto': 'voiture',
      'boom': 'arbre',
      'boek': 'livre',
      'tafel': 'table',
      'stoel': 'chaise'
    }
    
    return translations[word.toLowerCase()] || '(vertaling niet beschikbaar)'
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
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Vertaal
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