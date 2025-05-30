# Gemini AI Chatbot

Een eenvoudige maar krachtige chatbot applicatie gebouwd met Next.js en Google's Gemini AI. Deze applicatie toont hoe je veilig een AI chatbot kunt implementeren waarbij API keys server-side worden gehouden.

## ✨ Features

- 🤖 **Gemini AI Integration**: Gebruikt Google's geavanceerde Gemini AI model
- 🔒 **Veilige API**: API keys worden server-side gehouden via Next.js API routes
- 💬 **Real-time Chat**: Interactieve chat interface met typing indicators
- 📱 **Responsive Design**: Werkt perfect op desktop en mobiel
- 🎨 **Moderne UI**: Gebouwd met Tailwind CSS voor een strakke uitstraling

## 🚀 Snelle Start

### Voorvereisten

- Node.js 18+ geïnstalleerd
- Een Google Gemini API key ([verkrijg hier](https://makersuite.google.com/app/apikey))

### Installatie

1. **Dependencies installeren**
   ```bash
   npm install
   ```

2. **Environment variabelen instellen**
   
   Maak een `.env.local` bestand in de root directory:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   
   ⚠️ **Belangrijk**: Vervang `your_actual_gemini_api_key_here` met je echte Gemini API key!

3. **Development server starten**
   ```bash
   npm run dev
   ```

4. **Open je browser**
   
   Ga naar [http://localhost:3000](http://localhost:3000) om de chatbot te gebruiken.

## 🔧 Configuratie

### Gemini API Key verkrijgen

1. Ga naar [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Log in met je Google account
3. Klik op "Create API Key"
4. Kopieer de gegenereerde API key
5. Plak deze in je `.env.local` bestand

### Environment Variabelen

| Variabele | Beschrijving | Vereist |
|-----------|--------------|---------|
| `GEMINI_API_KEY` | Je Google Gemini API key | Ja |

## 📁 Project Structuur

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Beveiligde API endpoint voor Gemini
│   ├── globals.css               # Globale styling
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Hoofdpagina
├── components/
│   └── ChatBot.tsx              # Chat interface component
```

## 🛡️ Beveiliging

Deze applicatie implementeert best practices voor API beveiliging:

- **Server-side API calls**: Gemini API wordt alleen aangeroepen vanaf de server
- **Environment variabelen**: API keys worden nooit blootgesteld aan de client
- **Error handling**: Veilige error responses zonder gevoelige informatie
- **Input validatie**: Berichten worden gevalideerd voordat ze worden verwerkt

## 🎨 Customization

### Styling aanpassen

De app gebruikt Tailwind CSS. Je kunt de styling aanpassen in:
- `src/components/ChatBot.tsx` - Chat interface styling
- `src/app/globals.css` - Globale styles
- `tailwind.config.js` - Tailwind configuratie

### Gemini model wijzigen

In `src/app/api/chat/route.ts` kun je het Gemini model aanpassen:

```typescript
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
```

Beschikbare modellen:
- `gemini-pro` - Voor tekst
- `gemini-pro-vision` - Voor tekst en afbeeldingen

## 🚀 Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Ga naar [Vercel](https://vercel.com)
3. Import je repository
4. Voeg je `GEMINI_API_KEY` toe in de Environment Variables
5. Deploy!

### Andere platforms

Voor andere platforms, zorg ervoor dat:
- Node.js 18+ wordt ondersteund
- Environment variabelen kunnen worden ingesteld
- De build command `npm run build` is
- De start command `npm start` is

## 🐛 Troubleshooting

### "GEMINI_API_KEY is niet ingesteld"
- Controleer of je `.env.local` bestand bestaat
- Zorg dat de variabele exact `GEMINI_API_KEY` heet
- Herstart de development server na het toevoegen van environment variabelen

### Chat reageert niet
- Controleer je internetverbinding
- Verificeer dat je API key geldig is
- Bekijk de browser console voor error berichten

### Styling werkt niet
- Zorg dat Tailwind CSS correct is geïnstalleerd
- Controleer of `globals.css` wordt geïmporteerd

## 📝 Licentie

Dit project is open source en beschikbaar onder de MIT licentie.

## 🤝 Bijdragen

Bijdragen zijn welkom! Voel je vrij om issues te openen of pull requests in te dienen. 