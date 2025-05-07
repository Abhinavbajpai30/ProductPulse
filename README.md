# Product Pulse: AI-Powered Feedback Analyzer

![Demo Screenshot](screenshot-placeholder.png) *Add your screenshot here*

## Overview 📊
Product Pulse is an AI-driven tool that automatically analyzes user feedback from app stores and social media. Designed for product teams, it delivers weekly summaries of user sentiment, helping PMs identify critical issues and prioritize improvements using Google's Gemini AI.

## Key Features ✨
- **Instant Analysis** - Process 100+ reviews in seconds
- **Smart Categorization**  
  🔴 **Pain Points**  
  🟢 **Positive Feedback**  
  🔵 **Feature Requests**
- **Mock Data Integration** - Demo with real-world app store examples
- **AI-Powered Insights** - Gemini-powered prioritization recommendations
- **Weekly Digest** - Automated trend summaries for PMs

## Tech Stack ⚙️
- **Frontend**: React + TypeScript
- **AI Engine**: Google Gemini API
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Backend**: Node.js/Express (review fetching)

## Installation 🛠️

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/product-pulse.git
cd product-pulse
```

2. **Install Dependencies**
```bash
npm install
```

3. **API Setup**
```bash
# In separate terminal
cd mock-server
npm install
npm start
```

4. **Configure Environment**
```bash
cp .env.example .env
# Add your Gemini API key
VITE_GeminiAPI=your_api_key_here
```

## Usage 🚀

1. **Start Development Server**
```bash
npm run dev
```

2. **Enter App ID**  
   Try these examples:
   - `com.whatsapp` (WhatsApp)
   - `com.instagram.android` (Instagram)
   - `com.twitter.android` (Twitter)

3. **Get Insights**  
   Click Search to see:
   - 🔍 Key user pain points
   - 💡 Top feature requests
   - 🌟 Positive feedback highlights
   - 🎯 Priority recommendations

## Sample Output 📄

```json
{
  "Key pain points": [
    "🚨 Battery drain issues reported by 45% of users",
    "🐛 Frequent crash reports during video calls"
  ],
  "Requests": [
    "💡 Dark mode requested by 32% of users",
    "➕ Multi-device sync feature demand"
  ],
  "Positive Feedback": [
    "🎉 87% praise improved UI design",
    "🌟 92% recommend app to friends"
  ],
  "Summary": "Users love new UI but struggle with performance...",
  "PMs prioritize": [
    "🔧 Optimize battery usage (HIGH)",
    "🛠 Fix video call stability (CRITICAL)"
  ]
}
```

## Configuration ⚙️
Customize analysis by modifying `src/components/Form.tsx`:
```typescript
// Adjust analysis prompt
const prompt = `You are an expert App Review Analyst...`;

// Modify response schema
const config = {
  responseMimeType: 'application/json',
  responseSchema: {
    // ...custom fields
  }
};
```

## Roadmap 🗺️
- [ ] Twitter/X integration
- [ ] Sentiment timeline charts
- [ ] Competitor comparison analysis
- [ ] Automated weekly email reports
- [ ] Multi-language support

---

**Product Managers:** Try our live demo with sample App IDs to instantly uncover user insights! 🚀

*Note: Current version processes Google Play reviews. Twitter integration coming in Q4 2024.*