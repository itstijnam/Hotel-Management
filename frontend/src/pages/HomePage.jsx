import React from 'react'
import { useSelector } from 'react-redux'
import Home from '@/components/home/Home'

function HomePage() {
  const {user} = useSelector(store => store.auth)
  return (
    <>
      <Home/>
    </>
  )
}

export default HomePage