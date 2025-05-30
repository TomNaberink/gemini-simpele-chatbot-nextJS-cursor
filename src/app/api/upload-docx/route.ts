import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'

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
      try {
        // Extract text from .docx using mammoth
        const result = await mammoth.extractRawText({ buffer })
        textContent = result.value
        fileType = 'Word Document (.docx)'
        
        if (!textContent || textContent.trim().length === 0) {
          return NextResponse.json({ 
            error: 'Geen tekst gevonden in het Word document. Controleer of het bestand tekst bevat.' 
          }, { status: 400 })
        }
      } catch (error) {
        console.error('Error processing DOCX:', error)
        return NextResponse.json({ 
          error: 'Fout bij het verwerken van het Word document. Controleer of het bestand niet corrupt is.' 
        }, { status: 500 })
      }
    } else if (isPdf) {
      try {
        // Dynamic import to prevent loading issues
        const pdf = (await import('pdf-parse')).default
        
        // Extract text from .pdf using pdf-parse
        const pdfData = await pdf(buffer)
        textContent = pdfData.text
        fileType = 'PDF Document (.pdf)'
        
        if (!textContent || textContent.trim().length === 0) {
          return NextResponse.json({ 
            error: 'Geen tekst gevonden in het PDF document. Controleer of het bestand tekst bevat (niet alleen afbeeldingen).' 
          }, { status: 400 })
        }
      } catch (error) {
        console.error('Error processing PDF:', error)
        return NextResponse.json({ 
          error: 'Fout bij het verwerken van het PDF document. Controleer of het bestand niet corrupt is of beveiligingsbeperkingen heeft.' 
        }, { status: 500 })
      }
    }

    // Validate extracted content
    if (!textContent || textContent.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Geen tekst geëxtraheerd uit het document. Het bestand is mogelijk leeg of bevat alleen afbeeldingen.' 
      }, { status: 400 })
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
      { error: 'Er is een onverwachte fout opgetreden bij het verwerken van het bestand. Probeer het opnieuw.' },
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