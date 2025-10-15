import TrainerPendingPayment from "../models/TrainerPendingPayment.js";
import { v2 as cloudinary } from "cloudinary";

// Add Employee Controller
const AddEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address } = req.body;

    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

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
      email,
      phoneNumber,
      address: parsedAddress,
      image: imagesUrl,
    });

    await employee.save();
    res.json({ success: true, message: "Trainee Registered Successfully" });
  } catch (error) {
    console.error("AddEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit Employee Controller
const EditEmployee = async (req, res) => {
  try {
    const { id, firstName, lastName, email, phoneNumber, address } = req.body;

    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

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
      email,
      phoneNumber,
      address: parsedAddress,
    };

    if (imagesUrl.length > 0) {
      updatedFields.image = imagesUrl;
    }

    await TrainerPendingPayment.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: "Trainee Updated" });
  } catch (error) {
    console.error("EditEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all employees
const ListEmployee = async (req, res) => {
  try {
    const employees = await TrainerPendingPayment.find();

    // Format address for frontend
    const formattedEmployees = employees.map(emp => {
      let formattedAddress = emp.address;
      if (typeof emp.address === "object" && emp.address !== null) {
        const { city, region, country } = emp.address;
        formattedAddress = [city, region, country].filter(Boolean).join(", ");
      }
      return {
        ...emp._doc,
        address: formattedAddress,
      };
    });

    res.json({ success: true, employees: formattedEmployees });
  } catch (error) {
    console.error("ListEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get featured employees (optional)
const ListFeaturedEmployees = async (req, res) => {
  try {
    const featured = await TrainerPendingPayment.find({ isFeatured: true });

    const formattedFeatured = featured.map(emp => {
      let formattedAddress = emp.address;
      if (typeof emp.address === "object" && emp.address !== null) {
        const { city, region, country } = emp.address;
        formattedAddress = [city, region, country].filter(Boolean).join(", ");
      }
      return {
        ...emp._doc,
        address: formattedAddress,
      };
    });

    res.json({ success: true, employees: formattedFeatured });
  } catch (error) {
    console.error("ListFeaturedEmployees Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single employee
const SingleEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    const emp = await TrainerPendingPayment.findById(id);

    let formattedAddress = emp.address;
    if (typeof emp.address === "object" && emp.address !== null) {
      const { city, region, country } = emp.address;
      formattedAddress = [city, region, country].filter(Boolean).join(", ");
    }

    res.json({ success: true, employee: { ...emp._doc, address: formattedAddress } });
  } catch (error) {
    console.error("SingleEmployee Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete employee
const RemoveEmployee = async (req, res) => {
  try {
    await TrainerPendingPayment.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Trainee Removed" });
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

    const formattedLatest = latest.map(emp => {
      let formattedAddress = emp.address;
      if (typeof emp.address === "object" && emp.address !== null) {
        const { city, region, country } = emp.address;
        formattedAddress = [city, region, country].filter(Boolean).join(", ");
      }
      return {
        ...emp._doc,
        address: formattedAddress,
      };
    });

    res.json({ success: true, count, latest: formattedLatest });
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
