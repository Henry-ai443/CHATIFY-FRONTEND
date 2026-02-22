import React from 'react'
import { MessageCircle } from 'lucide-react'

function NoConversationPlaceholder() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-4 p-8'>
      <div className='bg-slate-800/50 p-6 rounded-full'>
        <MessageCircle className='size-12 text-slate-400' />
      </div>
      <div className='text-center'>
        <h3 className='text-xl font-semibold text-slate-200 mb-2'>No conversation selected</h3>
        <p className='text-slate-400 text-sm'>Select a chat to start messaging</p>
      </div>
    </div>
  )
}

export default NoConversationPlaceholder
