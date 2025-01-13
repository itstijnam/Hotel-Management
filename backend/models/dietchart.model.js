import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    meals: {
      morning: {
        ingredients: [String],
        instructions: String,
      },
      evening: {
        ingredients: [String],
        instructions: String,
      },
      night: {
        ingredients: [String],
        instructions: String,
      },
    },
    createdAt: { type: Date, default: Date.now },
  });

export const DietChart = mongoose.model('DietChart', dietChartSchema)
  