# 🤖 Gemini AI Template - Next.js

> Een professionele template om snel te starten met Gemini AI projecten
> 
> **Gemaakt door Tom Naberink**

Een kant-en-klare Next.js template met veilige Gemini AI integratie. Perfect als startpunt voor je eigen AI-projecten!

## ✨ Features

- 💜 **Moderne UI**: Prachtige paarse interface met Tailwind CSS
- 🔒 **Veilige API**: Gemini API keys blijven server-side
- ⚡ **Ready to Use**: Clone en begin direct met bouwen
- 📱 **Responsive**: Werkt perfect op alle apparaten
- 🚀 **Next.js 15**: Nieuwste versie met TypeScript
- 🛡️ **Best Practices**: Professionele code structuur

## 🚀 Snelle Start

### 1️⃣ Clone deze repository

```bash
git clone https://github.com/TomNaberink/gemini-simpele-chatbot-nextJS-cursor.git
cd gemini-simpele-chatbot-nextJS-cursor
```

### 2️⃣ Installeer dependencies

```bash
npm install
```

### 3️⃣ Verkrijg een Gemini API Key

1. Ga naar [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Log in met je Google account
3. Klik op "Create API Key"
4. Kopieer de gegenereerde API key

### 4️⃣ Configureer environment variabelen

Maak een `.env.local` bestand in de root directory:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

⚠️ **Belangrijk**: Vervang `your_actual_api_key_here` met je echte API key!

### 5️⃣ Start de development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 🛠️ Gebruik de API

Je Gemini AI API is beschikbaar op:

### POST `/api/chat`

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    message: 'Hallo Gemini!' 
  }),
})

const data = await response.json()
console.log(data.response) // AI response
```

## 📁 Project Structuur

```
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # 🔒 Veilige Gemini API endpoint
│   │   ├── layout.tsx           # App layout
│   │   ├── page.tsx            # Template homepage
│   │   └── globals.css         # Global styles
│   └── components/             # Herbruikbare componenten
├── .env.local                  # 🔑 API keys (maak dit aan!)
├── .gitignore                  # Beschermt gevoelige bestanden
└── README.md                   # Deze documentatie
```

## 🎨 Customization

### UI Aanpassen

De template gebruikt Tailwind CSS met een paarse kleurenpalet:

- **Primary**: `purple-600`, `purple-700`
- **Accent**: `indigo-100`, `purple-50`
- **Gradients**: `from-purple-50 to-indigo-100`

### Gemini Model Wijzigen

In `src/app/api/chat/route.ts`:

```typescript
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
```

Beschikbare modellen:
- `gemini-1.5-flash` - Snel en efficiënt
- `gemini-1.5-pro` - Geavanceerde mogelijkheden

## 🚀 Deployment

### Vercel (Aanbevolen)

1. Push naar GitHub
2. Ga naar [Vercel](https://vercel.com)
3. Import je repository
4. Voeg `GEMINI_API_KEY` toe in Environment Variables
5. Deploy!

### Andere platforms

Zorg ervoor dat:
- Node.js 18+ wordt ondersteund
- Environment variabelen kunnen worden ingesteld
- Build command: `npm run build`
- Start command: `npm start`

## 🔒 Beveiliging

Deze template implementeert best practices:

- ✅ **Server-side API calls**: Gemini wordt alleen server-side aangeroepen
- ✅ **Environment variables**: API keys blijven privé
- ✅ **Input validatie**: Berichten worden gecontroleerd
- ✅ **Error handling**: Veilige error responses

## 🤝 Bijdragen

Bijdragen zijn welkom! Voel je vrij om:

- 🐛 Issues te rapporteren
- 💡 Verbeteringen voor te stellen
- 🔧 Pull requests in te dienen

## 📝 Licentie

Dit project is open source en beschikbaar onder de MIT licentie.

---

**💜 Gemaakt met passie door Tom Naberink**

*Happy coding! 🚀* 