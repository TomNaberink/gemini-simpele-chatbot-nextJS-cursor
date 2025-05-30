import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welkom bij je AI Assistent
          </h1>
          <p className="text-gray-600">
            Stel vragen en krijg slimme antwoorden van Gemini AI
          </p>
        </div>
        
        <ChatBot />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by Google Gemini AI • Veilig verbonden via Next.js</p>
        </div>
      </div>
    </div>
  )
} 