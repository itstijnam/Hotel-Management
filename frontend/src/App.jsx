import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PantryStaffPage from './pages/PantryStaffPage';
import DeliveryPersonnel from './components/deliveryPersonnel/DeliveryPersonnel';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import Patient from './components/patientDiet/PatientDiet';
import AddPatient from './components/addPatient/AddPatient';
import PatientDiet from './components/patientDiet/PatientDiet';
import CreatePantryStaff from './components/createPantryStaff/createPantryStaff';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/pantry-staff',
    element: (
      <ProtectedRoute allowedRoles={['PantryStaff']}>
        <PantryStaffPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/add-staff',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <SignupPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <AdminPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/patient/create',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <AddPatient/>
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/pantry-staff/create',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <CreatePantryStaff/>
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/patient/create-diet',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <PatientDiet />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/patient/create-diet/:patientId',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <PatientDiet />
      </ProtectedRoute>
    )
  },
  {
    path: '/delivery-duty',
    element: (
      <ProtectedRoute allowedRoles={['DeliveryPersonnel']}>
        <DeliveryPersonnel />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
