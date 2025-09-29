import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {  MdFormatListBulleted } from 'react-icons/md';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const JobList = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Jobs from backend
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/jobs/list`, {
        headers: { token },
      });
      if (res.data.success) {
        setJobs(res.data.jobs);
      } else {
        toast.error(res.data.message || 'Failed to load jobs');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/jobs/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success('Job deleted successfully');
        fetchJobs();
      } else {
        toast.error(res.data.message || 'Failed to delete job');
      }
    } catch (err) {
      toast.error('Error deleting job');
    }
  };

  // Open edit modal
  const handleEdit = (job) => {
    // Prepare jobTitle string if it's array (optional based on your backend)
    const jobTitleStr = Array.isArray(job.jobTitle)
      ? job.jobTitle.join(', ')
      : job.jobTitle;

    setEditData({ ...job, jobTitle: jobTitleStr });
    setShowModal(true);
  };

  // Handle input change in edit modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edited job
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Convert jobTitle string back to array or keep string depending on your backend
    const formattedJobTitle = editData.jobTitle
      .split(',')
      .map((title) => title.trim())
      .filter(Boolean);

    try {
      const payload = {
        ...editData,
        jobTitle: formattedJobTitle.join(', '), // If backend expects string; else send array
      };

      // Remove _id field from payload if exists, and add id instead
      const { _id, ...rest } = payload;

      const res = await axios.post(
        `${backendUrl}/api/jobs/edit`,
        { id: _id, ...rest },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success('Job updated successfully');
        setShowModal(false);
        setEditData(null);
        fetchJobs();
      } else {
        toast.error(res.data.message || 'Failed to update job');
      }
    } catch (err) {
      toast.error('Error updating job');
    }
  };

  if (loading) return <p className="text-center my-5">Loading jobs...</p>;
  if (error) return <p className="text-danger text-center my-5">{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary-custom d-flex justify-content-center align-items-center gap-2">
        <MdFormatListBulleted /> Job Listings
      </h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped  text-nowrap">
          <thead className="table-primary">
            <tr>
              <th>Organization Name</th>
              <th>Organization Type</th>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Organization Job Description  (50-500 chars)</th>
              <th>Education Level</th>
              <th>Work Experience</th>
              <th>Required Skills</th>
              <th>Job Location</th>
              <th>Application Deadline</th>
              <th>Contact Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td colSpan="13" className="text-center">
                  No jobs found.
                </td>
              </tr>
            )}
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className='text-capitalize'>{job.organizationName}</td>
                <td >
                  {job.organizationType}
                  {job.organizationType === 'Other' && job.organizationTypeOther
                    ? ` (${job.organizationTypeOther})`
                    : ''}
                </td>
                <td className='text-capitalize'>{job.jobTitle}</td>
                <td>
                  {job.jobType}
                  {job.jobType === 'Other' && job.jobTypeOther
                    ? ` (${job.jobTypeOther})`
                    : ''}
                </td>
                <td className='text-wrap text-capitalize'>
                  {job.jobDescription}
                </td>
                <td>
                  {job.educationLevel}
                  {job.educationLevel === 'Other' && job.educationLevelOther
                    ? ` (${job.educationLevelOther})`
                    : ''}
                </td>
                <td>{job.workExperience}</td>
                <td className='text-capitalize'>{job.requiredSkills?.join(', ')}</td>
                <td className='text-capitalize'>{job.jobLocation}</td>
                <td>{job.applicationDeadline ? job.applicationDeadline.slice(0, 10) : ''}</td>
                <td>{job.contactEmail}</td>
                <td>{job.phoneNumber}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(job)}
                    title="Edit"
                    type="button"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(job._id)}
                    title="Delete"
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && editData && (
        <div className="modal show d-block bg-dark bg-opacity-75" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content bg-light text-dark">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header border-0 d-flex align-items-center justify-content-between">
                  <h5 className="modal-title">Edit Job</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  {/* Organization Name */}
                  <div className="mb-3">
                    <label className="form-label">Organization Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="organizationName"
                      value={editData.organizationName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Organization Type */}
                  <div className="mb-3">
                    <label className="form-label">Organization Type</label>
                    <select
                      className="form-select"
                      name="organizationType"
                      value={editData.organizationType}
                      onChange={handleChange}
                      required
                    >
                      <option>Government</option>
                      <option>NGO</option>
                      <option>Private Company</option>
                      <option>Other</option>
                    </select>
                    {editData.organizationType === 'Other' && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Please specify"
                        name="organizationTypeOther"
                        value={editData.organizationTypeOther || ''}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>

                  {/* Job Title */}
                  <div className="mb-3">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Senior Accountant"
                      name="jobTitle"
                      value={editData.jobTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Job Type */}
                  <div className="mb-3">
                    <label className="form-label">Job Type</label>
                    <select
                      className="form-select"
                      name="jobType"
                      value={editData.jobType}
                      onChange={handleChange}
                      required
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Consultancy</option>
                      <option>Other</option>
                    </select>
                    {editData.jobType === 'Other' && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Please specify"
                        name="jobTypeOther"
                        value={editData.jobTypeOther || ''}
                        onChange={handleChange}
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
                      name="jobDescription"
                      value={editData.jobDescription}
                      onChange={handleChange}
                      minLength={50}
                      maxLength={500}
                      required
                    />
                  </div>

                  {/* Education Level */}
                  <div className="mb-3">
                    <label className="form-label">Required Educational Level</label>
                    <select
                      className="form-select"
                      name="educationLevel"
                      value={editData.educationLevel}
                      onChange={handleChange}
                      required
                    >
                      <option>Diploma</option>
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>PhD</option>
                      <option>Other</option>
                    </select>
                    {editData.educationLevel === 'Other' && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Please specify"
                        name="educationLevelOther"
                        value={editData.educationLevelOther || ''}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>

                  {/* Work Experience */}
                  <div className="mb-3">
                    <label className="form-label">Required Work Experience (years)</label>
                    <select
                      className="form-select"
                      name="workExperience"
                      value={editData.workExperience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="0">0 year</option>
                      <option value="1">1 year</option>
                      <option value="1">1+ year</option>
                      <option value="2">2 year</option>
                      <option value="2">2+ year</option>
                      <option value="3">3 year</option>
                      <option value="3">3+ year</option>
                      <option value="5">5+ year</option>
                      <option value="10">10+ year</option>
                    </select>
                  </div>

                  {/* Required Skills */}
                  <div className="mb-3">
                    <label className="form-label">Required Skills (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="requiredSkills"
                      value={editData.requiredSkills ? editData.requiredSkills.join(', ') : ''}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          requiredSkills: e.target.value.split(',').map((s) => s.trim()),
                        }))
                      }
                    />
                  </div>

                  {/* Job Location */}
                  <div className="mb-3">
                    <label className="form-label">Job Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Addis Ababa, Oromia Region"
                      name="jobLocation"
                      value={editData.jobLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Application Deadline */}
                  <div className="mb-3">
                    <label className="form-label">Application Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      name="applicationDeadline"
                      value={editData.applicationDeadline ? editData.applicationDeadline.slice(0, 10) : ''}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Contact Email */}
                  <div className="mb-3">
                    <label className="form-label">Contact Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="contactEmail"
                      value={editData.contactEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="mb-3">
                    <label className="form-label">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phoneNumber"
                      value={editData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
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

export default JobList;
