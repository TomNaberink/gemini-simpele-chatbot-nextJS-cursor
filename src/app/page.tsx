import JokeChatBot from '@/components/JokeChatBot'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-800 mb-2">
              🎭 De Digitale Comedian
            </h1>
            <p className="text-purple-600">
              Chat met de grappigste AI-bot van Nederland!
            </p>
          </div>

          {/* Chatbot */}
          <JokeChatBot />

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-purple-500">
            <p>Powered by Gemini AI • Gemaakt met 💜</p>
          </div>
        </div>
      </div>
    </div>
  )
}