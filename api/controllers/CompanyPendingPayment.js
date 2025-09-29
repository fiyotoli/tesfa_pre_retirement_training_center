import CompanyPendingPayment from "../models/CompanyPendingPayment.js";

// Add Company
const AddCompany = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      businessType,
      phoneNumber,
      email,
      companyAddress,
    } = req.body;

    const company = new CompanyPendingPayment({
      fullName,
      companyName,
      businessType,
      phoneNumber,
      email,
      companyAddress,
    });

    await company.save();
    res.json({ success: true, message: "Company Registered Successfully" });
  } catch (error) {
    console.error("AddCompany Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit Company
const EditCompany = async (req, res) => {
  try {
    const { id, fullName, companyName, businessType, phoneNumber, email, companyAddress } = req.body;

    const updatedFields = {
      fullName,
      companyName,
      businessType,
      phoneNumber,
      email,
      companyAddress,
    };

    await CompanyPendingPayment.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: "Company Updated Successfully" });
  } catch (error) {
    console.error("EditCompany Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List Companies
const ListCompanies = async (req, res) => {
  try {
    const companies = await CompanyPendingPayment.find();
    res.json({ success: true, companies });
  } catch (error) {
    console.error("ListCompanies Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Company
const SingleCompany = async (req, res) => {
  try {
    const { id } = req.body;
    const company = await CompanyPendingPayment.findById(id);
    res.json({ success: true, company });
  } catch (error) {
    console.error("SingleCompany Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Company
const RemoveCompany = async (req, res) => {
  try {
    await CompanyPendingPayment.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Company Removed Successfully" });
  } catch (error) {
    console.error("RemoveCompany Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Company Stats
const getCompanyStats = async (req, res) => {
  try {
    const count = await CompanyPendingPayment.countDocuments();
    const latest = await CompanyPendingPayment.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, count, latest });
  } catch (error) {
    console.error("getCompanyStats Error:", error);
    res.status(500).json({ success: false, message: "Failed to get company stats" });
  }
};

export {
  AddCompany,
  EditCompany,
  ListCompanies,
  SingleCompany,
  RemoveCompany,
  getCompanyStats,
};
