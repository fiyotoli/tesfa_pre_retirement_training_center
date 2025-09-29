import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  organizationType: {
    type: String,
    enum: ['Government', 'NGO', 'Private Company', 'Other'],
    required: true,
  },
  organizationTypeOther: {
    type: String, // only filled if 'Other' is selected
    default: '',
  },
  jobTitle: {
    type: [String],
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Consultancy', 'Other'],
    required: true,
  },
  jobTypeOther: {
    type: String, // only filled if 'Other' is selected
    default: '',
  },
  jobDescription: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 500,
  },
  educationLevel: {
    type: String,
    enum: ['Diploma', "Bachelor's Degree", "Master's Degree", 'PhD', 'Other'],
    required: true,
  },
  educationLevelOther: {
    type: String, // only filled if 'Other' is selected
    default: '',
  },
  workExperience: {
    type: Number,
    required: true,
    min: 0,
  },
  requiredSkills: {
    type: [String], // Array of strings (tags)
    default: [],
  },
  jobLocation: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
