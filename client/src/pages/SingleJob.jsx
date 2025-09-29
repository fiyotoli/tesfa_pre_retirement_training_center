import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaBuilding, 
  FaBookmark, 
  FaClock, 
  FaGraduationCap, 
  FaTools, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone 
} from 'react-icons/fa';

const baseIconStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  fontSize: '16px',
  flexShrink: 0,
  marginRight: '12px',
};

// Colors
const primaryColor = '#814516'; // Bootstrap primary blue
const whiteColor = '#fff';

// Style for card background primary + text white
const cardStylePrimary = {
  backgroundColor: primaryColor,
  color: whiteColor,
};

const cardStyleDefault = {
  backgroundColor: 'white',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  borderRadius: '0.5rem',
};


const primaryTextStyle = { color: whiteColor };
// Style for icon circle when card is NOT primary bg (default)
const iconDefaultStyle = {
  ...baseIconStyle,
  backgroundColor: primaryColor,
  color: whiteColor,
};

// Style for icon circle when card IS primary bg (invert colors)
const iconInvertedStyle = {
  ...baseIconStyle,
  backgroundColor: whiteColor,
  color: primaryColor,
  border: `1px solid ${primaryColor}`, // optional border for neatness
};

const SingleJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.post(`${backendUrl}/api/jobs/single`, { id });
        if (res.data.success) {
          setJob(res.data.job);
        } else {
          setError(res.data.message || 'Failed to load job');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, backendUrl]);

  if (loading) return <p className="text-center my-5">Loading job details...</p>;
  if (error) return <p className="text-danger text-center my-5">{error}</p>;
  if (!job) return <p className="text-center my-5">No job found.</p>;

  // Helper to check if index is odd (1-based)
  const isOdd = (index) => index % 2 === 1;

  return (
    <div className="container py-4 mt-5">

      {/* Back to jobs button */}
      <div className="mb-3 mt-5 py-2">
        <Link to="/job" className="btn  view-detail-button">
          &larr; Back to Jobs
        </Link>
      </div>

      {/* First row: two columns with cards */}
      <div className="row mb-4">
        {/* First card - icon, company name, and organization type */}
        <div className="col-md-4 mb-3">
          <div style={isOdd(1) ? cardStylePrimary : {}} className="card p-3 shadow-sm h-100">
            <div className="d-flex align-items-center mb-3">
              <div style={isOdd(1) ? iconInvertedStyle : iconDefaultStyle}>
                <FaBuilding />
              </div>
              <div style={isOdd(1) ? { color: whiteColor } : {}}>
                <h5 className="mb-0 text-capitalize">{job.organizationName}</h5>
                <small>
                  {job.organizationType}
                  {job.organizationType === 'Other' && job.organizationTypeOther
                    ? ` (${job.organizationTypeOther})`
                    : ''}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Second card - job title and job type with icons */}
        <div className="col-md-8 mb-3">
          <div style={isOdd(2) ? cardStylePrimary : {}} className="card p-3 shadow-sm h-100">
            <div className="row">
              <div className=" col-lg-6 d-flex align-items-center mb-3">
                <div style={isOdd(2) ? iconInvertedStyle : iconDefaultStyle}>
                  <FaBookmark />
                </div>
                <div style={isOdd(2) ? { color: whiteColor } : {}}>
                  <h6 className="fw-bold mb-1 text-capitalize">Job Title|የስራ መደብ</h6>
                  <p className="text-muted mb-0 text-capitalize" style={isOdd(2) ? { color: whiteColor } : {}}>
                    {Array.isArray(job.jobTitle) ? job.jobTitle.join(', ') : job.jobTitle}
                  </p>
                </div>
              </div>
              <div className=" col-lg-6 d-flex align-items-center mb-3">
                <div style={isOdd(2) ? iconInvertedStyle : iconDefaultStyle}>
                  <FaClock />
                </div>
                <div style={isOdd(2) ? { color: whiteColor } : {}}>
                  <h6 className="fw-bold mb-1 text-capitalize">Job Type|የሥራ አይነት</h6>
                  <p className="text-muted mb-0" style={isOdd(2) ? { color: whiteColor } : {}}>
                    {job.jobType}
                    {job.jobType === 'Other' && job.jobTypeOther
                      ? ` (${job.jobTypeOther})`
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row: two columns with description and education/experience */}
      <div className="row mb-4">
        <div className="col-lg-8 mb-3">
          <div style={isOdd(3) ? cardStylePrimary : {}} className="card p-3 shadow-sm h-100">
            <h6 className="fw-bold mb-2 text-capitalize" style={isOdd(3) ? { color: whiteColor } : {}}>Job Description|የሥራ መግለጫ</h6>
           <p className={`mb-0 ${isOdd(3) ? 'text-white' : 'text-muted'}`}>
  {job.jobDescription}
</p>
    </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div style={isOdd(4) ? cardStylePrimary : {}} className="card p-3 shadow-sm h-100">
            <div className="mb-3 d-flex align-items-center">
              <div style={isOdd(4) ? iconInvertedStyle : iconDefaultStyle}>
                <FaGraduationCap />
              </div>
              <div style={isOdd(4) ? { color: whiteColor } : {}}>
                <h6 className="fw-bold mb-1 text-capitalize">Educational Level|የትምህርት ደረጃ</h6>
                <p className="text-muted mb-0" style={isOdd(4) ? { color: whiteColor } : {}}>
                  {job.educationLevel}
                  {job.educationLevel === 'Other' && job.educationLevelOther
                    ? ` (${job.educationLevelOther})`
                    : ''}
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div style={isOdd(4) ? iconInvertedStyle : iconDefaultStyle}>
                <FaTools />
              </div>
              <div style={isOdd(4) ? { color: whiteColor } : {}}>
                <h6 className="fw-bold mb-1 text-capitalize">Work Experience|የሥራ ልምድ</h6>
                <p className="text-muted mb-0" style={isOdd(4) ? { color: whiteColor } : {}}>{job.workExperience} yrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Third row: skills required and location */}
<div className="row mb-4">
  <div className="col-md-7 col-lg-8 mb-3">
    <div style={isOdd(5) ? cardStylePrimary : {}} className="card p-3 shadow-sm h-100">
      <h6 className={`fw-bold mb-2 text-capitalize ${isOdd(5) ? 'text-white' : ''}`}>
        Skills Required | የሚፈለጉ ክህሎቶች
      </h6>
      <div className='text-capitalize'>
        <p className={`mb-0 ${isOdd(5) ? 'text-white' : 'text-muted'}`}>
          {job.requiredSkills?.join(', ')}
        </p>
      </div>
    </div>
  </div>

  <div className="col-md-5 col-lg-4 d-flex align-items-center" style={isOdd(6) ? cardStylePrimary : {}}>
    <div style={isOdd(6) ? iconInvertedStyle : iconDefaultStyle}>
      <FaMapMarkerAlt />
    </div>
    <div style={isOdd(6) ? { color: whiteColor } : {}}>
      <h6 className="fw-bold mb-1 text-capitalize">Location|የሥራ ቦታ</h6>
      <p className="text-muted mb-0 text-capitalize" style={isOdd(6) ? { color: whiteColor } : {}}>
        {job.jobLocation}
      </p>
    </div>
  </div>
</div>


     {/* Fourth row: email, phone, deadline */}
<div className="row mb-4">
  {/* Email */}
  <div
    className="col-md-6 col-lg-4  mb-3"
  >
    <div
      className="d-flex align-items-center p-3 h-100"
      style={{
        ...(isOdd(7) ? cardStylePrimary : cardStyleDefault),
        borderRadius: '0.5rem',
      }}
    >
      <div style={isOdd(7) ? iconInvertedStyle : iconDefaultStyle}>
        <FaEnvelope />
      </div>
      <div style={isOdd(7) ? primaryTextStyle : {}}>
        <h6 className="fw-bold mb-1 text-capitalize">Contact Email|ኢሜይል</h6>
        <p className="mb-0 " style={isOdd(7) ? primaryTextStyle : { color: 'inherit' }}>
          {job.contactEmail}
        </p>
      </div>
    </div>
  </div>

  {/* Phone */}
  <div
    className="col-md-6 col-lg-4  mb-3"
  >
    <div
      className="d-flex align-items-center p-3 h-100"
      style={{
        ...(isOdd(8) ? cardStylePrimary : cardStyleDefault),
        borderRadius: '0.5rem',
      }}
    >
      <div style={isOdd(8) ? iconInvertedStyle : iconDefaultStyle}>
        <FaPhone />
      </div>
      <div style={isOdd(8) ? primaryTextStyle : {}}>
        <h6 className="fw-bold mb-1 text-capitalize">Phone Number|ስልክ ቁጥር</h6>
        <p className="mb-0" style={isOdd(8) ? primaryTextStyle : { color: 'inherit' }}>
          {job.phoneNumber || '-'}
        </p>
      </div>
    </div>
  </div>

  {/* Deadline */}
  <div
    className="col-md-6 col-lg-4 mb-3"
  >
    <div
      className="d-flex align-items-center p-3 h-100"
      style={{
        ...(isOdd(9) ? cardStylePrimary : cardStyleDefault),
        borderRadius: '0.5rem',
      }}
    >
      <div style={isOdd(9) ? iconInvertedStyle : iconDefaultStyle}>
        <FaClock />
      </div>
      <div style={isOdd(9) ? primaryTextStyle : {}}>
        <h6 className="fw-bold mb-1 text-capitalize">Application Deadline|የማመልከቻ የመጨረሻ ቀን</h6>
        <p className="mb-0" style={isOdd(9) ? primaryTextStyle : { color: 'inherit' }}>
          {job.applicationDeadline ? job.applicationDeadline.slice(0, 10) : '-'}
        </p>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default SingleJob;
