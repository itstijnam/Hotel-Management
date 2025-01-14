import mongoose from "mongoose";

const pantryStaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    location: {String},
    email: {type: String, unique: true, required:true },
    password: {type: String,  required: true},
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "MealDelivery" }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}

  });

export const PantryStaff = mongoose.model('PantryStaff', pantryStaffSchema);