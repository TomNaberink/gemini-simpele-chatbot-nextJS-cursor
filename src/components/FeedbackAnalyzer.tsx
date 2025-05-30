import React, { useState } from 'react';
import FileUpload from './FileUpload';

interface FeedbackResult {
  category: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export default function FeedbackAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult[]>([]);

  const analyzeDocument = async (content: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Analyze this document and provide detailed feedback. Focus on:
          1. Structure and Organization
          2. Language and Style
          3. Content Quality
          4. Presentation
          
          For each category, provide:
          - A score from 1-10
          - Detailed feedback
          - Specific suggestions for improvement
          
          Document content:
          ${content}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze document');
      }

      const data = await response.json();
      
      // Parse the AI response into structured feedback
      const parsedFeedback = parseAIResponse(data.response);
      setFeedback(parsedFeedback);
    } catch (error) {
      console.error('Error analyzing document:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const parseAIResponse = (response: string): FeedbackResult[] => {
    // Simple parsing of AI response - in real implementation, you'd want more robust parsing
    const categories = ['Structure and Organization', 'Language and Style', 'Content Quality', 'Presentation'];
    return categories.map(category => ({
      category,
      score: 7, // This would be parsed from the AI response
      feedback: `Feedback for ${category}`, // This would be parsed from the AI response
      suggestions: ['Suggestion 1', 'Suggestion 2'] // This would be parsed from the AI response
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Document Feedback Analyzer</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Upload Your Document</h2>
          <FileUpload onFileUpload={(file) => {
            if (file.content) {
              analyzeDocument(file.content);
            }
          }} />
        </div>

        {isAnalyzing && (
          <div className="flex items-center justify-center p-4 bg-purple-50 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            <span className="ml-3 text-purple-700">Analyzing document...</span>
          </div>
        )}

        {feedback.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
            
            {feedback.map((result, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-800">{result.category}</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                    Score: {result.score}/10
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{result.feedback}</p>
                
                <div className="bg-white rounded p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Suggestions for Improvement:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {result.suggestions.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}