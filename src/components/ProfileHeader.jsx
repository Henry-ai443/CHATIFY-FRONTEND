import React from 'react';
import { LogOut, VolumeOffIcon, Volume2Icon } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { useRef } from 'react';

const mouseClickedSound = new Audio("/sounds/mouse-click.mp3");

export default function ProfileHeader() {
    const {logout, authUser, updateProfile} = useAuthStore();
    const {isSoundEnabled, toggleSound} = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);
   const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profilePic", file);

  setSelectedImg(URL.createObjectURL(file)); // preview only

  await updateProfile(formData);
};

  return (
    <div className='p-6 border-b border-slate-700/50'>

        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                {/* Avatar */}
                <div className='avatar online'>
                    <button className='size-14 rounded-full overflow-hidden relative group' onClick={() => fileInputRef.current.click()}>
                        <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="User image" 
                        className='size-full object-cover'
                        />

                        <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>

                            <span className='text-white text-sm'>Change Picture</span>
                        </div>
                    </button>
                    <input type="file" accept='images/*'
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className='hidden'
                    />
                </div> 

                <div>
                    <h3 className='text-slate-200 font-medium text-sm xs:text-base max-w-[150px] xs:max-w-[200px] truncate'>
                        {authUser.fullName}
                    </h3>

                    <p className=' text-slate-400 text-xs'>Online</p>
                </div>
            </div>



            <div className='flex items-center gap-3'>
                <button onClick={() => {mouseClickedSound.currentTime = 0;
                    mouseClickedSound.play().catch((error) => console.log("Error playing sound:", error));
                    toggleSound();
                } }
                className='p-2 rounded-full hover:bg-slate-700/50 transition-colors'
            >

                    {isSoundEnabled ?(
                        <Volume2Icon className='size-5 text-slate-300'/>
                    ) : (
                        <VolumeOffIcon className='size-5 text-slate-300'/>
                    )}
                    
                </button>
                <button onClick={logout} className='p-2 rounded-full hover:bg-slate-700/50 transition-colors'>
                    <LogOut className='size-5 text-slate-300'/>
                </button>
            </div>
        </div>
      
    </div>
  )
}
