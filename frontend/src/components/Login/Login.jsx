import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthUser } from '@/store/authSlice';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import './Login.css'
import { Button } from '../ui/button';
import LOGO from '../../../src/assets/camfro-video_stream.png'

function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        const user = res.data.user;
        toast.success(res.data.message);

        // Store user in Redux
        dispatch(setAuthUser(user));

        // Redirect based on role
        switch (user.role) {
          case 'PantryStaff':
            navigate('/pantry-staff');
            break;
          case 'Admin':
            navigate('/admin');
            break;
          case 'DeliveryPersonnel':
            navigate('/delivery-duty');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className=' h-screen w-screen LoginFormContainer'>
      <div className='LoginFormBox'>
        <div className='logoDetail mt-3 '>
          <div className="loginImage">
            <img src={LOGO} alt="logo_img" />
            <div className='flex justify-center items-center font-bold font-serif '><span>LOGIN</span></div>
          </div>
        </div>
        <form onSubmit={loginFormHandler}>
          <div>
            <label>Email:</label>
            <Input
              type="email"
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
          <Button type="submit" className='w-full'>Login</Button>
        </form>
        <div className='mb-8'>
        <p>Don't employee? Please visit <Link to='/' ><span className='text-sky-900' >Home</span></Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
