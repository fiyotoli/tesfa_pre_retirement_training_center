import mongoose from "mongoose";

const EmployeeProfileSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  firstName: { type: String, required: true },
  image: { type: Array, required: true },
  lastName: { type: String, required: true },

  educationLevel: { 
    type: String, 
    enum: ['High School', 'Diploma', 'Degree', 'Masters', 'PhD'], 
    required: true 
  },
  totalWorkExperience: { type: Number, required: true },
  workExperienceGovernment: { type: Number, required: true },
  workExperienceSelf: { type: Number, required: true },
  additionalSkills: { type: [String], default: [] },
  neededJobType: { type: [String], required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  currentLocation: {
    city: { type: String },
    region: { type: String },
    country: { type: String },
  },
  workExperience: [
    {
      companyName: String,
      jobTitle: String,
      startDate: Date,
      endDate: Date,
      responsibilities: [String], // bullet points
    },
  ],
  education: [
    {
      institution: String,
      graduationYear: Number,
    },
  ],
  projects: [
    {
      projectTitle: String,
      description: String,
      role: String,
    },
  ],
 language: [
  {
    language: {
      type: String,
      enum: [
        "English",
        "Amharic",
        "Oromo",
        "Tigrigna",
        "Arabic",
        "French",
        "Chinese",
        "Other"
      ],
      required: true,
    },
    proficiency: {
      type: String,
      enum: ["Native", "Fluent", "Intermediate", "Basic"],
      required: true,
    }
  }
],


}, {
  timestamps: true  // <-- Correct place for timestamps option
});

const EmployeeProfile = mongoose.models.product || mongoose.model("product", EmployeeProfileSchema);

export default EmployeeProfile;
