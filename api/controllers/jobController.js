import Job from "../models/JobModel.js";

// Helper to safely parse arrays or strings
const parseField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    return JSON.parse(field);
  } catch {
    return [field];
  }
};

// Add Job Controller
const AddJob = async (req, res) => {
  try {
    const {
      organizationName,
      organizationType,
      organizationTypeOther,
      jobTitle,
      jobType,
      jobTypeOther,
      jobDescription,
      educationLevel,
      educationLevelOther,
      workExperience,
      requiredSkills,
      jobLocation,
      applicationDeadline,
      contactEmail,
      phoneNumber,
    } = req.body;

    const parsedSkills = parseField(requiredSkills);

    const job = new Job({
      organizationName,
      organizationType,
      organizationTypeOther: organizationType === "Other" ? organizationTypeOther : "",
      jobTitle,
      jobType,
      jobTypeOther: jobType === "Other" ? jobTypeOther : "",
      jobDescription,
      educationLevel,
      educationLevelOther: educationLevel === "Other" ? educationLevelOther : "",
      workExperience: Number(workExperience),
      requiredSkills: parsedSkills,
      jobLocation,
      applicationDeadline,
      contactEmail,
      phoneNumber,
    });

    await job.save();
    res.json({ success: true, message: "Job Posted Successfully" });
  } catch (error) {
    console.error("AddJob Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit Job Controller
const EditJob = async (req, res) => {
  try {
    const {
      id,
      organizationName,
      organizationType,
      organizationTypeOther,
      jobTitle,
      jobType,
      jobTypeOther,
      jobDescription,
      educationLevel,
      educationLevelOther,
      workExperience,
      requiredSkills,
      jobLocation,
      applicationDeadline,
      contactEmail,
      phoneNumber,
    } = req.body;

    const parsedSkills = parseField(requiredSkills);

    const updatedFields = {
      organizationName,
      organizationType,
      organizationTypeOther: organizationType === "Other" ? organizationTypeOther : "",
      jobTitle,
      jobType,
      jobTypeOther: jobType === "Other" ? jobTypeOther : "",
      jobDescription,
      educationLevel,
      educationLevelOther: educationLevel === "Other" ? educationLevelOther : "",
      workExperience: Number(workExperience),
      requiredSkills: parsedSkills,
      jobLocation,
      applicationDeadline,
      contactEmail,
      phoneNumber,
    };

    await Job.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });

    res.json({ success: true, message: "Job Updated Successfully" });
  } catch (error) {
    console.error("EditJob Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all jobs
const ListJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ success: true, jobs });
  } catch (error) {
    console.error("ListJobs Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single job

const SingleJob = async (req, res) => {
  try {
    const { id } = req.body;
const job = await Job.findById(id);

    res.json({ success: true, job });
  } catch (error) {
    console.error("SingleJob Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Remove job
const RemoveJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Job Removed Successfully" });
  } catch (error) {
    console.error("RemoveJob Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get job stats
const getJobStats = async (req, res) => {
  try {
    const count = await Job.countDocuments();
    const latest = await Job.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, count, latest });
  } catch (error) {
    console.error("getJobStats Error:", error);
    res.status(500).json({ success: false, message: "Failed to get job stats" });
  }
};

export {
  AddJob,
  EditJob,
  ListJobs,
  SingleJob,
  RemoveJob,
  getJobStats,
};
