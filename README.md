# Chatify Web Frontend

A modern React web application for real-time chat communication. Built with React, Vite, Zustand, Socket.IO, and Tailwind CSS. Features real-time messaging, typing indicators, and user presence tracking.

## 🎯 Features

- **Real-time Messaging** - Send and receive messages instantly
- **Typing Indicators** - See when contacts are typing
- **User Presence** - Know who's online/offline
- **Message History** - View past conversations
- **Profile Management** - Update profile and avatar
- **Responsive Design** - Works on desktop and tablet
- **Dark Theme** - Modern dark UI with cyan accents
- **Image Sharing** - Send images in messages
- **Contact Management** - View all contacts and chat history

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- Chatify Backend API running on `http://localhost:3000`

## 🚀 Quick Start

### 1. Installation

```bash
cd chatify-frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── App.jsx                      # Root component
├── index.css                    # Global styles
├── main.jsx                     # Entry point
├── pages/                       # Page components
│   ├── ChatPage.jsx            # Main chat interface
│   ├── LoginPage.jsx           # Login form
│   └── SignupPage.jsx          # Registration form
├── components/                  # Reusable components
│   ├── ActiveTabSwitch.jsx     # Tab switcher
│   ├── BorderAnimatedContainer.jsx # Animated border
│   ├── ChatContainer.jsx       # Message area
│   ├── ChatList.jsx            # Conversation list
│   ├── ContactList.jsx         # Contact sidebar
│   ├── NoConversationPlaceholder.jsx # Empty state
│   ├── PageLoader.jsx          # Loading indicator
│   └── ProfileHeader.jsx       # User profile header
├── lib/
│   └── axios.js                # Axios HTTP client config
├── store/                       # Zustand state management
│   ├── useAuthStore.js         # Auth state
│   └── useChatStore.js         # Chat state
└── public/
    └── sounds/                  # Audio files

```

## 🎨 Design System

### Color Palette (Dark Theme)

```
Background:     #0f172a (slate-900)
Surface:        #1e293b (slate-800)
Text Primary:   #e2e8f0 (slate-100)
Text Secondary: #94a3b8 (slate-400)
Accent:         #06b6d4 (cyan-500)
Success:        #10b981 (emerald-500)
Error:          #ef4444 (red-500)
```

### Typography

- **Headers**: 24px, bold (font-weight: 700)
- **Body**: 16px, medium (font-weight: 500)
- **Small**: 14px, regular (font-weight: 400)
- **Labels**: 12px, semibold (font-weight: 600)

## 🔄 Navigation Flow

```
App
├── LoginPage (if not authenticated)
├── SignupPage (if not authenticated)
└── ChatPage (if authenticated)
    ├── ChatList (Sidebar)
    ├── ChatContainer (Messages)
    └── ProfileHeader (User info)
```

## 📊 State Management

### useAuthStore

```javascript
// State
authUser              // Current logged-in user
isCheckingAuth       // Loading state
isSigningUp          // Signup loading
isLoggingIn          // Login loading

// Methods
checkAuth()          // Verify session
signup(data)         // Register user
login(data)          // Login user
logout()             // Logout user
updateProfile(pic)   // Update avatar
```

### useChatStore

```javascript
// State
allContacts          // All available contacts
chats                // Chat history
messages             // Current conversation
selectedUser         // Active chat
onlineUsers          // Online status set
typingUsers          // Typing status set

// Methods
getAllContacts()     // Fetch contacts
getMyChatPartners()  // Fetch chats
getMessages(id)      // Fetch messages
sendMessage(data)    // Send message
setSelectedUser(u)   // Select chat
initializeSocket()   // Setup listeners
cleanupSocket()      // Cleanup listeners
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/signup        Register user
POST   /api/auth/login         Login user
GET    /api/auth/check         Verify session
PUT    /api/auth/update-profile Update profile
```

### Messaging

```
GET    /api/messages/contacts/  Get all contacts
GET    /api/messages/chats      Get chat partners
GET    /api/messages/:id        Get conversation
POST   /api/messages/send/:id   Send message
```

## 🔄 WebSocket Events

### Listening Events

- `user_status_changed` - User online/offline
- `receive_message` - Message received
- `new_message` - New message
- `user_typing` - Contact typing
- `user_stopped_typing` - Contact stopped

### Emitting Events

- `user_online` - User is online
- `send_message` - Send message
- `user_typing` - User typing
- `user_stopped_typing` - User stopped typing

## 🎯 Key Components

### ChatPage

Main application page with:
- Contact sidebar
- Message area
- Profile header
- Real-time updates

### ChatContainer

Message display area:
- Message list with timestamps
- Typing indicators
- Input field with send button
- Image support

### ContactList

Contact management:
- Search and filter
- Online status indicators
- Last message preview
- Click to select chat

### ProfileHeader

User information display:
- Profile picture
- Username
- Online status
- Logout button

## 🧪 Testing

```bash
# Run development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code with ESLint
npm run format   # Format code with Prettier
```

## 🛠️ Build Tools

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.IO** - Real-time communication
- **ESLint** - Code linting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔐 Security

- JWT token stored in localStorage
- Secure HTTP requests
- CORS configured
- Input validation
- XSS protection

## ⚡ Performance Optimizations

- Code splitting with lazy loading
- Image optimization
- CSS minification
- Bundle size optimization
- Caching strategies

## 🚀 Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Docker

```bash
docker build -t chatify-frontend .
docker run -p 3000:3000 chatify-frontend
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to API"

**Solution**: Ensure backend is running on `http://localhost:3000`

```bash
# Check backend status
curl http://localhost:3000/api/auth/check
```

### Issue: "WebSocket connection failed"

**Solution**: Check that Socket.IO is enabled on backend

### Issue: "Messages not updating in real-time"

**Solution**: Verify Socket.IO listeners are initialized

```javascript
// Debug in browser console
console.log('Socket connected:', socket.connected);
```

### Issue: "Build fails with missing dependencies"

**Solution**: Clean install

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Socket.IO Documentation](https://socket.io)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:
- Open a GitHub issue
- Check existing documentation
- Contact development team

---

**Last Updated**: February 2024  
**Version**: 1.0.0  
**Status**: Active Development
