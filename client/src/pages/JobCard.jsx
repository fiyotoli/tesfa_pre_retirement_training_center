import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../components/JobCard.css'; // Custom styles

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [organizationType, setOrganizationType] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/jobs/list`);
        if (res.data.success) {
          setJobs(res.data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const filteredJobs = jobs.filter((job) => {
    const jobTitle = Array.isArray(job.jobTitle) ? job.jobTitle.join(' ') : job.jobTitle;
    const matchesSearch = typeof jobTitle === 'string' && jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchesJobType = jobType === '' || job.jobType === jobType;
    const matchesOrgType = organizationType === '' || job.organizationType === organizationType;
    return matchesSearch && matchesJobType && matchesOrgType;
  });

  if (loading) return <p className="text-center my-5">Loading jobs...</p>;

  return (
    <div className="container py-4 mt-5">
      <h2 className="mb-4 mt-5 text-center d-flex justify-content-center align-items-center gap-2">
        <FaBriefcase className='text-primary-custom' />ክፍት የሥራ ቦታዎች
      </h2>

      {/* Search & Filters */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-9">
          <div className="row g-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="በስራ አይነት መፈለግ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">ሁሉም የሥራ ዓይነቶች</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={organizationType}
                onChange={(e) => setOrganizationType(e.target.value)}
              >
                <option value="">ሁሉም ድርጅቶች</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="NGO">NGO</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredJobs.length === 0 && (
          <p className="text-center text-muted">ክፍት የሥራ ቦታ የለም.</p>
        )}

        {filteredJobs.map((job) => (
          <div key={job._id} className="col-md-6 col-lg-4 d-flex">
            <div
              className="card h-100 border-0 shadow-sm job-card d-flex flex-column"
              style={{ cursor: 'pointer', transition: '0.3s' }}
            >
              <div className="card-body d-flex flex-column">
                {/* Icon & Org Info */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#814516',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <FaBriefcase size={20} />
                  </div>

                  <div>
                    <h5 className="mb-0 fw-bold text-capitalize">{job.organizationName}</h5>
                    <small className="text-muted">
                      {job.organizationType}
                      {job.organizationType === 'Other' && job.organizationTypeOther
                        ? ` (${job.organizationTypeOther})`
                        : ''}
                    </small>
                  </div>
                </div>

                {/* Job Title & Description */}
                <div className="mb-3 border-bottom pb-2 flex-grow-1">
                  <h6 className="fw-bold text-capitalize">
                    {Array.isArray(job.jobTitle)
                      ? job.jobTitle.join(', ')
                      : job.jobTitle}
                  </h6>
                  <p className="text-muted mb-0">{truncateText(job.jobDescription)}</p>
                </div>

                {/* Location */}
                <div className="d-flex justify-content-between text-muted small mb-3 mt-auto">
                  <div className='text-capitalize'>📍 {job.jobLocation}</div>
                </div>

                {/* View Details */}
                <div className="d-flex justify-content-start mt-auto">
                  <Link
                    to={`/job/${job._id}`}
                    className="btn view-detail-button btn-sm"
                  >
                    ዝርዝሮችን ይመልከቱ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
