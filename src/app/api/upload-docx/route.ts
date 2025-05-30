import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import pdf from 'pdf-parse/lib/pdf-parse.js'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'Geen bestand gevonden' }, { status: 400 })
    }

    // Check file type - now supports both .docx and .pdf
    const isDocx = file.name.endsWith('.docx')
    const isPdf = file.name.endsWith('.pdf')
    
    if (!isDocx && !isPdf) {
      return NextResponse.json({ error: 'Alleen .docx en .pdf bestanden zijn toegestaan' }, { status: 400 })
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Bestand is te groot (max 10MB)' }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let textContent = ''
    let fileType = ''

    if (isDocx) {
      // Extract text from .docx using mammoth
      const result = await mammoth.extractRawText({ buffer })
      textContent = result.value
      fileType = 'Word Document (.docx)'
    } else if (isPdf) {
      // Extract text from .pdf using pdf-parse
      const pdfData = await pdf(buffer)
      textContent = pdfData.text
      fileType = 'PDF Document (.pdf)'
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      size: file.size,
      fileType: fileType,
      content: textContent,
      wordCount: textContent.split(/\s+/).filter(word => word.length > 0).length,
      characterCount: textContent.length
    })

  } catch (error) {
    console.error('Error processing file:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het verwerken van het bestand' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'GET method not allowed. Use POST to upload files.' },
    { status: 405 }
  )
}