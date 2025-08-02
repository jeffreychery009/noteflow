# NoteFlow - AI-Powered Note Taking App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **AI Chat Assistant**: Interactive AI chat with history functionality
- **Note Management**: Create, edit, and organize notes in folders
- **Real-time Collaboration**: See when friends are online
- **Dark Mode Support**: Beautiful UI with theme switching
- **Responsive Design**: Works on desktop and mobile devices

## AI Chat Features

The AI chat assistant includes:

- **Real-time Chat**: Send messages and get instant AI responses
- **Chat History**: View and access previous conversations
- **Tabbed Interface**: Switch between active chat and history view
- **Message Persistence**: All conversations are saved to the database
- **AWS Lambda Integration**: Powered by external AI service
- **Authentication Flow**: Secure token-based authentication with the AI service
- **Conversation Management**: Browse and manage your chat history
- **Error Handling**: Graceful error handling and user feedback

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Endpoints

### AI Chat Endpoints

- `POST /api/ai/login` - Authenticate with AI service and get JWT token
- `POST /api/ai/chat` - Send chat message to AI service
- `GET /api/ai/conversations` - Retrieve conversation history

### External AI Service

The app integrates with an AWS Lambda API for AI responses:

- **Endpoint**: `https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev`
- **Login**: `POST /login` - Authenticate user and get access token
- **Chat**: `POST /chat` - Send user message and get AI response
- **Conversations**: `GET /conversations` - Retrieve conversation history

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
