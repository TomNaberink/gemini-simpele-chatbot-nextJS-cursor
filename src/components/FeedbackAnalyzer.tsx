'use client'

import { useState } from 'react'
import FileUpload from './FileUpload'

export default function FeedbackAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)

  const analyzeFeedback = async (content: string) => {
    setIsAnalyzing(true)
    try {
      const prompt = `
        Analyseer het volgende document en geef gedetailleerde feedback op de volgende aspecten:

        1. Structuur en Opbouw (score 1-10)
        - Logische flow
        - Samenhang tussen paragrafen
        - Duidelijke introductie en conclusie

        2. Taalgebruik en Stijl (score 1-10)
        - Grammatica en spelling
        - Professioneel taalgebruik
        - Consistentie in stijl

        3. Inhoudelijke Kwaliteit (score 1-10)
        - Diepgang van de analyse
        - Onderbouwing van argumenten
        - Relevantie van de informatie

        4. Presentatie (score 1-10)
        - Leesbaarheid
        - Formatting
        - Professionele uitstraling

        Geef voor elk aspect:
        - Een gedetailleerde analyse
        - Concrete verbeterpunten
        - Een score (1-10)
        - Praktische aanbevelingen

        Sluit af met:
        - Een algemene conclusie
        - Totaalscore
        - Top 3 prioriteiten voor verbetering

        Document voor analyse:
        ${content}
      `

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      })

      if (!response.ok) {
        throw new Error('Fout bij het analyseren van het document')
      }

      const data = await response.json()
      setFeedback(data.response)
    } catch (error) {
      console.error('Analysis error:', error)
      setFeedback('Er is een fout opgetreden bij het analyseren van het document.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upload je document voor feedback
        </h2>
        <FileUpload 
          onFileUpload={(file) => {}}
          onContentExtracted={(content) => analyzeFeedback(content)}
        />
      </div>

      {isAnalyzing && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
            <p className="text-purple-700">Document wordt geanalyseerd...</p>
          </div>
        </div>
      )}

      {feedback && !isAnalyzing && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Feedback Analyse
          </h2>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {feedback}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}