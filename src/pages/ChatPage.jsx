import React, { act } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactsList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';

 function ChatPage() {

  const {activeTab, selectedUser} = useChatStore();
  return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='relative w-full max-w-7xl h-[90vh] flex justify-center'>
          <BorderAnimatedContainer>
            <div className='flex w-full h-full rounded-2xl overflow-hidden'>
              {/* Left Side - Contacts/Chats */}
              <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700/50'>
                <ProfileHeader/>
                <ActiveTabSwitch/>
                <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                  {activeTab === 'chats' ? <ChatList/> : <ContactsList/>}
                </div>
              </div>

              {/* Right Side - Chat Messages & Input */}
              <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
                {selectedUser ? <ChatContainer/> : <NoConversationPlaceholder/>}
              </div>
            </div>
          </BorderAnimatedContainer>
        </div>
      </div>
  );
}


export default ChatPage
