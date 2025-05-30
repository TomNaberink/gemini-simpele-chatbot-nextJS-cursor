import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gemini Chatbot',
  description: 'Een simpele chatbot met Gemini AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  )
} 