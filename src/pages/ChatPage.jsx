import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactsList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
import { Menu, X } from 'lucide-react';

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='relative w-full h-full md:h-[90vh] md:max-w-7xl flex justify-center'>
        <BorderAnimatedContainer>
          <div className='flex w-full h-full rounded-none md:rounded-2xl overflow-hidden relative'>
            {/* Mobile Sidebar Toggle */}
            <div className='md:hidden absolute top-4 left-4 z-50'>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className='p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors'
              >
                {showSidebar ? <X className='size-5' /> : <Menu className='size-5' />}
              </button>
            </div>

            {/* Left Side - Contacts/Chats */}
            <div
              className={`fixed md:relative left-0 top-0 h-full w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700/50 transition-transform duration-300 z-40 md:z-0 ${
                showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
              }`}
            >
              <ProfileHeader />
              <ActiveTabSwitch />
              <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                {activeTab === 'chats' ? <ChatList onSelectChat={closeSidebar} /> : <ContactsList onSelectChat={closeSidebar} />}
              </div>
            </div>

            {/* Mobile Overlay */}
            {showSidebar && (
              <div
                className='fixed md:hidden inset-0 bg-black/50 z-30'
                onClick={closeSidebar}
              />
            )}

            {/* Right Side - Chat Messages & Input */}
            <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm w-full'>
              {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage
