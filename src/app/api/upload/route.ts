import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extract text from the Word document using buffer instead of arrayBuffer
    const result = await mammoth.extractRawText({ buffer: buffer })
    
    if (!result.value) {
      throw new Error('Failed to extract text from document')
    }

    return NextResponse.json({ 
      text: result.value,
      messages: result.messages 
    })
  } catch (error) {
    console.error('Error processing file:', error)
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    )
  }
}