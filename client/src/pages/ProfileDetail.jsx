import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
import {
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaSuitcase,
  FaEnvelope,
  FaPhone,FaLanguage, FaMapMarkerAlt, FaProjectDiagram 

} from 'react-icons/fa';
console
const iconCircleStyle = {
  backgroundColor: '#814516',
  borderRadius: '50%',
  color: 'white',
  borderColor:'white',
  width: '32px',
   border: '1px solid white',  // added this line
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const primaryIconCircleStyle = {
  backgroundColor: '#814516',
  borderRadius: '50%',
  borderColor:'white',
   border: '1px solid white',  // added this line
  color: 'white',
  width: '36px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
};
// Common card styles
const cardShadowStyle = {
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '1.5rem',
};
const shadowRowStyle = {
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  backgroundColor: 'white',
};
// You can alternate bg-primary and white cards using array index % 2, or manually:
const cardPrimaryStyle = {
  ...cardShadowStyle,
  backgroundColor: '#814516', // Bootstrap primary
  color: 'white',
};

const cardWhiteStyle = {
  ...cardShadowStyle,
  backgroundColor: 'white',
  color: 'black',
};

const ProfileDetail = () => {
  const { profileId } = useParams();
  const { profiles } = useContext(ProfileContext);
  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const profile = profiles.find((item) => item._id === profileId);

    if (profile) {
      // Safe parse helper function
      const parseJsonField = (field, name) => {
        if (Array.isArray(field)) return field;
        if (typeof field === 'string') {
          try {
            const parsed = JSON.parse(field);
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch (err) {
            return [];
          }
        }
        return [];
      };

      const parsedProfile = {
        ...profile,
        language: parseJsonField(profile.language, 'language'),
        education: parseJsonField(profile.education, 'education'),
        workExperience: parseJsonField(profile.workExperience, 'workExperience'),
        projects: parseJsonField(profile.projects, 'projects'),
      };

      setProfileData(parsedProfile);
      setImage(parsedProfile.image?.[0] || '');
    }

    window.scrollTo(0, 0);
  }, [profileId, profiles]);

  if (!profileData)
    return <div className="text-center mt-5 fs-4">Loading...</div>;

  const formatExperience = (exp) => {
    if (exp === 0) return '0 years';
    if (exp === undefined || exp === null) return 'N/A';
    return `${exp} years`;
  };

  // Helper for alternating cards background
  const renderCard = (children, index) => {
    const style = index % 2 === 0 ? cardWhiteStyle : cardPrimaryStyle;
    return <div style={style}>{children}</div>;
  };

   return (
    <div className="container mt-5 pt-5">
      <Link to="/profile" className="btn  view-detail-button mb-4 mt-2">&larr; ወደ ፕሮፋይል ገጽ ይመለሱ</Link>

      <div className="row align-items-start mb-5">
        <div className="col-md-3 text-center mt-3">
          {/* left side image & basic info */}
           <div
        className="position-relative d-inline-block"
        style={{
          boxShadow: '0 0 15px 4px #192d3d',
          borderRadius: '8px',
          maxWidth: '100%',
        }}
      >
        <img
          src={image}
          alt={`${profileData.firstName} ${profileData.lastName}`}
          className="img-fluid rounded"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '350px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '8px',
          }}
        />
      </div>
      <hr style={{ borderTop: '2px solid #814516', width: '80%', margin: '20px auto' }} />
      <h2 className="fw-bold text-capitalize">
        {profileData.firstName} {profileData.lastName}
      </h2>
      <p className="text-muted">{profileData.educationLevel || 'N/A'}</p>
        </div>

{/* left column */}

        <div className="col-md-9 mt-3">
          {/* Top Cards */}
          {/* Your existing top cards */}
{/* New styled cards */}

{/* // Education + Experience (White Card) */}
{renderCard((
  <>
    <div className="row">
      <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
        <div style={iconCircleStyle}><FaGraduationCap /></div>
        <div>
          <h6 className="fw-bold mb-1">Education Level|የትምህርት ደረጃ</h6>
          <p className="mb-0">{profileData.educationLevel || 'N/A'}</p>
        </div>
      </div>
      <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
        <div style={iconCircleStyle}><FaBriefcase /></div>
        <div>
          <h6 className="fw-bold mb-1">Total Experience|ጠቅላላ የሥራ ልምድ</h6>
          <p className="mb-0">{formatExperience(profileData.totalWorkExperience)}</p>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
        <div style={iconCircleStyle}><FaBriefcase /></div>
        <div>
          <h6 className="fw-bold mb-1">Self Experience|የግል ሥራ ልምድ </h6>
          <p className="mb-0">{formatExperience(profileData.workExperienceSelf)}</p>
        </div>
      </div>
      <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
        <div style={iconCircleStyle}><FaBriefcase /></div>
        <div>
          <h6 className="fw-bold mb-1">Govt Experience|የመንግስት የሥራ ልምድ</h6>
          <p className="mb-0">{formatExperience(profileData.workExperienceGovernment)}</p>
        </div>
      </div>
    </div>
  </>
), 5)}

{/* // Skills & Job Type (Primary Card) */}
{renderCard((
  <div className="row">
    {/* Skills Column */}
    <div className="col-md-6 mb-3">
      <div className="d-flex align-items-start gap-3">
        <div style={primaryIconCircleStyle}><FaTools /></div>
        <div>
          <h6 className="fw-bold mb-1">Skills|ክህሎቶች</h6>
          <ul className="mb-0 text-capitalize">
            {(() => {
              try {
                if (Array.isArray(profileData.additionalSkills) && profileData.additionalSkills.length === 1) {
                  const parsed = JSON.parse(profileData.additionalSkills[0]);
                  return parsed.map((skill, index) => <li key={index}>{skill}</li>);
                }
                if (Array.isArray(profileData.additionalSkills)) {
                  return profileData.additionalSkills.map((skill, index) => <li key={index}>{skill}</li>);
                }
                return <li>{profileData.additionalSkills || 'N/A'}</li>;
              } catch {
                return <li>{profileData.additionalSkills || 'N/A'}</li>;
              }
            })()}
          </ul>
        </div>
      </div>
    </div>

    {/* Job Type Column */}
    <div className="col-md-6 mb-3">
      <div className="d-flex align-items-start gap-3">
        <div style={primaryIconCircleStyle}><FaSuitcase /></div>
        <div>
          <h6 className="fw-bold mb-1">Job Type|የስራ መደብ</h6>
          <ul className="mb-0 text-capitalize">
            {(() => {
              try {
                if (Array.isArray(profileData.neededJobType) && profileData.neededJobType.length === 1) {
                  const parsed = JSON.parse(profileData.neededJobType[0]);
                  return parsed.map((job, index) => <li key={index}>{job}</li>);
                }
                if (Array.isArray(profileData.neededJobType)) {
                  return profileData.neededJobType.map((job, index) => <li key={index}>{job}</li>);
                }
                return <li>{profileData.neededJobType || 'N/A'}</li>;
              } catch {
                return <li>{profileData.neededJobType || 'N/A'}</li>;
              }
            })()}
          </ul>
        </div>
      </div>
    </div>
  </div>
), 6, true)}


          {/* New styled cards */}

         

          {/* Work Experience */}
          {renderCard((
            <>
              <div className="d-flex align-items-center mb-3 gap-3">
                <div style={primaryIconCircleStyle}><FaBriefcase size={20} /></div>
                <h5 className="mb-0">Work Experience|የሥራ ልምድ</h5>
              </div>
              {profileData.workExperience && profileData.workExperience.length > 0 ? (
                profileData.workExperience.map((work, i) => (
                  <div key={i} style={{ marginBottom: '1rem' }} className='text-capitalize'>
                    <strong>Company Name:</strong> {work.companyName}<br />
                    <strong>Job Title:</strong> {work.jobTitle}<br />
                    <strong>Start Date:</strong> {work.startDate?.slice(0, 10)}<br />
                    <strong>End Date:</strong> {work.endDate?.slice(0, 10)}<br />
                    <strong>Responsibilities:</strong>
                    <ul className="mb-0">
                      {(work.responsibilities || []).map((resp, j) => (
                        <li key={j}>{resp}</li>
                      ))}
                    </ul>
                    {i !== profileData.workExperience.length - 1 && <hr className="my-1" style={{ borderColor: '#fff' }}/>}
                  </div>
                ))
              ) : (
                <p className={cardPrimaryStyle.color === 'white' ? 'text-white' : 'text-muted'}>-</p>
              )}
            </>
          ), 1)}

         {/* Current Location + Education (Combined in One Card) */}
{renderCard((
  <div className="row">
    {/* Current Location */}
    <div className="col-md-6 mb-3">
      <div className="d-flex align-items-center mb-3 gap-3">
        <div style={primaryIconCircleStyle}><FaMapMarkerAlt size={20} /></div>
        <h5 className="mb-0">Current Location|መኖሪያ ቦታ</h5>
      </div>
      <p className='text-capitalize'>
        {profileData.currentLocation
          ? `${profileData.currentLocation.city || ''}, ${profileData.currentLocation.region || ''}, ${profileData.currentLocation.country || ''}`
          : '-'}
      </p>
    </div>

    {/* Education */}
    <div className="col-md-6 mb-3">
      <div className="d-flex align-items-center mb-3 gap-3">
        <div style={primaryIconCircleStyle}><FaGraduationCap size={20} /></div>
        <h5 className="mb-0">Education|የትምህርት ተቋም</h5>
      </div>
      {profileData.education && profileData.education.length > 0 ? (
        profileData.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }} className='text-capitalize'>
            <strong>Institution:</strong> {edu.institution}<br />
            <strong>Graduation Year:</strong> {edu.graduationYear}
            {i !== profileData.education.length - 1 && <hr className="my-1" style={{ borderColor: '#ccc' }} />}
          </div>
        ))
      ) : (
        <p className={cardPrimaryStyle.color === 'white' ? 'text-white' : 'text-muted'}>-</p>
      )}
    </div>
  </div>
), 3)}






          {renderCard((
  <div className="row">
    {/* Languages Column */}
    <div className="col-md-6 mb-3"> 
      <div className="d-flex align-items-center mb-3 gap-3">
        <div style={primaryIconCircleStyle}><FaLanguage size={20} /></div>
        <h5 className="mb-0">Languages|ቋንቋ</h5>
      </div>
      {Array.isArray(profileData.language) && profileData.language.length > 0 ? (
        profileData.language.map((lang, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }} className='text-capitalize'>
            <strong>Language:</strong> {lang.language}<br />
            <strong>Proficiency:</strong> {lang.proficiency}
            {i !== profileData.language.length - 1 && <hr className="my-1" style={{ borderColor: '#ccc' }} />}
          </div>
        ))
      ) : (
        <p className={cardPrimaryStyle.color === 'white' ? 'text-white' : 'text-muted'}>-</p>
      )}
    </div>
<hr />
    {/* Projects and language Column */}
    <div className="col-md-6">
      <div className="d-flex align-items-center mb-3 gap-3">
        <div style={primaryIconCircleStyle}><FaProjectDiagram size={20} /></div>
        <h5 className="mb-0">Projects|ፕሮጀክቶች</h5>
      </div>
      {Array.isArray(profileData.projects) && profileData.projects.length > 0 ? (
        profileData.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }} className='text-capitalize'>
            <p className="mb-1"><strong>Title:</strong> {proj.projectTitle}</p>
            <p className="mb-1"><strong>Description:</strong> {proj.description}</p>
            <p className="mb-1"><strong>Role:</strong> {proj.role}</p>
            {i !== profileData.projects.length - 1 && <hr className="my-1" style={{ borderColor: '#000' }} />}
          </div>
        ))
      ) : (
        <p className={cardPrimaryStyle.color === 'white' ? 'text-white' : 'text-muted'}>N/A</p>
      )}
    </div>
  </div>
), 0)}


          {/* Contact Info */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                <FaEnvelope className="me-2 text-primary-custom" />
                Email|ኢሜይል
              </label>
              <input
                type="text"
                readOnly
                className="form-control bg-light "
                id="email"
                value={profileData.email || 'N/A'}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label fw-bold">
                <FaPhone className="me-2 text-primary-custom" />
                Phone|ስልክ ቁጥር
              </label>
              <input
                type="text"
                readOnly
                className="form-control bg-light"
                id="phone"
                value={profileData.phoneNumber || 'N/A'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetail;
