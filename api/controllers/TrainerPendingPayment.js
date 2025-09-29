import TrainerPendingPayment from "../models/TrainerPendingPayment.js";
import { v2 as cloudinary } from "cloudinary";

// Helper to safely parse arrays
const parseArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    return JSON.parse(field);
  } catch {
    return [field];
  }
};

// Add Employee Controller
const AddEmployee = async (req, res) => {
  try {
    const {
     
      firstName,
      lastName,
     
      educationLevel,
      totalWorkExperience,
      workExperienceGovernment,
      workExperienceSelf,
      additionalSkills,
      neededJobType,
      email,
      phoneNumber,
      isFeatured,

      // New fields
      currentLocation,
      education,
      workExperience,
      projects,
      language,      // single language
       // single proficiency
    } = req.body;

    const parsedAdditionalSkills = parseArrayField(additionalSkills);
    const parsedNeededJobType = parseArrayField(neededJobType);
    const parsedEducation = parseArrayField(education);
    const parsedWorkExperience = parseArrayField(workExperience);
    const parsedProjects = parseArrayField(projects);
    const parsedLanguages = JSON.parse(language);

    const parsedLocation = typeof currentLocation === "string" ? JSON.parse(currentLocation) : currentLocation;

    // Upload image to cloudinary
    const image1 = req.files?.image1?.[0];
    let imagesUrl = [];
    if (image1) {
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: "image",
      });
      imagesUrl.push(result.secure_url);
    }

    const employee = new TrainerPendingPayment({
     
      firstName,
      lastName,
     
      educationLevel,
      totalWorkExperience: Number(totalWorkExperience),
      workExperienceGovernment: Number(workExperienceGovernment),
      workExperienceSelf: Number(workExperienceSelf),
      additionalSkills: parsedAdditionalSkills,
      neededJobType: parsedNeededJobType,
      email,
      phoneNumber,
      image: imagesUrl,
      isFeatured: isFeatured === "true" || isFeatured === true || false,
      currentLocation: parsedLocation,
      education: parsedEducation,
      workExperience: parsedWorkExperience,
      projects: parsedProjects,
    language: parsedLanguages,

    });

    await employee.save();
    res.json({ success: true, message: "Trainer Registered Successfully" });
  } catch (error) {
    console.error("AddEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const safeParse = (data) => {
  if (!data) return [];
  if (typeof data === 'object') return data; // already parsed
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const EditEmployee = async (req, res) => {
  try {
    const {
      id,
     
      firstName,
      lastName,
     
      educationLevel,
      totalWorkExperience,
      workExperienceGovernment,
      workExperienceSelf,
      email,
      phoneNumber,
      isFeatured,
      currentLocation,
      education,
      workExperience,
      projects,
      language,
      proficiency,
    } = req.body;

    console.log('Raw workExperience:', workExperience);
    console.log('Type:', typeof workExperience);

    const additionalSkills = parseArrayField(req.body.additionalSkills);
    const neededJobType = parseArrayField(req.body.neededJobType);

    // Parse arrays or objects safely
    const parsedEducation = safeParse(education);
    const parsedWorkExperience = safeParse(workExperience);
    const parsedProjects = safeParse(projects);
    const parsedLanguage = safeParse(language);

    // Parse currentLocation safely
    let parsedLocation = currentLocation;
    if (typeof currentLocation === "string") {
      try {
        parsedLocation = JSON.parse(currentLocation);
      } catch {
        parsedLocation = currentLocation;
      }
    }

    const image1 = req.files?.image1?.[0];
    let imagesUrl = [];

    if (image1) {
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: "image",
      });
      imagesUrl.push(result.secure_url);
    }

    const updatedFields = {
     
      firstName,
      lastName,
     
      educationLevel,
      totalWorkExperience: Number(totalWorkExperience),
      workExperienceGovernment: Number(workExperienceGovernment),
      workExperienceSelf: Number(workExperienceSelf),
      additionalSkills,
      neededJobType,
      email,
      phoneNumber,
      isFeatured: isFeatured === "true" || isFeatured === true || false,
      currentLocation: parsedLocation,
      education: parsedEducation,
      workExperience: parsedWorkExperience,
      projects: parsedProjects,
      language: parsedLanguage,
      proficiency,
    };

    if (imagesUrl.length > 0) {
      updatedFields.image = imagesUrl;
    }

    await TrainerPendingPayment.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: "Employee Updated" });
  } catch (error) {
    console.error("EditEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// Get all employees
const ListEmployee = async (req, res) => {
  try {
    const employees = await TrainerPendingPayment.find();
    res.json({ success: true, employees });
  } catch (error) {
    console.error("ListEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get featured employees
const ListFeaturedEmployees = async (req, res) => {
  try {
    const featured = await TrainerPendingPayment.find({ isFeatured: true });
    res.json({ success: true, employees: featured });
  } catch (error) {
    console.error("ListFeaturedEmployees Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single employee
const SingleEmployee = async (req, res) => {
  try {
    const { id } = req.body;
const employee = await TrainerPendingPayment.findById(id);

    res.json({ success: true, employee });
  } catch (error) {
    console.error("SingleEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete employee
const RemoveEmployee = async (req, res) => {
  try {
    await TrainerPendingPayment.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Employee Removed" });
  } catch (error) {
    console.error("RemoveEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats
const getEmployeeStats = async (req, res) => {
  try {
    const count = await TrainerPendingPayment.countDocuments();
    const latest = await TrainerPendingPayment.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, count, latest });
  } catch (error) {
    console.error("getEmployeeStats Error:", error);
    res.status(500).json({ success: false, message: "Failed to get profile stats" });
  }
};

export {
  ListEmployee,
  AddEmployee,
  RemoveEmployee,
  SingleEmployee,
  EditEmployee,
  getEmployeeStats,
  ListFeaturedEmployees,
};
