import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Loader2, User } from 'lucide-react'

function ContactList({ onSelectChat }) {
  const { allContacts, isUsersLoading, setSelectedUser, selectedUser, getAllContacts, onlineUsers } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loader2 className='size-5 text-cyan-500 animate-spin' />
      </div>
    );
  }

  if (allContacts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-8 text-slate-400'>
        <User className='size-8 mb-2 opacity-50' />
        <p className='text-sm'>No contacts available</p>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      {allContacts.map((user) => (
        <button
          key={user._id}
          onClick={() => {
            setSelectedUser(user);
            onSelectChat?.();
          }}
          className={`w-full p-3 rounded-lg transition-colors text-left ${
            selectedUser?._id === user._id
              ? 'bg-slate-700/60 border border-cyan-500/30'
              : 'hover:bg-slate-700/40'
          }`}
        >
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <img
                src={user.profilePic || '/avatar.png'}
                alt={user.fullName}
                className='size-10 rounded-full object-cover'
              />
              {onlineUsers.has(user._id) && (
                <div className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border border-slate-800' />
              )}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-slate-200 truncate'>{user.fullName}</p>
              <p className='text-xs text-slate-400'>{user.email}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ContactList
