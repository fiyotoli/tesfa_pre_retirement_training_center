import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaBriefcase } from "react-icons/fa";

const AddJob = ({ token }) => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("Government");
  const [organizationTypeOther, setOrganizationTypeOther] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [jobTypeOther, setJobTypeOther] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [educationLevel, setEducationLevel] = useState("Diploma");
  const [educationLevelOther, setEducationLevelOther] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmitHandler = async (e) => {
  e.preventDefault();

  // Basic validation
  if (jobDescription.length < 50 || jobDescription.length > 500) {
    toast.error("Job Description must be between 50 and 500 characters.");
    return;
  }
  if (!contactEmail) {
    toast.error("Contact Email is required.");
    return;
  }

  try {
    // Format job titles as array (comma-separated)
   const formattedJobTitle = jobTitle
  .split(",")
  .map((title) => title.trim())
  .filter(Boolean)
  .join(", ");  // <-- Join back to string
  
    // Format job location: expect input as "Region, City, Specific Place"
    const formattedJobLocation = jobLocation
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .join(", ");

    const payload = {
      organizationName,
      organizationType,
      organizationTypeOther: organizationType === "Other" ? organizationTypeOther : "",
      jobTitle: formattedJobTitle, // array
      jobType,
      jobTypeOther: jobType === "Other" ? jobTypeOther : "",
      jobDescription,
      educationLevel,
      educationLevelOther: educationLevel === "Other" ? educationLevelOther : "",
      workExperience, // string like "1 plus"
      requiredSkills: requiredSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      jobLocation: formattedJobLocation,
      applicationDeadline,
      contactEmail,
      phoneNumber,
    };

    const response = await axios.post(`${backendUrl}/api/jobs/add`, payload, {
      headers: {
        token,
      },
    });

    if (response.data.success) {
      toast.success("Job posted successfully!");

      // Reset form fields
      setOrganizationName("");
      setOrganizationType("Government");
      setOrganizationTypeOther("");
      setJobTitle("");
      setJobType("Full-time");
      setJobTypeOther("");
      setJobDescription("");
      setEducationLevel("Diploma");
      setEducationLevelOther("");
      setWorkExperience("");
      setRequiredSkills("");
      setJobLocation("");
      setApplicationDeadline("");
      setContactEmail("");
      setPhoneNumber("");
    } else {
      toast.error(response.data.message || "Failed to post job.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error posting job.");
  }
};


  return (
    <form onSubmit={onSubmitHandler} className="container px-5 py-2 my-3">
      <h2 className="mb-4 text-primary-custom d-flex align-items-center mt-3 gap-2">
        <FaBriefcase /> Add New Job
      </h2>

      {/* Organization Name */}
      <div className="mb-3">
        <label className="form-label">Organization Name</label>
        <input
          type="text"
          className="form-control"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          required
        />
      </div>

      {/* Organization Type */}
      <div className="mb-3">
        <label className="form-label">Organization Type</label>
        <select
          className="form-select"
          value={organizationType}
          onChange={(e) => setOrganizationType(e.target.value)}
          required
        >
          <option>Government</option>
          <option>NGO</option>
          <option>Private Company</option>
          <option>Other</option>
        </select>
        {organizationType === "Other" && (
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Please specify"
            value={organizationTypeOther}
            onChange={(e) => setOrganizationTypeOther(e.target.value)}
            required
          />
        )}
      </div>

      {/* Job Title */}
<div className="mb-3">
  <label className="form-label">Job Title(s) (comma separated if multiple)</label>
  <input
    type="text"
    className="form-control"
    placeholder="e.g., Senior Accountant, Project Coordinator"
    value={jobTitle}
    onChange={(e) => setJobTitle(e.target.value)}
    required
  />
</div>



      {/* Job Type */}
      <div className="mb-3">
        <label className="form-label">Job Type</label>
        <select
          className="form-select"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          required
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Consultancy</option>
          <option>Other</option>
        </select>
        {jobType === "Other" && (
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Please specify"
            value={jobTypeOther}
            onChange={(e) => setJobTypeOther(e.target.value)}
            required
          />
        )}
      </div>

      {/* Job Description */}
      <div className="mb-3">
        <label className="form-label">Job Description (50-500 chars)</label>
        <textarea
          className="form-control"
          rows="5"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          minLength={50}
          maxLength={500}
        />
      </div>

      {/* Education Level */}
      <div className="mb-3">
        <label className="form-label">Required Educational Level</label>
        <select
          className="form-select"
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          required
        >
          <option>Diploma</option>
          <option>Bachelor's Degree</option>
          <option>Master's Degree</option>
          <option>PhD</option>
          <option>Other</option>
        </select>
        {educationLevel === "Other" && (
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Please specify"
            value={educationLevelOther}
            onChange={(e) => setEducationLevelOther(e.target.value)}
            required
          />
        )}
      </div>

     {/* Work Experience */}
<div className="mb-3">
  <label className="form-label">Required Work Experience (years)</label>
  <select
    className="form-select"
    value={workExperience}
    onChange={(e) => setWorkExperience(e.target.value)}
    required
  >
    <option value="">Select experience</option>
    <option value="0">0 year</option> {/* Added zero experience */}
    <option value="1">1 year</option>
    <option value="2">2 year</option>
    <option value="3">3 year</option>
    <option value="5">5 year</option>
    <option value="10">10 year</option>
  </select>
</div>



      {/* Required Skills */}
      <div className="mb-3">
        <label className="form-label">
          Required Skills (comma separated)
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g., MS Office, Project Management, Teamwork"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
        />
      </div>

      {/* Job Location */}
      <div className="mb-3">
        <label className="form-label">Job Location(comma separeted)</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g., Addis Ababa, Oromia Region,specfic place"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          required
        />
      </div>

      {/* Application Deadline */}
      <div className="mb-3">
        <label className="form-label">Application Deadline</label>
        <input
          type="date"
          className="form-control"
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
          required
        />
      </div>

      {/* Contact Email */}
      <div className="mb-3">
        <label className="form-label">Contact Email Address</label>
        <input
          type="email"
          className="form-control"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="form-label">Phone Number (Optional)</label>
        <input
          type="tel"
          className="form-control"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <button type="submit" className="btn bg-primary-custom text-white">
        Submit Job
      </button>
    </form>
  );
};

export default AddJob;
