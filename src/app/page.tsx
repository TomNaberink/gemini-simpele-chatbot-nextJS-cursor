import FunChatBot from '@/components/FunChatBot';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            De Grappige Chatbot 😄
          </h1>
          <p className="text-purple-600">
            Chat, upload documenten, of gebruik je stem!
          </p>
        </div>

        <FunChatBot />
      </div>
    </div>
  );
}