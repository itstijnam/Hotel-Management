import mongoose from "mongoose";

const deliveryPersonnelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    assignedMeals: [{ type: mongoose.Schema.Types.ObjectId, ref: "MealDelivery" }],
  });
  
export const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonnelSchema);