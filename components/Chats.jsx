import React, { useEffect } from 'react'
import { userChatContext } from '@/context/chatContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/firebase'


const Chats = () => {

    const { users, setUsers } = userChatContext()

    useEffect(() => {

        onSnapshot(collection(db, 'users'),

            (snapshot) => {

                const updatedUsers = {}

                snapshot.forEach((doc) => {
                    updatedUsers[doc.id] = doc.data()
                    console.log(doc.data())
                })

                setUsers(updatedUsers)
            }
        )

    }, [])


    return (
        <div>Chats</div>
    )
}

export default Chats