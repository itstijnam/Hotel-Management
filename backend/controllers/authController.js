import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userschema.model.js";
import { PantryStaff } from "../models/pantrystaff.model.js"; 

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const signup = async (req, res) => {
  try {
    const { name, role, email, password } = req.body;

    if(!name || !role || !email || !password){
      return res.status(400).json({
        message: 'Please enter all details',
        success: false
      })
    }

    if (!["Admin", "PantryStaff", "DeliveryPersonnel"].includes(role)) {
      return res.status(400).json({
        message: "Choose among Admin, Pantry Staff or Food Delivery",
        success: false
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Please try another email",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false
      });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie('token', '', { maxAge: 0 }).json({
      message: 'Logged Out successfully',
      success: true
    })
  } catch (error) {
    console.log(`Error :: controller :: user.controller :: logout :: error: ${error}`);
  }
}

export const createPantryStaff = async (req, res) => {
  try {
    const { name, contactInfo, location, tasks, userId } = req.body;

    if (!name || !contactInfo || !userId) {
      return res.status(400).json({
        message: "Please provide all required fields: name, contactInfo, and userId",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.role !== "PantryStaff") {
      return res.status(400).json({
        message: "User must have the role of PantryStaff to create a PantryStaff entry",
        success: false,
      });
    }

    await PantryStaff.create({
      name,
      contactInfo,
      location,
      tasks,
      user: userId,
    });


    return res.status(201).json({
      message: "PantryStaff created successfully",
      success: true,
      data: populatedPantryStaff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating PantryStaff",
      success: false,
      error: error.message,
    });
  }
};


export const getAllStaff = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) return res.status(400).json({ message: 'Something went wrong', success: false });
    const staffDetail = await PantryStaff.find();    
    if (!staffDetail) return res.status(400).json({ message: 'Something went wrong', success: false });

    return res.status(200).json({
      users,
      staffDetail,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}

