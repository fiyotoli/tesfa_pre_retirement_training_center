import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"; // make sure this exports the URL correctly
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";
import {  FaEdit, FaTrash, } from 'react-icons/fa';

const educationLevels = [
  "", // empty means no filter
  "High School",
  "Diploma",
  "Bachelor",
  "Master",
  "PhD",
];

const ListEmployee = ({ token }) => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [searchJobType, setSearchJobType] = useState("");
  const [filterEducation, setFilterEducation] = useState("");
  const [sortField, setSortField] = useState(""); // "firstName" or "totalWorkExperience"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backendUrl}/api/profile/list`);
      const productsRaw = Array.isArray(response.data.employees) ? response.data.employees : [];

      if (response.data.success) {
        const products = productsRaw.map((product) => ({
          ...product,
          additionalSkills:
            typeof product.additionalSkills === "string"
              ? JSON.parse(product.additionalSkills)
              : Array.isArray(product.additionalSkills)
              ? product.additionalSkills
              : [],
          neededJobType:
            typeof product.neededJobType === "string"
              ? JSON.parse(product.neededJobType)
              : Array.isArray(product.neededJobType)
              ? product.neededJobType
              : [],
        }));

        setList(products);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

 const removeProduct = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    const response = await axios.post(
      `${backendUrl}/api/profile/remove`,
      { id },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};


  const handleEdit = (item) => {
    const editItem = { ...item };

    if (
      Array.isArray(editItem.additionalSkills) &&
      editItem.additionalSkills.length === 1 &&
      typeof editItem.additionalSkills[0] === "string"
    ) {
      try {
        editItem.additionalSkills = JSON.parse(editItem.additionalSkills[0]);
      } catch {}
    }

    if (
      Array.isArray(editItem.neededJobType) &&
      editItem.neededJobType.length === 1 &&
      typeof editItem.neededJobType[0] === "string"
    ) {
      try {
        editItem.neededJobType = JSON.parse(editItem.neededJobType[0]);
      } catch {}
    }

    setEditData(editItem);
    setShowModal(true);
    setImage(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

     Object.keys(editData).forEach((key) => {
  const value = editData[key];

  if (Array.isArray(value)) {
    // Convert array to JSON string (only for objects or nested arrays)
    if (typeof value[0] === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      value.forEach((item) => formData.append(key, item));
    }
  } else if (typeof value === 'object' && value !== null) {
    // Single object (e.g. currentLocation)
    formData.append(key, JSON.stringify(value));
  } else {
    formData.append(key, value);
  }
});


      formData.append("id", editData._id);
      if (image) formData.append("image1", image);

      const res = await axios.post(`${backendUrl}/api/profile/edit`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Updated successfully");
        setShowModal(false);
        setEditData(null);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Filter by job type
  const filterByJobType = (data) => {
    if (!searchJobType.trim()) return data;
    return data.filter((item) =>
      item.neededJobType.some((job) =>
        job.toLowerCase().includes(searchJobType.toLowerCase())
      )
    );
  };

  // Filter by education level dropdown
  const filterByEducation = (data) => {
    if (!filterEducation) return data;
    return data.filter((item) => item.educationLevel === filterEducation);
  };

  // Sort by firstName (A-Z) or totalWorkExperience (asc/desc)
  const sortData = (data) => {
    if (!sortField) return data;

    const sorted = [...data].sort((a, b) => {
      if (sortField === "firstName") {
        const aName = a.firstName?.toLowerCase() || "";
        const bName = b.firstName?.toLowerCase() || "";
        if (aName < bName) return -1;
        if (aName > bName) return 1;
        return 0;
      } else if (sortField === "totalWorkExperience") {
        const aNum = Number(a.totalWorkExperience) || 0;
        const bNum = Number(b.totalWorkExperience) || 0;
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }
      return 0;
    });

    return sorted;
  };

  const displayedList = sortData(filterByEducation(filterByJobType(list)));

  return (
    <div className="container mt-3">
      <div className="text-center my-4 pt-4">
        <h2 className="mb-4 text-primary-custom d-flex align-items-center gap-2">
          <FaUsers className="text-primary-custom" /> List of Trainers Profile
        </h2>

        {/* Filters and Sorting */}
        <div className="d-flex justify-content-start gap-3 mb-3 flex-wrap">

          {/* Search Job Type */}
          <div>
            <label htmlFor="searchJobType" className="form-label me-2">
              Search Job Type:
            </label>
            <input
              id="searchJobType"
              type="text"
              className="form-control"
              placeholder="e.g. developer"
              value={searchJobType}
              onChange={(e) => setSearchJobType(e.target.value)}
            />
          </div>

          {/* Education Level Dropdown */}
          <div>
            <label htmlFor="filterEducation" className="form-label me-2">
              Filter Education:
            </label>
            <select
              id="filterEducation"
              className="form-select"
              value={filterEducation}
              onChange={(e) => setFilterEducation(e.target.value)}
            >
              {educationLevels.map((level, i) => (
                <option key={i} value={level}>
                  {level === "" ? "-- All Levels --" : level}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Field */}
          <div>
            <label htmlFor="sortField" className="form-label me-2">
              Sort By:
            </label>
            <select
              id="sortField"
              className="form-select"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="firstName">First Name (A-Z)</option>
              <option value="totalWorkExperience">Total Work Experience</option>
            </select>
          </div>

          {/* Sort Order (only enabled if totalWorkExperience selected) */}
          <div>
            <label htmlFor="sortOrder" className="form-label me-2">
              Order:
            </label>
            <select
              id="sortOrder"
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={sortField !== "totalWorkExperience"}
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <p>Loading employee profiles...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table
          className="table table-bordered table-striped text-nowrap"
          style={{ minWidth: "auto" }}
        >
          <thead className="thead-dark ">
            <tr className="">
              <th className="">Employee Id</th>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              {/* <th>Address</th> */}
              <th>Education</th>
              <th>Total Experience</th>
              <th>Government Experience</th>
              <th>Self Experience</th>
              <th >Additional Knowledge, Skills, and Expertise</th>
              <th >Job Roles Held by the Employee</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Current Location</th>
              <th>Languages and Proficiency</th>
                    <th>Education History</th>
                    <th>Work Experience(Company Name|Start Date|End Date|Responsibilities and Duties Performed)</th>
                    <th>Projects|Title of the Project|Brief Description of the Project|Role and Responsibilities in the Project</th> 

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedList.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center">
                  No employee profiles to display.
                </td>
              </tr>
            ) : (
              displayedList.map((item, index) => (
                <tr key={index}>
                 <td className="text-nowrap">{item.employeeId}</td>


                  <td>
                    <img
                      src={item.image?.[0]}
                      alt={item.firstName}
                      className="img-fluid rounded"
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    />
                  </td>
                  <td className="text-nowrap text-capitalize">{item.firstName}</td>
                  <td className="text-nowrap text-capitalize">{item.lastName}</td>
                  {/* <td className="text-nowrap text-capitalize">{item.address}</td> */}
                  <td className="text-nowrap text-capitalize">{item.educationLevel}</td>
                  <td className="text-nowrap">{item.totalWorkExperience} yrs</td>
                  <td className="text-nowrap">{item.workExperienceGovernment} yrs</td>
                  <td className="text-nowrap">{item.workExperienceSelf} yrs</td>
                  <td className="text-wrap text-capitalize">
  {Array.isArray(item.additionalSkills) ? (
    <ul className="mb-0 ps-3">
      {item.additionalSkills.map((skill, idx) => (
        <li key={idx}>{skill}</li>
      ))}
    </ul>
  ) : (
    <span>{String(item.additionalSkills)}</span>
  )}
</td>

                  <td className="text-nowrap text-capitalize">
  {Array.isArray(item.neededJobType) ? (
    <ul className="mb-0 ps-3">
      {item.neededJobType.map((jobType, idx) => (
        <li key={idx}>{jobType}</li>
      ))}
    </ul>
  ) : (
    <span>{String(item.neededJobType)}</span>
  )}
</td>

                  <td className="text-nowrap">{item.email}</td>
                  <td className="text-nowrap">{item.phoneNumber}</td>
                  <td className="text-nowrap">
  {item.currentLocation
    ? `${item.currentLocation.city || ""}, ${item.currentLocation.region || ""}, ${item.currentLocation.country || ""}`
    : "-"}
</td>

                             <td className="text-wrap">
  {Array.isArray(item.language) && item.language.length > 0 ? (
    item.language.map((lang, i) => (
      <div key={i}>
        <strong>Language:</strong> {lang.language}<br />
        <strong>Proficiency:</strong> {lang.proficiency}
        <hr className="my-1" />
      </div>
    ))
  ) : (
    "-"
  )}
</td>

<td className="text-wrap">
  {item.education && item.education.length > 0 ? (
    item.education.map((edu, i) => (
      <div key={i}>
        <strong>Institution:</strong> {edu.institution}<br />
        <strong>Graduation Year:</strong> {edu.graduationYear}
        <hr className="my-1" />
      </div>
    ))
  ) : (
    "-"
  )}
</td>

<td className="text-wrap">
  {item.workExperience && item.workExperience.length > 0 ? (
    item.workExperience.map((work, i) => (
      <div key={i}>
        <strong>Company Name:</strong> {work.companyName}<br />
        <strong>Job Title:</strong> {work.jobTitle}<br />
        <strong>Start Date:</strong> {work.startDate?.slice(0, 10)}<br />
        <strong>End Date:</strong> {work.endDate?.slice(0, 10)}<br />
        <strong>Responsibilities:</strong>
        <ul className="mb-0">
          {work.responsibilities?.map((resp, j) => (
            <li key={j}>{resp}</li>
          ))}
        </ul>
        <hr className="my-1" />
      </div>
    ))
  ) : (
    "-"
  )}
</td>

<td className="text-wrap">
  {item.projects && item.projects.length > 0 ? (
    item.projects.map((proj, i) => (
      <div key={i}>
        <strong>Project Title:</strong> {proj.projectTitle}<br />
        <strong>Description:</strong> {proj.description}<br />
        <strong>Role:</strong> {proj.role}
        <hr className="my-1" />
      </div>
    ))
  ) : (
    "-"
  )}
</td>


                  <td className="text-nowrap">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                    <FaEdit/>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeProduct(item._id)}
                    >
                      <FaTrash/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && editData && (
  <div
    className="modal show d-block"
    tabIndex="-1"
    role="dialog"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1050,
    }}
  >
    <div className="modal-dialog modal-lg" role="document">
  
<div className="modal-content">
  <form onSubmit={handleEditSubmit}>
    <div className="modal-header border-0 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <FaEdit className="text-primary-custom me-2 fs-5" />
        <h5 className="modal-title mb-0">Edit Profile</h5>
      </div>
      <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
    </div>

    <div className="modal-body">
      {/* Basic Fields */}
{[
  "firstName", "lastName", "educationLevel", "totalWorkExperience",
  "workExperienceGovernment", "workExperienceSelf",
  "email", "phoneNumber"
].map((field, i) => (
  <div className="mb-3" key={i}>
    <label className="form-label fw-bold">
      {field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
    </label>
    <input
      type="text"
      className="form-control"
      name={field}
      value={
        Array.isArray(editData[field])
          ? editData[field].join(", ")
          : editData[field] || ""
      }
      onChange={(e) => {
        let value = e.target.value;
        // removed additionalSkills and neededJobType from this condition
        setEditData({ ...editData, [field]: value });
      }}
    />
  </div>
))}

      {/* Additional Skills  */}
      <div className="mb-3">
        <label className="form-label fw-bold">Additional Skills</label>
        {editData.additionalSkills?.map((skill, i) => (
          <div className="d-flex gap-2 mb-2" key={i}>
            <input
              type="text"
              className="form-control"
              placeholder={`Skill ${i + 1}`}
              value={skill}
              onChange={(e) => {
                const updated = [...editData.additionalSkills];
                updated[i] = e.target.value;
                setEditData({ ...editData, additionalSkills: updated });
              }}
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                const updated = [...editData.additionalSkills];
                updated.splice(i, 1);
                setEditData({ ...editData, additionalSkills: updated });
              }}
            >
              −
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => setEditData({
            ...editData,
            additionalSkills: [...(editData.additionalSkills || []), ""]
          })}
        >
          + Add Skill
        </button>
      </div>

      {/* Needed Job Types */}
      <div className="mb-3">
        <label className="form-label fw-bold">Needed Job Types</label>
        {editData.neededJobType?.map((job, i) => (
          <div className="d-flex gap-2 mb-2" key={i}>
            <input
              type="text"
              className="form-control"
              placeholder={`Job Type ${i + 1}`}
              value={job}
              onChange={(e) => {
                const updated = [...editData.neededJobType];
                updated[i] = e.target.value;
                setEditData({ ...editData, neededJobType: updated });
              }}
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                const updated = [...editData.neededJobType];
                updated.splice(i, 1);
                setEditData({ ...editData, neededJobType: updated });
              }}
            >
              −
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => setEditData({
            ...editData,
            neededJobType: [...(editData.neededJobType || []), ""]
          })}
        >
          + Add Job Type
        </button>
      </div>

      {/* Employee ID */}
      <div className="mb-3">
        <label className="form-label fw-bold">Employee ID</label>
        <input
          type="text"
          className="form-control"
          value={editData.employeeId || ""}
          onChange={(e) => setEditData({ ...editData, employeeId: e.target.value })}
        />
      </div>

      {/* Location */}
<div className="mb-3">
  <label className="form-label fw-bold">Current Location</label>
  {["city", "region", "country"].map((loc, i) => (
    loc === "region" ? (
      <select
        key={i}
        className="form-select mb-1"
        value={editData.currentLocation?.region || ""}
        onChange={(e) =>
          setEditData({
            ...editData,
            currentLocation: {
              ...editData.currentLocation,
              region: e.target.value,
            },
          })
        }
      >
        <option value="">Select Region</option>
        <option value="Addis Ababa">Addis Ababa</option>
        <option value="Afar">Afar</option>
        <option value="Amhara">Amhara</option>
        <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>
        <option value="Dire Dawa">Dire Dawa</option>
        <option value="Gambela">Gambela</option>
        <option value="Harari">Harari</option>
        <option value="Oromia">Oromia</option>
        <option value="Sidama">Sidama</option>
        <option value="Somali">Somali</option>
        <option value="Southern Nations, Nationalities, and Peoples' Region">SNNPR</option>
        <option value="Tigray">Tigray</option>
      </select>
    ) : (
      <input
        key={i}
        type="text"
        className="form-control mb-1"
        placeholder={loc.charAt(0).toUpperCase() + loc.slice(1)}
        value={editData.currentLocation?.[loc] || ""}
        onChange={(e) =>
          setEditData({
            ...editData,
            currentLocation: {
              ...editData.currentLocation,
              [loc]: e.target.value,
            },
          })
        }
      />
    )
  ))}
</div>


      {/* Languages with Language + Proficiency Selection */}
      <div className="mb-3">
        <label className="form-label fw-bold">Languages</label>
        {editData.language?.map((lang, i) => (
          <div className="d-flex gap-2 mb-2 align-items-center" key={i}>
            {/* Language Dropdown */}
            <select
              className="form-control"
              value={lang.language}
              onChange={(e) => {
                const updated = [...editData.language];
                updated[i].language = e.target.value;
                setEditData({ ...editData, language: updated });
              }}
            >
              <option value="">Select Language</option>
              <option value="Amharic">Amharic</option>
              <option value="English">English</option>
              <option value="Oromo">Afaan Oromoo</option>
              <option value="Tigrigna">Tigrigna</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Chinese">Chinese</option>
              <option value="Other">Other</option>
            </select>

            {/* Proficiency Dropdown */}
            <select
              className="form-control"
              value={lang.proficiency}
              onChange={(e) => {
                const updated = [...editData.language];
                updated[i].proficiency = e.target.value;
                setEditData({ ...editData, language: updated });
              }}
            >
              <option value="">Select Proficiency</option>
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>

            {/* Remove Language */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                const updated = [...editData.language];
                updated.splice(i, 1);
                setEditData({ ...editData, language: updated });
              }}
            >
              −
            </button>
          </div>
        ))}

        {/* Add Language Button */}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            setEditData({
              ...editData,
              language: [...(editData.language || []), { language: "", proficiency: "" }]
            })
          }
        >
          + Add Language
        </button>
      </div>

      {/* Work Experience */}
<div className="mb-3">
  <label className="form-label fw-bold">Work Experience</label>
  {editData.workExperience?.map((exp, i) => (
    <div className="border p-2 mb-3 rounded" key={i}>
      <input
        type="text"
        className="form-control mb-1"
        placeholder="Company Name"
        value={exp.companyName}
        onChange={(e) => {
          const updated = [...editData.workExperience];
          updated[i].companyName = e.target.value;
          setEditData({ ...editData, workExperience: updated });
        }}
      />
      <input
        type="text"
        className="form-control mb-1"
        placeholder="Job Title"
        value={exp.jobTitle}
        onChange={(e) => {
          const updated = [...editData.workExperience];
          updated[i].jobTitle = e.target.value;
          setEditData({ ...editData, workExperience: updated });
        }}
      />
      <input
        type="date"
        className="form-control mb-1"
        value={exp.startDate?.slice(0, 10) || ""}
        onChange={(e) => {
          const updated = [...editData.workExperience];
          updated[i].startDate = e.target.value;
          setEditData({ ...editData, workExperience: updated });
        }}
      />
      <input
        type="date"
        className="form-control mb-1"
        value={exp.endDate?.slice(0, 10) || ""}
        onChange={(e) => {
          const updated = [...editData.workExperience];
          updated[i].endDate = e.target.value;
          setEditData({ ...editData, workExperience: updated });
        }}
      />

      <label className="form-label mt-2 fw-bold">Responsibilities</label>
      {exp.responsibilities?.map((res, rIdx) => (
        <div className="d-flex mb-1 gap-2 align-items-center" key={rIdx}>
          <input
            type="text"
            className="form-control"
            placeholder={`Responsibility ${rIdx + 1}`}
            value={res}
            onChange={(e) => {
              const updated = [...editData.workExperience];
              updated[i].responsibilities[rIdx] = e.target.value;
              setEditData({ ...editData, workExperience: updated });
            }}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              const updated = [...editData.workExperience];
              updated[i].responsibilities.splice(rIdx, 1);
              setEditData({ ...editData, workExperience: updated });
            }}
          >
            −
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary btn-sm mt-1"
        onClick={() => {
          const updated = [...editData.workExperience];
          if (!updated[i].responsibilities) updated[i].responsibilities = [];
          updated[i].responsibilities.push("");
          setEditData({ ...editData, workExperience: updated });
        }}
      >
        + Add Responsibility
      </button>
    </div>
  ))}

  {/* Add Another Work Experience Button */}
  <button
    type="button"
    className="btn btn-success"
    onClick={() => {
      const updated = [...(editData.workExperience || [])];
      updated.push({
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
      });
      setEditData({ ...editData, workExperience: updated });
    }}
  >
    + Add Other Work Experience
  </button>
</div>

      {/* Projects */}
      <div className="mb-3">
        <label className="form-label fw-bold">Projects</label>
        {editData.projects?.map((proj, i) => (
          <div className="border p-2 mb-3 rounded" key={i}>
            <label className="form-label">Project {i + 1}</label>
            <input
              type="text"
              className="form-control mb-1"
              placeholder="Project Title"
              value={proj.projectTitle}
              onChange={(e) => {
                const updated = [...editData.projects];
                updated[i].projectTitle = e.target.value;
                setEditData({ ...editData, projects: updated });
              }}
            />
            <input
              type="text"
              className="form-control mb-1"
              placeholder="Role"
              value={proj.role}
              onChange={(e) => {
                const updated = [...editData.projects];
                updated[i].role = e.target.value;
                setEditData({ ...editData, projects: updated });
              }}
            />
            <textarea
              className="form-control mb-1"
              placeholder="Description"
              value={proj.description}
              onChange={(e) => {
                const updated = [...editData.projects];
                updated[i].description = e.target.value;
                setEditData({ ...editData, projects: updated });
              }}
            />
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                const updated = [...editData.projects];
                updated.splice(i, 1);
                setEditData({ ...editData, projects: updated });
              }}
            >
              − Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            const updated = [...(editData.projects || [])];
            updated.push({ projectTitle: "", description: "", role: "" });
            setEditData({ ...editData, projects: updated });
          }}
        >
          + Add Project
        </button>
      </div>

      {/* Image Upload */}
      <div className="mb-3">
        <label className="form-label fw-bold">Profile Image</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
      </div>
    </div>

    <div className="modal-footer">
      <button type="submit" className="btn btn-success">Save Changes</button>
      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
        Cancel
      </button>
    </div>
  </form>
</div>


</div>

  </div>
)}

        
    </div>
  );
};

export default ListEmployee;