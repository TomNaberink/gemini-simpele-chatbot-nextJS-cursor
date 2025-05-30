import WordTranslator from '@/components/WordTranslator'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Nederlands naar Frans Vertaler
          </h1>
          <WordTranslator />
        </div>
      </div>
    </div>
  )
}