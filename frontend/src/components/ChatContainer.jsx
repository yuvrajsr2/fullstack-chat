import { useEffect, useRef } from 'react'
import {useChatStore} from '../store/useChatStore'
import {userAuthStore} from '../store/useAuthStore'

import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import {formatDate} from '../lib/utils'

const ChatContainer = () => {

  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore()

  const {authUser} = userAuthStore();
  const messageEndRef = useRef(null);


  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
        unsubscribeFromMessages();
    }
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);


  useEffect(() => {
    if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  if (isMessagesLoading) 
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput />
      </div>
  )


  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((messages) => (
          <div key={messages._id} className={`chat ${messages.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={messages.senderId === authUser._id ? authUser.profilePic || '/user.png' : selectedUser.profilePic || '/user.png'} alt="profilepic" />
              </div>
            </div>

            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>{formatDate(messages.createdAt)}</time>
            </div>

            <div className='chat-bubble flex flex-col'>
              {messages.image && (
                <img src={messages.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
              )}
              {messages.text && <p>{messages.text}</p>}
            </div>
            
          </div>

        ))}
        
      </div>

      <MessageInput />
      
    </div>
  )
}

export default ChatContainer
