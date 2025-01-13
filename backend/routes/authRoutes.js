import express from "express";
import { signup, login, logout, getAllStaff, createPantryStaff } from "../controllers/authController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createDietChart, createPatient, getAllPatient, getOnePatient } from "../controllers/patientController.js";

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post('/patient/create', isAuthenticated, createPatient)
router.post('/patient/create-diet', isAuthenticated, createDietChart) //by manually input patientId
router.post('/patient/create-diet/:patientId', isAuthenticated, createDietChart) // by using params
router.get('/patient/:patientId', isAuthenticated, getOnePatient) // by using params
router.get('/patient', isAuthenticated, getAllPatient)
router.get('/staff', isAuthenticated, getAllStaff)
router.post('/staff/create-pantry', isAuthenticated, createPantryStaff)


export default router;
