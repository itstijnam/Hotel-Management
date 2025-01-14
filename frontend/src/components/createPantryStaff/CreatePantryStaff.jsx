import React, { useState } from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import './CreatePantryStaff.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function CreatePantryStaff() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    contactInfo: '',
    location: '',
    email: '',
    password: '',
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const createStaffHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/staff/create-pantry`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <div>
        <LeftSideBar />
      </div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="PantryForm">
          <div>Add New Pantry Member</div>
          <form onSubmit={createStaffHandler}>
            <div>
              <span>Name</span>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Name"
              />
            </div>
            <div>
              <span>Contact Information</span>
              <Input
                type="text"
                name="contactInfo"
                value={input.contactInfo}
                onChange={changeEventHandler}
                placeholder="Contact Information"
              />
            </div>
            <div>
              <span>Location</span>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Location"
              />
            </div>
            <div>
              <span>Email</span>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Email"
              />
            </div>
            <div>
              <span>Password</span>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Password"
              />
            </div>
            <Button type="submit">Create Pantry Staff</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePantryStaff;