import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

function Nav() {
  const navBarList = [
    {text: 'Home', pageNavUrl: '/'},
    {text: 'Speciality', pageNavUrl: '/'},
    {text: 'Health Library', pageNavUrl: '/'},
    {text: 'Services', pageNavUrl: '/'},
    {text: 'International Patients', pageNavUrl: '/'},
    {text: 'Careers', pageNavUrl: '/'},
    {text: 'Contact Us', pageNavUrl: '/'},
  ]
  return (
    <div className='navbarList'>
      {
        navBarList.map((nav, index)=> {
          return (
            <div key={index}>
              <Link to={nav.pageNavUrl} >{nav.text} </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Nav