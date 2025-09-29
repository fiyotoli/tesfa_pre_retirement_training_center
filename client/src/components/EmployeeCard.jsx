import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';

const EmployeeCard = ({ id, image, name, description }) => {
  const capitalizeName = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  // Destructure description into parts safely
  const [education = '', experience = '', workExperienceSelf = '', workExperienceGovernment = ''] = description
    ? description.split(',').map(s => s.trim())
    : ['', '', '', ''];

  return (
    <div className="col">
      <Link to={`/profile/${id}`} className="text-decoration-none">
        <div
          className="card shadow-sm border-0 p-3 h-100 text-center employee-card"
          style={{
            transition: 'background-color 0.4s ease, transform 0.3s ease',
          }}
        >
          {/* Image */}
          <img
            src={image?.[0]}
            alt={name}
            className="rounded-circle mx-auto profile-img"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              border: '3px solid #824616',
              transition: 'border-color 0.3s ease',
            }}
          />

          {/* Name */}
          <h5 className="fw-bold mt-3 mb-1 card-name">{capitalizeName(name)}</h5>

          {/* Education */}
          <p className="text-muted mb-0 card-education">{education}</p>

          {/* Horizontal Line */}
          <hr className="card-line mt-2 mb-0" />
{/* ✅ Experience */}
<div className="d-flex justify-content-center">
  <div
    className="d-inline-flex px-2 my-2 py-1 bg-yellow-custom-opacity exp-bg bg-opacity-10 text-nowrap justify-content-center text-danger align-items-center text-center rounded mb-2 card-info"
    style={{ fontSize: '13px', maxWidth: '100%' }}
  >
    <FaBriefcase className=" text-white me-2 text-primary-custom card-icon" />
    <span className="card-info-text text-white">
      Total Experience: {experience || 'Unknown'}
    </span>
  </div>
</div>



          {/* View Detail Button */}
          <div className="text-center w-100">
            <button
              className="btn btn-primary view-btn px-4 employee-card"
              style={{ display: 'inline-block' }}
            >
             ዝርዝሮችን ይመልከቱ
            </button>
          </div>
        </div>
      </Link>

      {/* Hover Styles */}
      <style>
  {`
    .employee-card:hover {
      background-color: #814516;
      transform: scale(1.02);
    }

    .employee-card:hover .card-name,
    .employee-card:hover .card-education,
    .employee-card:hover .card-info-text {
      color: #fff !important;
    }

    .employee-card:hover .card-icon {
      color: #fff !important;
    }

    .employee-card:hover .card-line {
      background-color: #fff;
    }

    .employee-card:hover .view-btn {
      background-color: #fff !important;
      color: #000 !important;
    }

    .employee-card:hover .profile-img {
      border-color: #fff !important;
    }

    /* ✅ Add this for the Experience box */
    .employee-card:hover .exp-bg {
      background-color: #000 !important;
      color: #fff !important;
    }
  `}
</style>

    </div>
  );
};

export default EmployeeCard;
