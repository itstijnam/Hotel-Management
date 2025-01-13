import React from 'react'
import './Home.css'
import Nav from '../nav/Nav'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { SquarePlus } from 'lucide-react'
import { toast } from 'sonner'
import { setAuthUser } from '@/store/authSlice'
import axios from 'axios'

function Home() {
    const { user } = useSelector((store) => { return store.auth })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true });
            if (res.data.success) {
                console.log(user)
                toast.success(res.data.message)
                dispatch(setAuthUser(null))
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='w-screen'>
            <div className='w-screen bg-gray-700 NavBar' >
                <div>
                    logo
                </div>
                <Nav />
                <div className='flex gap-2' >
                    {
                        user?.role == 'DeliveryPersonnel' &&
                        <Link to='/delivery-duty' className='flex gap-2' >
                            <p className='text-orange-300 cursor-pointer'>Checkout Delivery</p>
                            <p className='text-white cursor-pointer '>{user.role} </p>
                        </Link>
                    }
                    {
                        user?.role == 'PantryStaff' &&
                        <Link to='/pantry-staff' className='flex gap-2' >
                            <p className='text-orange-300 cursor-pointer'>Checkout FoodTask</p>
                            <p className='text-white cursor-pointer '>{user.role} </p>
                        </Link>
                    }
                    {
                        user?.role == 'Admin' &&
                        <Link to='/admin' className='flex gap-2' >
                            <p className='text-orange-300 cursor-pointer'><SquarePlus></SquarePlus></p>
                            <p className='text-orange-300 cursor-pointer'>Manager</p>
                            <p className='text-orange-300 cursor-pointer'>{user.role} </p>
                        </Link>
                    }
                    {
                        user && <button onClick={logoutHandler} className='bg-gray-900 px-2 text-orange-300 rounded' >Logout</button>
                    }
                    {
                        !user && <p><Link to='/login' >Login</Link></p>
                    }
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Home