import FeedbackAnalyzer from '@/components/FeedbackAnalyzer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-800 mb-2">
              📝 Document Analyzer
            </h1>
            <p className="text-purple-600">
              Upload je document voor een gedetailleerde analyse en feedback
            </p>
          </div>

          <FeedbackAnalyzer />

          <div className="text-center mt-8 text-sm text-purple-500">
            <p>Powered by Gemini AI • Gemaakt met 💜</p>
          </div>
        </div>
      </div>
    </div>
  )
}