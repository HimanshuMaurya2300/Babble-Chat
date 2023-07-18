import { useAuth } from '@/context/authContext'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { userChatContext } from '@/context/chatContext'
import Image from 'next/image'
import ImageViewer from 'react-simple-image-viewer'
import { Timestamp } from 'firebase/firestore'
import { formatDate, wrapEmojisInHtmlTag } from '@/utils/helpers'
import Icon from './Icon'
import { GoChevronDown } from 'react-icons/go'
import MessageMenu from './MessageMenu'
import DeleteMessagePopup from './popup/DeleteMessagePopup'



const Message = ({ message }) => {

    const [showMenu, setShowMenu] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)

    const { currentUser } = useAuth()
    const { users, data, imageViewer, setImageViewer } = userChatContext()

    const self = message.sender === currentUser.uid


    const timeStamp = new Timestamp(
        message.date?.seconds,
        message.date?.nanoseconds,
    )


    const date = timeStamp.toDate()


    return (
        <div className={`mb-5 max-w-[75%] ${self ? 'self-end' : ''}`}>

            <DeleteMessagePopup
                onHeight={() => setShowDeletePopup(false)}
                noHeader={true}
                shortHeight={true}
                self={self}
                className='DeleteMessagePopup'
            />

            <div className={`flex item-end gap-3 mb-1 ${self ? 'justify-start flex-row-reverse' : ''}`}>
                <Avatar
                    size='small'
                    user={self ? currentUser : users[data.user.uid]}
                    className='mb-4'
                />

                <div className={`group flex flex-col gap-4 p-4 rounded-3xl relative break-all ${self ? 'rounded-br-md bg-c5' : 'rounded-bl-md bg-c1'}`}>

                    {message.text && (
                        <div
                            dangerouslySetInnerHTML={{ __html: wrapEmojisInHtmlTag(message.text) }}
                            className='text-sm'
                        >

                        </div>
                    )}

                    {message.img && (
                        <>
                            <Image
                                src={message.img}
                                width={250}
                                height={250}
                                alt={message?.text || ""}
                                className='rounded-3xl max-w-[250px]'
                                onClick={() => {
                                    setImageViewer({
                                        msgId:
                                            message.id,
                                        url: message.img
                                    })
                                }}
                            />

                            {imageViewer && imageViewer.msgId === message.id && (
                                <ImageViewer
                                    src={[imageViewer.url]}
                                    currentIndex={0}
                                    disableScroll={false}
                                    closeOnClickOutside={true}
                                    onClose={() => setImageViewer(null)}
                                />
                            )}
                        </>
                    )}


                    <div className={`${showMenu ? "" : "hidden"} group-hover:flex absolute top-2 ${self ? 'left-2 bg-c5' : 'right-2 bg-c1'}`} onClick={() => setShowMenu(true)}>
                        <Icon
                            size='medium'
                            className='hover:bg-inherit rounded-none'
                            icon={<GoChevronDown size={24} className='text-c3' />}
                        />

                        {showMenu && <MessageMenu
                            self={self}
                            setShowMenu={setShowMenu}
                            showMenu={showMenu}
                        />}
                    </div>

                </div>
            </div>

            <div className={`flex items-end ${self ? 'justify-start flex flex-row-reverse mr-12' : 'ml-12'}`}>
                <div className='text-xs text-c3'>
                    {formatDate(date)}
                </div>
            </div>
        </div>
    )
}

export default Message