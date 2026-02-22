import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuthStore } from './store/useAuthStore';
import { useChatStore } from './store/useChatStore';
import PageLoader from './components/PageLoader';
import { Toaster } from 'react-hot-toast';

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { initializeSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      initializeSocket(authUser._id);
    }

    return () => {
      if (authUser) {
        disconnectSocket();
      }
    };
  }, [authUser, initializeSocket, disconnectSocket]);

  console.log("authuser", authUser);

  if (isCheckingAuth) return <PageLoader />;
  return (
    <div className="relative w-screen h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
      
      <div
        className="
          absolute inset-0 z-0 pointer-events-none
          bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      <div className="absolute top-0 -left-4 z-0 size-96 bg-pink-500 opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 z-0 size-96 bg-cyan-500 opacity-20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Routes>
          <Route path='/' element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={ !authUser ? <SignupPage /> : <Navigate to="/" />} />
        </Routes>

        <Toaster/>
      </div>

    </div>
  );
}

export default App;
