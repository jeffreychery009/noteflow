# AI Chat Integration

This document explains the AI chat integration that has been added to NoteFlow.

## Overview

The AI chat integration provides users with a powerful AI assistant that can help with note-taking, writing, and content organization. The integration uses an external AWS Lambda API service for AI responses.

## Features

### 1. Real-time AI Chat

- Send messages to the AI assistant and receive instant responses
- Messages are displayed in a chat-like interface
- Support for both user and assistant message types

### 2. Conversation Management

- Create new conversations while preserving old ones in history
- View and browse previous conversations
- Click on any conversation in history to continue it
- Tabbed interface to switch between active chat and history
- Persistent conversation storage

### 3. Authentication Flow

- Secure token-based authentication with the AI service
- Automatic token management and renewal
- User session integration

### 4. Error Handling

- Graceful error handling for network issues
- User-friendly error messages
- Loading states and feedback

## How It Works

### Authentication Process

1. User logs in to NoteFlow (OAuth or credentials)
2. System automatically requests AI service token using user ID
3. Token is stored in localStorage for persistence
4. Token is used for all subsequent AI API calls

### Message Flow

1. User types a message in the chat interface
2. Message is sent to `/api/ai/chat` with AI token
3. API forwards request to external AI service
4. Response is returned and displayed to user
5. Message is added to conversation history

### Conversation Management

1. Conversations are fetched from `/api/ai/conversations`
2. History is displayed in a separate tab
3. Users can browse and view previous conversations
4. Users can click on any conversation to continue it
5. New conversations can be created while preserving existing ones
6. Confirmation dialog prevents accidental conversation loss

## API Endpoints

### Internal API Routes

- `POST /api/ai/login` - Get AI service token
- `POST /api/ai/chat` - Send chat message
- `GET /api/ai/conversations` - Get conversation history

### External AI Service

- **Base URL**: `https://ctsrizczaa.execute-api.us-east-1.amazonaws.com/dev`
- **Login**: `POST /login` - Authenticate and get access token
- **Chat**: `POST /chat` - Send message and get AI response
- **Conversations**: `GET /conversations` - Get conversation history

## Components

### Chatbox Component

- Main chat interface with message display
- Input field for sending messages
- Tabbed interface for chat and history
- Loading states and error handling

### AI Assistant Button

- Floating action button to open chat
- Integrated with rich text editor
- Positioned in bottom-right corner

### AI Status Indicator

- Shows connection status to AI service
- Displays loading, error, and ready states
- Useful for debugging and user feedback

## Hooks

### useAIChat Hook

- Manages AI chat state and functionality
- Handles token management
- Provides message sending and conversation fetching
- Manages loading and error states
- Handles conversation creation and loading
- Tracks current conversation ID

## Usage

### For Users

1. Log in to NoteFlow
2. Click the AI assistant button (sparkles icon) in the bottom-right
3. Start chatting with the AI assistant
4. Click the "+" button to start a new conversation
5. Switch to history tab to view previous conversations
6. Click on any conversation in history to continue it

### For Developers

1. Import the `useAIChat` hook in your component
2. Use the provided functions for sending messages and fetching conversations
3. Handle loading and error states appropriately
4. The hook automatically manages authentication and token renewal

## Error Handling

The integration includes comprehensive error handling:

- Network errors are caught and displayed to users
- Invalid tokens trigger automatic re-authentication
- Loading states prevent multiple simultaneous requests
- Error messages are user-friendly and actionable

## Security

- AI tokens are stored securely in localStorage
- All API calls include proper authentication
- User sessions are validated before AI service access
- Tokens are automatically refreshed when needed

## Future Enhancements

Potential improvements for the AI integration:

- Message persistence in local database
- Conversation search and filtering
- AI-powered note suggestions
- Integration with note content for context-aware responses
- Voice input/output capabilities
- Custom AI model selection
