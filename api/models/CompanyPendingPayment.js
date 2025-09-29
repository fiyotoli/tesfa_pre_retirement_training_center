import mongoose from "mongoose";

const CompanyPendingPaymentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },         // Full Name
    companyName: { type: String, required: true },      // Company Name
    businessType: { type: String, required: true },     // Business Type
    phoneNumber: { type: String, required: true },      // Phone Number
    email: { type: String, required: true },            // Email Address
    companyAddress: { type: String, required: true },   // Company Address
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

const CompanyPendingPayment =
  mongoose.models.CompanyPendingPayment ||
  mongoose.model("CompanyPendingPayment", CompanyPendingPaymentSchema);

export default CompanyPendingPayment;
