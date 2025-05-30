import JokeChatBot from '@/components/JokeChatBot'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            🤖 Grappenmaker Bot
          </h1>
          <p className="text-purple-600">
            Chat met deze vrolijke bot die graag grapjes maakt!
          </p>
        </div>
        
        <JokeChatBot />
      </div>
    </div>
  )
}