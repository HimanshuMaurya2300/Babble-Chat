import React, { useEffect } from 'react'

import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/router'

const Home = () => {

  const { signOut, currentUser, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {

    if (!isLoading && !currentUser) {
      router.push('/login')
    }
  }, [currentUser, isLoading])


  return (
    <div>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default Home