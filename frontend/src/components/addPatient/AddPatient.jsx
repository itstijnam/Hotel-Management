import React, { useState } from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import './AddPatient.css'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddPatient() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: '',
        age: '',
        gender: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        diseases: '',
        allergies: '',
        contactInfo: '',
        emergencyContact: ''
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const addPatientHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/patient/create`, input,{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            console.log(res)
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/admin')
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='addPatientOuterLayer h-screen'>
            <div className='APLeftBox'>
                <LeftSideBar />
            </div>
            <div className='APRightBox h-screen'>
                <form onSubmit={addPatientHandler} className='w-screen flex flex-shrink'>
                    <div className='addPatientInput'>
                        <span>Name</span>
                        <Input type='text' name='name' value={input.name} onChange={changeEventHandler} placeholder='Name' className='' />
                    </div>
                    <div className='flex gap-40 addPatientInput'>
                        <div>
                            <span>Age</span>
                            <Input type='number' name='age' value={input.age} onChange={changeEventHandler} placeholder='Age' className='' />
                        </div>
                        <div>
                            <span>Gender</span>
                            <Input type='text' name='gender' value={input.gender} onChange={changeEventHandler} placeholder='Gender' className='' />
                        </div>
                    </div>
                    <div className='flex gap-4 addPatientInput'>
                        <div>
                            <span>Room Number</span>
                            <Input type='text' name='roomNumber' value={input.roomNumber} onChange={changeEventHandler} placeholder='Room Number' className='' />
                        </div>
                        <div>
                            <span>Bed Number</span>
                            <Input type='text' name='bedNumber' value={input.bedNumber} onChange={changeEventHandler} placeholder='Bed Number' className='' />
                        </div>
                        <div>
                            <span>Floor Number</span>
                            <Input type='text' name='floorNumber' value={input.floorNumber} onChange={changeEventHandler} placeholder='Floor Number' className='' />
                        </div>
                    </div>
                    <div className='flex gap-40 addPatientInput'>
                        <div>
                            <span>Diseases</span>
                            <Input type='text' name='diseases' value={input.diseases} onChange={changeEventHandler} placeholder='Diseases' className='' />
                        </div>
                        <div>
                            <span>Allergies</span>
                            <Input type='text' name='allergies' value={input.allergies} onChange={changeEventHandler} placeholder='Allergies' className='' />
                        </div>
                    </div>
                    <div className='flex gap-40 addPatientInput'>
                        <div>
                            <span>Contact Information</span>
                            <Input type='text' name='contactInfo' value={input.contactInfo} onChange={changeEventHandler} placeholder='Contact Information' className='' />
                        </div>
                        <div>
                            <span>Emergency Contact</span>
                            <Input type='text' name='emergencyContact' value={input.emergencyContact} onChange={changeEventHandler} placeholder='Emergency Contact' className='' />
                        </div>
                    </div>
                    <Button type='submit'>Add Patient</Button>
                </form>
            </div>
        </div>
    )
}

export default AddPatient