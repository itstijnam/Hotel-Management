import React from 'react'
import './Admin.css'
import { Outlet } from 'react-router-dom'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import RightSideBar from '../RightSideBar/RightSideBar'
import { useSelector } from 'react-redux'

function Admin() {
  const {dietMeal} = useSelector((store)=> {return store.dietMeal})
  // console.log(dietMeal);
  return (
    <div className='adminBox h-screen'>
      <div className='adminPageLeftBox h-screen' >
      <LeftSideBar />
      </div>
      <div className='adminPageRightBox h-screen'>
        <RightSideBar/>
      </div>
    </div>
  )
}

export default Admin
