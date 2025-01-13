import mongoose from "mongoose";

const mealDeliverySchema = new mongoose.Schema({
    dietChart: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    deliveryPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPersonnel" },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Delivered"],
      default: "Pending",
    },
    deliveryTime: Date,
    notes: String,
  });
  
export const MealDelivery = mongoose.model('MealDelivery', mealDeliverySchema);