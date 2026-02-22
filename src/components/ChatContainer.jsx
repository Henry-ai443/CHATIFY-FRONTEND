import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { Send, Image as ImageIcon, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

function ChatContainer() {
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessage,
    isSendingMessage,
    onlineUsers,
    emitTyping,
    emitStoppedTyping,
    typingUsers
  } = useChatStore()

  const { authUser } = useAuthStore()
  const [messageText, setMessageText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  // Fetch messages when user changes
  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id)
  }, [selectedUser, getMessages])

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleMessageChange = (e) => {
    const text = e.target.value
    setMessageText(text)

    if (text.length > 0 && !isTyping) {
      setIsTyping(true)
      emitTyping(selectedUser._id, authUser._id)
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false)
        emitStoppedTyping(selectedUser._id, authUser._id)
      }
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (isTyping && selectedUser) emitStoppedTyping(selectedUser._id, authUser._id)
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [isTyping, selectedUser, authUser._id, emitStoppedTyping])

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setSelectedImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() && !selectedImage) return
    await sendMessage(selectedUser._id, messageText, selectedImage)
    setMessageText('')
    setSelectedImage(null)
  }

  if (!selectedUser) return null

  const isUserOnline = onlineUsers.has(selectedUser._id)

  return (
    <div className='w-full h-full flex flex-col bg-gradient-to-b from-slate-900/50 to-slate-900/80'>
      {/* Header */}
      <div className='p-3 md:p-4 border-b border-slate-700/50 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <img
              src={selectedUser.profilePic || '/avatar.png'}
              alt={selectedUser.fullName}
              className='size-10 rounded-full object-cover'
            />
            {isUserOnline && (
              <div className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border border-slate-900' />
            )}
          </div>
          <div>
            <h3 className='text-sm font-semibold text-slate-200'>{selectedUser.fullName}</h3>
            <p className='text-xs text-slate-400'>{isUserOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-3 md:p-4 space-y-4 scroll-smooth flex flex-col'>
        {messages.length === 0 ? (
          <div className='h-full flex items-center justify-center text-slate-400'>
            <p className='text-center'>
              <span className='text-2xl mb-2 block'>👋</span>
              No messages yet. Say hi to {selectedUser.fullName}!
            </p>
          </div>
        ) : (
          messages.slice().reverse().map((message) => {
            const isOwnMessage =
              message.senderId === authUser._id || message.senderId._id === authUser._id
            const senderName = message.senderId?.fullName || 'Unknown'

            return (
              <div
                key={message._id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className='flex gap-2 max-w-xs flex-row'>
                  {!isOwnMessage && (
                    <img
                      src={message.senderId?.profilePic || '/avatar.png'}
                      alt={senderName}
                      className='size-8 rounded-full object-cover flex-shrink-0'
                    />
                  )}
                  <div>
                    <div
                      className={`rounded-lg px-3 py-2 break-words ${
                        isOwnMessage
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-slate-100 text-right'
                          : 'bg-slate-700/50 border border-slate-600/30 text-slate-200 text-left'
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt='message'
                          className='max-w-xs rounded-lg mb-2 max-h-64 object-cover'
                        />
                      )}
                      {message.text && <p className='text-sm'>{message.text}</p>}
                    </div>
                    <p
                      className={`text-xs text-slate-500 mt-1 ${
                        isOwnMessage ? 'text-right' : 'text-left'
                      }`}
                    >
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {typingUsers.has(selectedUser._id) && (
          <div className='flex gap-2'>
            <img
              src={selectedUser.profilePic || '/avatar.png'}
              alt={selectedUser.fullName}
              className='size-8 rounded-full object-cover flex-shrink-0'
            />
            <div className='bg-slate-700/50 border border-slate-600/30 rounded-lg px-3 py-2'>
              <div className='flex gap-1 items-center'>
                <span className='text-sm text-slate-400'>{selectedUser.fullName} is typing</span>
                <div className='flex gap-1'>
                  <div
                    className='size-1.5 bg-slate-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0s' }}
                  ></div>
                  <div
                    className='size-1.5 bg-slate-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className='size-1.5 bg-slate-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='p-3 md:p-4 border-t border-slate-700/50 space-y-3'>
        {selectedImage && (
          <div className='relative w-20 h-20 rounded-lg overflow-hidden border border-slate-600/50'>
            <img src={selectedImage} alt='preview' className='w-full h-full object-cover' />
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full size-5 flex items-center justify-center text-xs'
            >
              ✕
            </button>
          </div>
        )}

        <div className='flex gap-2'>
          <button
            onClick={() => fileInputRef.current?.click()}
            className='p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-slate-200'
          >
            <ImageIcon className='size-5' />
          </button>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageSelect}
            className='hidden'
          />

          <input
            type='text'
            placeholder='Type a message...'
            value={messageText}
            onChange={handleMessageChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className='input flex-1'
          />

          <button
            onClick={handleSendMessage}
            disabled={isSendingMessage || (!messageText.trim() && !selectedImage)}
            className='p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-cyan-400 transition-colors'
          >
            {isSendingMessage ? <Loader2 className='size-5 animate-spin' /> : <Send className='size-5' />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer