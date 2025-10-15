import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";

const AddEmployee = ({ token }) => {
  const [image1, setImage1] = useState(null);
const [employeeId, setEmployeeId] = useState("");
const [city, setCity] = useState("");
const [region, setRegion] = useState("");
const [country, setCountry] = useState("");
const [languages, setLanguages] = useState([{ language: "", proficiency: "" }]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [address, setAddress] = useState("");
  const [educationLevel, setEducationLevel] = useState("Degree");
  const [totalWorkExperience, setTotalWorkExperience] = useState("");
  const [workExperienceGovernment, setWorkExperienceGovernment] = useState("");
  const [workExperienceSelf, setWorkExperienceSelf] = useState("");
  const [additionalSkills, setAdditionalSkills] = useState([""]);
  const [neededJobTypeList, setNeededJobTypeList] = useState([""]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [education, setEducation] = useState([{ institution: "", graduationYear: "" }]);
const [workExperienceList, setWorkExperienceList] = useState([
  { companyName: "", jobTitle: "", startDate: "", endDate: "", responsibilities: [""] },
]);

const [projectList, setProjectList] = useState([
  { projectTitle: "", description: "", role: "" },
]);


  // NEW state for featured checkbox
  const [isFeatured, setIsFeatured] = useState(false);

  const handleSkillChange = (index, value) => {
    const updated = [...additionalSkills];
    updated[index] = value;
    setAdditionalSkills(updated);
  };

  const addSkillField = () => setAdditionalSkills([...additionalSkills, ""]);

  const removeSkillField = (index) => {
    const updated = [...additionalSkills];
    updated.splice(index, 1);
    setAdditionalSkills(updated);
  };

  const handleJobTypeChange = (index, value) => {
    const updated = [...neededJobTypeList];
    updated[index] = value;
    setNeededJobTypeList(updated);
  };

  const addJobTypeField = () => setNeededJobTypeList([...neededJobTypeList, ""]);

  const removeJobTypeField = (index) => {
    const updated = [...neededJobTypeList];
    updated.splice(index, 1);
    setNeededJobTypeList(updated);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1) {
      toast.error("Image is not selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("employeeId", employeeId);
formData.append("education", JSON.stringify(education));
formData.append("language", JSON.stringify(languages));
formData.append("workExperience", JSON.stringify(workExperienceList));
formData.append("projects", JSON.stringify(projectList));

      formData.append("lastName", lastName);
      // formData.append("address", address);
      formData.append("educationLevel", educationLevel);
      formData.append("totalWorkExperience", totalWorkExperience);
      formData.append("workExperienceGovernment", workExperienceGovernment);
      formData.append("workExperienceSelf", workExperienceSelf);
formData.append("currentLocation", JSON.stringify({ city, region, country }));

      additionalSkills.forEach(skill => formData.append("additionalSkills", skill));
      neededJobTypeList.forEach(job => formData.append("neededJobType", job));

      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("image1", image1);

      // Append featured status as string ('true' or 'false')
      formData.append("isFeatured", isFeatured.toString());

      const response = await axios.post(`${backendUrl}/api/profile/add`, formData, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form fields
        setFirstName("");
        setLastName("");
        // setAddress("");
        setEmployeeId("")
        setEducationLevel("Degree");
        setTotalWorkExperience("");
        setWorkExperienceGovernment("");
        setWorkExperienceSelf("");
        setAdditionalSkills([""]);
        setNeededJobTypeList([""]);
        setEmail("");
        setPhoneNumber("");
        setImage1(null);
        setIsFeatured(false); // Reset featured checkbox
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container-fluid bg-white">
    <form onSubmit={onSubmitHandler} className="container px-5 py-2 py-md-4  my-3">

      

      {/* profile Upload */}
      <div className="mb-4 pt-2">
        <h2 className="mb-4 text-primary-custom d-flex align-items-center gap-2">
          <FaUserPlus className="text-primary-custom" /> Upload Trainee Profile
        </h2>

        <label
          htmlFor="image1"
          className="border p-2 rounded d-flex align-items-center justify-content-center"
          style={{ width: "150px", height: "150px", cursor: "pointer" }}
        >
          <img
            src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
            alt="upload preview"
            className="img-fluid"
            style={{ maxHeight: "100%" }}
          />
          <input
            type="file"
            id="image1"
            hidden
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </label>
      </div>
{/* employee id */}
      <div className="mb-3">
  <label className="form-label fw-bold text-capitalize">Employee ID:</label>
  <input
    type="text"
    className="form-control"
    value={employeeId}
    onChange={(e) => setEmployeeId(e.target.value)}
    required
  />
</div>
      {/* Two Columns */}
      <div className="row">
        <div className="col-md-6">
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label fw-bold text-capitalize">First Name:</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
{/* workExperience field */}
<h5 className="fw-bold text-capitalize">Work Experience:</h5>
{workExperienceList.map((item, index) => (
  <div key={index} className="border p-3 mb-3 rounded">
    <input
      className="form-control mb-2"
      placeholder="Company Name"
      value={item.companyName}
      onChange={(e) => {
        const updated = [...workExperienceList];
        updated[index].companyName = e.target.value;
        setWorkExperienceList(updated);
      }}
    />
    <input
      className="form-control mb-2"
      placeholder="Job Title"
      value={item.jobTitle}
      onChange={(e) => {
        const updated = [...workExperienceList];
        updated[index].jobTitle = e.target.value;
        setWorkExperienceList(updated);
      }}
    />
    {/* Work Experience Dates */}
<div className="mb-3">
  {/* Start Date */}
  <label className="form-label">Start Date</label>
  <input
    type="date"
    className="form-control mb-2"
    value={item.startDate}
    onChange={(e) => {
      const updated = [...workExperienceList];
      updated[index].startDate = e.target.value;
      setWorkExperienceList(updated);
    }}
  />

  {/* End Date */}
  <label className="form-label">End Date</label>
  <input
    type="date"
    className="form-control mb-2"
    value={item.endDate}
    onChange={(e) => {
      const updated = [...workExperienceList];
      updated[index].endDate = e.target.value;
      setWorkExperienceList(updated);
    }}
  />
</div>


    <label>Responsibilities:</label>
    {item.responsibilities.map((resp, respIndex) => (
      <input
        key={respIndex}
        className="form-control mb-2"
        placeholder={`Responsibility ${respIndex + 1}`}
        value={resp}
        onChange={(e) => {
          const updated = [...workExperienceList];
          updated[index].responsibilities[respIndex] = e.target.value;
          setWorkExperienceList(updated);
        }}
      />
    ))}
    <button
      type="button"
      className="btn custom-outline-primary  btn-sm me-2"
      onClick={() => {
        const updated = [...workExperienceList];
        updated[index].responsibilities.push("");
        setWorkExperienceList(updated);
      }}
    >
      + Add Responsibility
    </button>
  </div>
))}
<button
  type="button"
  className="btn custom-outline-primary"
  onClick={() =>
    setWorkExperienceList([
      ...workExperienceList,
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
      },
    ])
  }
>
  + Add Work Experience
</button>

{/* project section */}
<h5 className="mt-4 fw-bold text-capitalize">Projects:</h5>
{projectList.map((proj, index) => (
  <div key={index} className="border p-3 mb-3 rounded">
    <input
      className="form-control mb-2"
      placeholder="Project Title"
      value={proj.projectTitle}
      onChange={(e) => {
        const updated = [...projectList];
        updated[index].projectTitle = e.target.value;
        setProjectList(updated);
      }}
    />
    <input
      className="form-control mb-2"
      placeholder="Description"
      value={proj.description}
      onChange={(e) => {
        const updated = [...projectList];
        updated[index].description = e.target.value;
        setProjectList(updated);
      }}
    />
    <input
      className="form-control mb-2"
      placeholder="Role"
      value={proj.role}
      onChange={(e) => {
        const updated = [...projectList];
        updated[index].role = e.target.value;
        setProjectList(updated);
      }}
    />
  </div>
))}
<button
  type="button"
  className="btn custom-outline-primary"
  onClick={() =>
    setProjectList([...projectList, { projectTitle: "", description: "", role: "" }])
  }
>
  + Add Project
</button>

          {/* Address */}
          {/* <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div> */}

          {/* Total Work Experience */}
          <div className="mb-3 mt-3">
            <label className="form-label fw-bold text-capitalize">Total Work Experience (years):</label>
            <input
              type="number"
              className="form-control"
              value={totalWorkExperience}
              onChange={(e) => setTotalWorkExperience(e.target.value)}
              required
            />
          </div>

          {/* Self Work Experience */}
          <div className="mb-3">
            <label className="form-label fw-bold text-capitalize">Self Work Experience (years):</label>
            <input
              type="number"
              className="form-control"
              value={workExperienceSelf}
              onChange={(e) => setWorkExperienceSelf(e.target.value)}
              required
            />
          </div>
          {/* Government Work Experience */}
          <div className="mb-3">
            <label className="form-label fw-bold text-capitalize">Government Work Experience (years):</label>
            <input
              type="number"
              className="form-control"
              value={workExperienceGovernment}
              onChange={(e) => setWorkExperienceGovernment(e.target.value)}
              required
            />
          </div>
{/* language  */}
<div className="mb-3">
  <label className="form-label fw-bold text-capitalize">Languages & Proficiency:</label>
  {languages.map((item, index) => (
    <div key={index} className="d-flex gap-2 mb-2">
      <select
        className="form-select"
        value={item.language}
        onChange={(e) => {
          const updated = [...languages];
          updated[index].language = e.target.value;
          setLanguages(updated);
        }}
        required
      >
        <option value="">Select Language</option>
        <option value="English">English</option>
        <option value="Amharic">Amharic</option>
       
              <option value="Oromo">Afaan Oromoo</option>
              <option value="Tigrigna">Tigrigna</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Chinese">Chinese</option>
              <option value="Other">Other</option>
      </select>

      <select
        className="form-select"
        value={item.proficiency}
        onChange={(e) => {
          const updated = [...languages];
          updated[index].proficiency = e.target.value;
          setLanguages(updated);
        }}
        required
      >
        <option value="">Proficiency</option>
        <option value="Native">Native</option>
        <option value="Fluent">Fluent</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Basic">Basic</option>
      </select>

      {index > 0 && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            const updated = [...languages];
            updated.splice(index, 1);
            setLanguages(updated);
          }}
        >
          −
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    className="btn custom-outline-primary  mt-2"
    onClick={() => setLanguages([...languages, { language: "", proficiency: "" }])}
  >
    + Add Language
  </button>
</div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-bold text-capitalize">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          {/* Last Name */}
          <div className="mb-3">
            <label className="form-label fw-bold text-capitalize">Last Name:</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Education Level */}
          <div className="mb-3">
            <label className="form-label fw-bold text-capitalize">Education Level:</label>
            <select
              className="form-select"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
            >
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Degree">Degree</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          

          {/* Phone Number */}
          <div className="mb-3">
            <label className="form-label fw-bold text-capitalize">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Featured Employee Checkbox */}
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isFeatured">
              Mark as Featured Employee
            </label>
          </div>
        </div>
      </div>
{/* current location */}
<div className="row">
  <label className="fw-bold text-capitalize mb-3">current location:</label>
<div className="mb-3 col-md-6 col-lg-4">
  <label className="form-label">City</label>
  <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
</div>
<div className="mb-3 col-md-6 col-lg-4">
  <label className="form-label">Region</label>
  <select
    className="form-select"
    value={region}
    onChange={(e) => setRegion(e.target.value)}
  >
    <option value="">-- Select Region --</option>
    <option value="Addis Ababa">Addis Ababa</option>
    <option value="Oromia">Oromia</option>
    <option value="Amhara">Amhara</option>
    <option value="Tigray">Tigray</option>
    <option value="Somali">Somali</option>
    <option value="Afar">Afar</option>
    <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>
    <option value="Southern Nations, Nationalities, and Peoples'">SNNPR</option>
    <option value="Gambela">Gambela</option>
    <option value="Harari">Harari</option>
    <option value="Sidama">Sidama</option>
    <option value="South West Ethiopia Peoples'">South West Ethiopia</option>
  </select>
</div>

<div className="mb-3 col-md-6 col-lg-4">
  <label className="form-label">Country</label>
  <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
</div>
</div>

{/* education */}
<div className="mb-3">
  <label className="form-label fw-bold text-capitalize">Education:</label>
  {education.map((edu, index) => (
    <div key={index} className="mb-2 d-flex gap-2">
      {/* Institution of Graduation */}
      <input
        type="text"
        placeholder="Institution of Graduation"
        className="form-control"
        value={edu.institution}
        onChange={(e) => {
          const updated = [...education];
          updated[index].institution = e.target.value;
          setEducation(updated);
        }}
        required
      />

      {/* Graduation Year Dropdown */}
      <select
        className="form-select"
        value={edu.graduationYear}
        onChange={(e) => {
          const updated = [...education];
          updated[index].graduationYear = e.target.value;
          setEducation(updated);
        }}
        required
      >
        <option value="">Select Year</option>
        {Array.from({ length: 50 }, (_, i) => {
          const year = new Date().getFullYear() - i;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      {/* Remove button */}
      {index > 0 && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            const updated = [...education];
            updated.splice(index, 1);
            setEducation(updated);
          }}
        >
          −
        </button>
      )}
    </div>
  ))}

  {/* Add Education button */}
  <button
    type="button"
    className="btn custom-outline-primary  mt-2"
    onClick={() =>
      setEducation([...education, { institution: "", graduationYear: "" }])
    }
  >
    + Add Education
  </button>
</div>

{/* additional skill and job type */}
<div className="row">
  {/* Additional Skills */}
      <div className="mb-3 col-md-6 col-lg-4">
        <label className="form-label fw-bold text-capitalize">Additional Skills:</label>
        {additionalSkills.map((skill, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder={`Skill ${index + 1}`}
              required
            />
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeSkillField(index)}
              >
                −
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn custom-outline-primary  mt-2"
          onClick={addSkillField}
        >
          + Add More Skill
        </button>
      </div>

      {/* Needed Job Types */}
      <div className="mb-3 col-md-6 col-lg-4">
        <label className="form-label fw-bold text-capitalize">Needed Job Types:</label>
        {neededJobTypeList.map((job, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={job}
              onChange={(e) => handleJobTypeChange(index, e.target.value)}
              placeholder={`Job Type ${index + 1}`}
              required
            />
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeJobTypeField(index)}
              >
                −
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn custom-outline-primary  mt-2"
          onClick={addJobTypeField}
        >
          + Add Job Type
        </button>
      </div>
</div>
      <div>

      </div>

      <button type="submit" className="btn bg-primary-custom text-white">
        Submit Application
      </button>
    </form>
    </div>
  );
};

export default AddEmployee;
