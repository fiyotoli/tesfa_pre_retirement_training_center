import mongoose from "mongoose";

const TrainerPendingPaymentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: Array, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {type: String, required: true },
}, {
  timestamps: true  // automatically adds createdAt and updatedAt
});

const TrainerPendingPayment = mongoose.models.TrainerPendingPayment || 
  mongoose.model("TrainerPendingPayment", TrainerPendingPaymentSchema);

export default TrainerPendingPayment;
