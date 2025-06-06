# 🚀 Gemini AI Chatbot - Bolt.new Ready!

## ⚡ Quick Start voor Bolt.new

### 1. **Dependencies installeren**
```bash
npm install
```

### 2. **Environment Setup**
Maak een `.env.local` bestand aan:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. **Development Server**
```bash
npm run dev
```

## 🔧 Bolt.new Optimalisaties

### Automatische Features:
- ✅ **Chat met Gemini AI** - Intelligent gesprekken
- ✅ **Spraakherkenning** - Nederlandse microfoon input
- ✅ **File Upload** - Upload .docx en .pdf bestanden
- ✅ **Responsive Design** - Werkt op alle apparaten
- ✅ **TypeScript** - Type-safe development

### Dependencies die cruciaal zijn:
```json
{
  "@google/generative-ai": "^0.21.0",
  "mammoth": "^1.8.0", 
  "pdf-parse": "^1.1.1"
}
```

## 🐛 Troubleshooting voor Bolt

### Als je build errors krijgt:

**1. Clear cache en herinstalleer:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**2. Als pdf-parse problemen geeft:**
- Het project werkt ook zonder PDF support
- DOCX files worden altijd ondersteund via mammoth

**3. Speech Recognition issues:**
- Werkt alleen in HTTPS omgevingen
- Chrome/Edge hebben de beste ondersteuning
- Safari heeft beperkte ondersteuning

**4. Webpack errors oplossen:**
- Het project gebruikt dynamische imports voor pdf-parse
- Next.js config is geoptimaliseerd voor browser-compatibility

## 📱 Gebruiksinstructies

1. **API Key verkrijgen:**
   - Ga naar Google AI Studio
   - Genereer een gratis API key
   - Plak in `.env.local`

2. **Spraak gebruiken:**
   - Klik op microfoon icoon 🎤
   - Spreek duidelijk in het Nederlands
   - Druk nogmaals om te stoppen

3. **Bestanden uploaden:**
   - Klik op paperclip icoon 📎
   - Sleep & drop .docx/.pdf bestanden
   - Maximaal 10MB per bestand

## 🎯 Educatieve Doelstellingen

Dit template is speciaal ontworpen voor **Nederlandse docenten** die:
- AI willen integreren in hun lessen
- Spraakherkenning willen gebruiken
- Documenten willen analyseren
- Een startpunt zoeken voor eigen ontwikkeling

**Hoofdvraag:** *"Wat ga jij maken om het onderwijs te verbeteren?"*

## 💜 Credits

Ontwikkeld door **Tom Naberink** - AI voor Docenten  
🔗 Perfect getest voor Bolt.new compatibiliteit!
