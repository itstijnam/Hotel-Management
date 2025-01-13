import { Patient } from "../models/patient.model.js";
import { DietChart } from "../models/dietchart.model.js";

export const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      roomNumber,
      bedNumber,
      floorNumber,
      diseases = [],
      allergies = [],
      contactInfo,
      emergencyContact,
      dietChart,
    } = req.body;

    if (!name || !age || !gender) {
      return res.status(400).json({
        message: "Name, Age, and Gender are required",
        success: false,
      });
    }

    if (!roomNumber || !bedNumber || !floorNumber) {
      return res.status(400).json({
        message: "Room Number, Bed Number, and Floor Number are required",
        success: false,
      });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      roomNumber,
      bedNumber,
      floorNumber,
      diseases,
      allergies,
      contactInfo,
      emergencyContact,
      dietChart,
    });

    await patient.populate({
      path: "dietChart",
      select: "patient meals createdAt",
    })

    return res.status(201).json({
      message: "Patient has been added successfully",
      success: true,
      patient,
    });
  } catch (error) {
    console.error("createPatient error:", error);
    return res.status(500).json({
      message: "An error occurred while creating the patient",
      success: false,
      error: error.message,
    });
  }
};


export const createDietChart = async (req, res) => {
  try {
    const {patientId} = req.params;
    const {meals} = req.body;

    // Validate required fields
    if (!patientId || !meals) {
      return res.status(400).json({
        message: "Patient ID and meals are required",
        success: false,
      });
    }

    // Validate that the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        success: false,
      });
    }

    // Check if a diet chart already exists for this patient
    if (patient.dietChart) {
      return res.status(400).json({
        message: "Diet chart already exists for this patient",
        success: false,
      });
    }

    // Validate the meals structure
    const { morning, evening, night } = meals;
    if (!morning || !evening || !night) {
      return res.status(400).json({
        message: "Meals must include morning, evening, and night details",
        success: false,
      });
    }

    // Create the diet chart
    const dietChart = await DietChart.create({
      patient: patient._id,
      meals: {
        morning,
        evening,
        night,
      },
    });

    // Link the diet chart to the patient
    patient.dietChart = dietChart._id;
    await patient.save();

    // Return success response
    return res.status(201).json({
      message: "Diet chart created successfully",
      success: true,
      dietChart,
    });
  } catch (error) {
    console.error("createDietChart error:", error);
    return res.status(500).json({
      message: "An error occurred while creating the diet chart",
      success: false,
      error: error.message,
    });
  }
};

export const getAllPatient = async (req, res)=>{
  try {
    const patients = await Patient.find();
    if(!patients) return res.status(400).json({message: 'Patience not found', success: false});

    return res.status(200).json({
      success: true,
      patients
    })
  } catch (error) {
    console.log(error)
  }
}

export const getOnePatient = async (req, res)=>{
  try {
    const {patientId} = req.params;
    const patient = await Patient.findById(patientId)
    if(!patient) return res.status(400).json({message: 'Patient not found',  success: false});

    return res.status(200).json({
      patient,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}