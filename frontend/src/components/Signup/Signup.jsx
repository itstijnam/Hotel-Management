import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import LOGO from '../../../src/assets/camfro-video_stream.png'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {
  const [input, setInput] = useState({
    name: '',
    role: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const createAccountHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/signup`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className=' h-screen w-screen LoginFormContainer'>
      <div className='LoginFormBox'>
        <div className='logoDetail mt-3 '>
          <div className="loginImage">
            <img src={LOGO} alt="logo_img" />
            <div className='flex justify-center items-center font-bold font-serif '><span>Assign Duty</span></div>
          </div>
        </div>
        <form onSubmit={createAccountHandler}>
          <div className='flex'>
            <div>
              <label>Name:</label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <label>Role:</label>
              <Input
                type="text"
                name="role"
                value={input.role}
                onChange={changeEventHandler}
                required
              />
            </div>
          </div>
          <div className='flex'>
            <div>
              <label>Email:</label>
              <Input
                type="text"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                required
              />
            </div>
          </div>
          <Button type="submit" className='w-full'>Create Employee</Button>
        </form>
        <div className='mb-8'>
          <p>Not an Employee? Please visit <Link to='/' ><span className='text-sky-900' >Home</span></Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup