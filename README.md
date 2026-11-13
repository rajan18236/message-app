# Real-Time Chat App

A full-stack messaging application built with React and Node.js. Users can register, sign in, find other users, and exchange messages in real time. The project is organized as a React/Vite frontend and an Express/MongoDB backend, with Socket.IO handling live updates.

## Features

- Account registration and login with password hashing and cookie-based JWT sessions
- Protected chat page and server-side session verification
- User search and a list of existing conversations
- Persistent one-to-one messages stored in MongoDB
- Real-time message delivery and online-user presence with Socket.IO
- Unread message counts and a notification sound
- Responsive single-page navigation and toast feedback

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express 5, Socket.IO |
| Database | MongoDB with Mongoose |
| Authentication | bcrypt password hashing, JSON Web Tokens, HTTP-only cookies |

## How it works

1. The React app manages login state and verifies the user's session with the backend. Protected routes keep unauthenticated users out of the chat.
2. Express routes handle authentication, user search, conversation setup, and message history. Middleware checks the JWT cookie on protected requests.
3. Mongoose models represent users, conversations, and messages. A conversation references its users and messages; messages record sender, receiver, text, and conversation.
4. When a message is sent, the backend saves it to MongoDB and emits it through Socket.IO to connected participants. Presence events keep the online-user list current, while the frontend tracks unread messages and plays a notification sound.

## Project structure

```text
backend/
  Config/       MongoDB and Socket.IO setup
  controller/   Authentication, user, and message handlers
  middleware/   Session authentication
  models/       User, conversation, and message schemas
  routes/       Express API routes
  index.js      Server setup and startup
frontend/
  src/
    components/ Reusable chat and navigation UI
    context/    Authentication, socket, and user-search state
    page/       Home, login, registration, and chat pages
```

## Run locally

### Requirements

- Node.js and npm
- A MongoDB database (local or hosted)

### Install dependencies

From the repository root:

```bash
npm install
npm install --prefix frontend
```

Create a root-level `.env` with a MongoDB connection string:

```env
DATABASE_URL=mongodb://127.0.0.1:27017/chat-app
PORT=5000
```

Start the backend from the repository root:

```bash
npm run dev
```

Start the Vite frontend in a second terminal:

```bash
npm run dev --prefix frontend
```

**Local-development note:** The frontend's API and Socket.IO URLs are currently set to the deployed server in its context files, and the backend CORS configuration allows the deployed frontend origin. To use the local backend from the local Vite app, change those URLs to your local backend and allow the Vite origin in the backend CORS configuration. These endpoints are not currently configurable through frontend environment variables.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the backend with nodemon |
| `npm start` | Start the backend with Node.js |
| `npm run build` | Install dependencies and build the frontend |
| `npm run dev --prefix frontend` | Start the Vite development server |
| `npm run build --prefix frontend` | Build the frontend for production |
| `npm run lint --prefix frontend` | Run ESLint on the frontend |
| `npm run preview --prefix frontend` | Preview the production frontend build |

## API overview

Protected endpoints require a valid session cookie.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/user/register` | Register an account |
| `POST` | `/api/user/login` | Sign in |
| `GET` | `/api/user/verify` | Verify the current session |
| `GET` | `/api/user/logout` | Sign out |
| `GET` | `/api/search/name/:userName` | Search users by name |
| `GET` | `/api/search/chatedWith` | Get the current user's conversations |
| `GET` | `/api/search/startingChating/:startChatWith` | Start or load a conversation |
| `GET` | `/api/message/:id` | Get messages with a user |
| `POST` | `/api/message/send/:id` | Send a message to a user |

## Project highlights for an interview

This project demonstrates full-stack feature development: designing related MongoDB models, building REST endpoints, protecting routes with authentication middleware, and connecting persisted data to a real-time UI. It also brings together frontend context for shared session/socket state, online presence, and unread-message notifications.

When presenting the project, be ready to walk through the message lifecycle—from the authenticated HTTP request, to persistence, to Socket.IO delivery—and explain trade-offs such as storing conversation references and maintaining online presence.

## Next steps

- Move API, Socket.IO, CORS, and JWT settings into environment-based configuration.
- Add automated tests for authentication, conversation access, and message delivery.
- Add message validation, pagination for long conversations, and stronger deployment documentation.
