import React from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { userChatContext } from '@/context/chatContext'
import ChatFooter from './ChatFooter'
import { useAuth } from '@/context/authContext'


const Chat = () => {

    const { currentUser } = useAuth()
    const { data, users } = userChatContext()


    const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(u => u === data.user.uid)

    const IamBlocked = users[data.user.uid]?.blockedUsers?.find(u => u === currentUser.uid)


    return (
        <div className='flex flex-col p-5 grow'>

            <ChatHeader />

            {data.chatId && <Messages />}

            {!isUserBlocked && !IamBlocked && <ChatFooter />}

            {isUserBlocked && <div className='w-full text-center text-c3 py-5'>
                This user has been blocked
            </div>}

            {IamBlocked && <div className='w-full text-center text-c3 py-5'>
                {`${data.user.displayName} has blocked you!`}
            </div>}

        </div>
    )
}

export default Chat