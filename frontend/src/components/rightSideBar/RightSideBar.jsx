import React from 'react'
import './RightSideBar.css'
import Patient from '../patientDiet/PatientDiet'
import useGetAllPatient from '@/hooks/useGetAllPatient';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PatientDiet from '../patientDiet/PatientDiet';
import useGetAllStaff from '@/hooks/useGetAllStaff';

function RightSideBar() {
  useGetAllPatient();
  useGetAllStaff();
  const navigate = useNavigate();
  const { allPatient } = useSelector((store) => store?.dietMeal);
  const { user } = useSelector((store) => store?.auth);
  const { staffProfile } = useSelector((store) => store?.auth);
  const { staffDetail } = useSelector((store) => store?.auth);
  
  //admin/patient/create-diet/:patientId
  const createFoodChartHandler = (patientId, singlepatient) => {
    <Patient singlepatient={singlepatient} />
    navigate(`patient/create-diet/${patientId}`, { state: { patientId} });
  };

  return (
    <div className="rightSideBar h-screen">
      <div>
        Patient
      </div>
      <div className='createDiet bg-gray-700 text-white'>
        <div className='bg-white text-black font-bold' >Create diet</div>
        {
          allPatient.map((singlepatient) => {
            return (
              <div key={singlepatient._id} className='flex justify-between px-5 py-3 createPatientChart'>
                <div className="patientName">{singlepatient.name} </div>
                <span>Create Food chart</span>
                <span onClick={()=>createFoodChartHandler(singlepatient?._id, singlepatient)}>Create Food chart</span>
              </div>
            )
          })
        }
      </div>
      <div>
        {
          staffProfile.map((singleStaff)=>{
            {
              return(
              singleStaff?.role !== 'Admin' &&
              <div key={singleStaff._id} className='bg-gray-700 text-white'>
                  <div className='flex justify-between'>
                    <div>{singleStaff?.role}</div>
                    <div>{singleStaff?.email}</div>
                  </div>
              </div>
            )
              }
          })
        }
      </div>
      <div>
        delivery
      </div>
    </div>
  )
}

export default RightSideBar
