# 💬 Chatify — Real-Time Messaging & Chat Application

**Chatify** is a full-stack, feature-rich, real-time web application engineered with modern web technologies. It delivers instant 1-on-1 messaging, live user presence (online/offline tracking), optimistic UI message updates, image upload support, customizable audio feedback, and modern glassmorphic responsive UI designs.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- **JWT-Based Authentication**: Secure authentication stored in `httpOnly` HTTP cookies to mitigate XSS vulnerabilities.
- **Password Encryption**: Passwords salted and hashed with `bcryptjs`.
- **Protected Routes & Middleware**: Dedicated backend middleware `protectRoute` to enforce authenticated endpoints.
- **Arcjet Security & Bot Protection**: Rate limiting, bot detection, and security policies integrated into auth routes via Arcjet.
- **Onboarding Email Notifications**: Integrated with Resend API to deliver welcome emails upon account registration.

### ⚡ Real-Time Chat & Presences (Socket.IO)
- **Instant Messaging**: Low-latency 1-on-1 messaging using Socket.IO WebSockets.
- **Live Online/Offline Indicators**: Dynamic status tracking across contact lists and active chat headers.
- **Optimistic UI Updates**: Immediate client-side message insertion for zero perceived latency.
- **Socket Authentication**: Custom WebSocket middleware (`socketAuthMiddleware`) ensuring only authenticated HTTP session cookies establish socket connections.

### 🖼️ Media & Customization
- **Image Sharing**: Send photos inline within chat conversations (backed by Cloudinary CDN).
- **Profile Picture Uploads**: Update avatar images directly with real-time profile persistence.
- **Sound Effects**: Customizable audio toggles for interactive keystroke typing sounds and new message alerts.

### 🎨 Design & User Experience
- **Responsive Layout**: Designed with Tailwind CSS & DaisyUI using fluid viewport height constraints (`h-screen`, `calc(100vh-2rem)`).
- **Modern Aesthetics**: Dark-mode palette with glassmorphism, animated border gradients, and background glow accents.
- **Skeleton Loading States**: Seamless visual feedback during async data fetches for contacts, chats, and message logs.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Auth & Chat state)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Real-Time Client**: [Socket.IO Client](https://socket.io/)
- **HTTP Client**: [Axios](https://axios-http.com/) (with `withCredentials: true`)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules `"type": "module"`)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose ORM](https://mongoosejs.com/)
- **Real-Time Server**: [Socket.IO](https://socket.io/)
- **Security & Rate Limiting**: [@arcjet/node](https://arcjet.com/) & [@arcjet/inspect](https://arcjet.com/)
- **Media Cloud**: [Cloudinary](https://cloudinary.com/)
- **Transactional Emails**: [Resend](https://resend.com/)

---

## 📁 Project Architecture & Directory Structure

```text
chatApp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Auth logic (signup, login, logout, profile updates)
│   │   │   └── message.controller.js   # Message fetching & send logic
│   │   ├── emails/
│   │   │   ├── emailHandlers.js        # Resend email handler functions
│   │   │   └── emailTemplates.js       # HTML email templates
│   │   ├── lib/
│   │   │   ├── arcjet.js               # Arcjet security configuration
│   │   │   ├── cloudinary.js           # Cloudinary media SDK instance
│   │   │   ├── db.js                   # Mongoose database connection initialization
│   │   │   ├── env.js                  # Centralized environment variable exports
│   │   │   ├── socket.js               # Socket.IO server initialization & user mapping
│   │   │   └── utils.js                # JWT token generator utility
│   │   ├── middleware/
│   │   │   ├── arcjet.middleware.js    # Rate limiting & bot protection
│   │   │   ├── auth.middleware.js      # JWT authentication guard
│   │   │   └── socket.auth.middleware.js # Socket handshake authentication guard
│   │   ├── models/
│   │   │   ├── Message.js              # Mongoose schema for messages
│   │   │   └── User.js                 # Mongoose schema for user accounts
│   │   ├── routes/
│   │   │   ├── auth.route.js           # Authentication API endpoints
│   │   │   └── message.route.js        # Chat & messaging API endpoints
│   │   └── server.js                   # Main application entry point
│   └── package.json
│
├── frontend/
│   ├── public/                         # Static assets & sound effects
│   ├── src/
│   │   ├── components/                 # UI components
│   │   │   ├── ActiveTabSwitch.jsx     # Tab toggle (Chats vs Contacts)
│   │   │   ├── BorderAnimatedContainer.jsx # Gradient border wrapper
│   │   │   ├── ChatContainer.jsx       # Active conversation view & messages log
│   │   │   ├── ChatHeader.jsx          # Header with user avatar, name & online badge
│   │   │   ├── ChatsList.jsx           # List of active chat partners
│   │   │   ├── ContactList.jsx         # List of all available user contacts
│   │   │   ├── MessageInput.jsx        # Text & image message input bar
│   │   │   ├── MessagesLoadingSkeleton.jsx # Pulse loader for messages
│   │   │   ├── NoChatHistoryPlaceholder.jsx # New conversation prompt
│   │   │   ├── NoChatsFound.jsx        # Empty state when no chats exist
│   │   │   ├── NoConversationPlaceholder.jsx # Default view when no user is selected
│   │   │   ├── PageLoader.jsx          # App initialization spinner
│   │   │   ├── ProfileHeader.jsx       # User profile avatar uploader & sound toggle
│   │   │   └── UsersLoadingSkeleton.jsx # Pulse loader for user lists
│   │   ├── hooks/
│   │   │   └── useKeyboardSound.js     # Custom hook for typing audio effects
│   │   ├── lib/
│   │   │   └── axios.js                # Configured Axios instance with credentials
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx            # Main dashboard chat layout
│   │   │   ├── LoginPage.jsx           # Sign-in page
│   │   │   └── SingUpPage.jsx          # Sign-up page
│   │   ├── store/
│   │   │   ├── useAuthStore.js         # Zustand store for authentication & WebSockets
│   │   │   └── useChatStore.js         # Zustand store for chat state & message events
│   │   ├── App.jsx                     # Root router component
│   │   ├── index.css                   # Global styles & Tailwind directives
│   │   └── main.jsx                    # React root mounting file
│   └── package.json
└── README.md
```

---

## ⚙️ Environment Configuration

Create a `.env` file inside the `backend/` directory with the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_cluster_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development # Set to "production" in production environment

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=Chatify Team

# Client URL (CORS & Email links)
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Security (Arcjet)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## ⚡ Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/jarchit27/chatify.git
cd chatApp
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*The backend server will run on `http://localhost:3000`.*

### 3. Frontend Setup
In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The frontend application will launch at `http://localhost:5173`.*

---

## 📡 API Reference

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Register new user account & send welcome email | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & issue HTTP-only JWT cookie | ❌ |
| `POST` | `/api/auth/logout` | Clear authentication JWT cookie & disconnect socket | ❌ |
| `GET` | `/api/auth/check` | Verify current session and return user profile | ✅ |
| `PUT` | `/api/auth/update-profile` | Upload and update user profile picture | ✅ |

### Messaging Routes (`/api/messages`)

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/messages/contacts` | Retrieve all registered user contacts | ✅ |
| `GET` | `/api/messages/chats` | Retrieve list of active chat partners | ✅ |
| `GET` | `/api/messages/:id` | Fetch conversation history with a specific user | ✅ |
| `POST` | `/api/messages/send/:id` | Send a text and/or image message to a user | ✅ |

---

## 🔌 WebSockets & Real-Time Events (Socket.IO)

The backend uses custom authentication middleware to inspect the `jwt` cookie during the HTTP upgrade handshake before granting WebSocket access.

### Emitted & Received Events:
- **`getOnlineUsers`** *(Server → Client)*: Emitted whenever a user connects or disconnects. Sends an array of active `userId` strings.
- **`newMessage`** *(Server → Client)*: Emitted to `receiverSocketId` when a message is sent to an online user.

---

## 📜 License

This project is licensed under the **MIT License**.
