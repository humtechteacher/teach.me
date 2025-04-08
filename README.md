# Educational Platform with Misinformation Game

A web-based teaching platform with an extensible activity framework, starting with a misinformation detection game powered by OpenAI.

## Features

- Home page with browsable educational activities
- Misinformation detection game that generates AI-powered tweets with factual inaccuracies
- AI evaluation of user-submitted sources to counter misinformation
- Responsive design that works on mobile, tablet, and desktop

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm
- OpenAI API key

### Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit the `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

3. Install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:5000](http://localhost:5000)

## Deployment

### Deploying to Vercel

1. Make sure your Vercel project has the OPENAI_API_KEY environment variable set in the Vercel dashboard.

2. Set up a `vercel.json` file in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "buildCommand": "npm run build",
        "outputDirectory": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "dist/public/$1"
    }
  ]
}
```

3. Deploy to Vercel:

```bash
vercel --prod
```

### Troubleshooting Deployment Issues

If you encounter issues with the API on your deployed site:

1. Check that the OPENAI_API_KEY environment variable is set correctly in your hosting platform.
2. Verify API status by visiting `/api/status` on your deployed site.
3. Check the browser console and server logs for specific error messages.
4. Ensure your OpenAI API key has access to the required models (gpt-4o-mini).