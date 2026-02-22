import React from 'react'
import { useChatStore } from '../store/useChatStore'

export default function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className='flex gap-2 p-4 border-b border-slate-700/50'>
      <button
        onClick={() => setActiveTab('chats')}
        className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
          activeTab === 'chats'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
            : 'bg-slate-700/30 text-slate-400 hover:bg-slate-700/50'
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab('contacts')}
        className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
          activeTab === 'contacts'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
            : 'bg-slate-700/30 text-slate-400 hover:bg-slate-700/50'
        }`}
      >
        Contacts
      </button>
    </div>
  )
}
