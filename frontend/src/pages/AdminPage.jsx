import Admin from '@/components/admin/Admin'
import RightSideBar from '@/components/rightSideBar/RightSideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminPage() {
  return (
    <>
      <div className="h-screen w-screen">
        <Admin />
        <div>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default AdminPage
