import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

const FeaturedEmployeeCard = ({ employee }) => {
  const navigate = useNavigate();

  const capitalizeName = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const name = `${employee.firstName} ${employee.lastName}`;
  const education = employee.educationLevel || 'N/A';

  // ✅ Extract description parts (same as your working component)
  const [educationText = '', experience = '', workExperienceSelf = '', workExperienceGovernment = ''] =
    employee.description ? employee.description.split(',').map((s) => s.trim()) : ['', '', '', ''];

  return (
    <div className="col">
      <div
        className="card shadow-sm border-0 p-3 h-100 text-center employee-card"
        style={{
          transition: 'background-color 0.4s ease, transform 0.3s ease',
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/profile/${employee._id}`)}
      >
        {/* Image */}
        <img
          src={
            employee.image && employee.image.length > 0
              ? employee.image[0]
              : "https://via.placeholder.com/100?text=No+Image"
          }
          alt={name}
          className="rounded-circle mx-auto profile-img"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            border: '3px solid #814516',
            transition: 'border-color 0.3s ease',
          }}
        />

        {/* Name */}
        <h5 className="fw-bold mt-3 mb-1 card-name">{capitalizeName(name)}</h5>

        {/* Education */}
        <p className="text-muted mb-0 card-education">{educationText || education}</p>

        {/* Horizontal Line */}
        <hr className="card-line mt-2 mb-0" />

        {/* ✅ Experience */}
<div className="d-flex justify-content-center">
  <div
    className="d-inline-flex px-2 my-2 py-1 bg-yellow-custom-opacity exp-bg  text-nowrap justify-content-center text-black align-items-center text-center rounded mb-2 card-info"
    style={{ fontSize: '13px', maxWidth: '100%' }}
  >
    <FaBriefcase className="me-2 text-white text-primary-custom card-icon" />
    <span className="card-info-text text-white">
      Total Experience: {experience || 'Unknown'}
    </span>
  </div>
</div>


        {/* View Detail Button */}
        <div className="text-center w-100">
          <button className="btn btn-primary view-btn px-4 employee-card">
           ዝርዝሮችን ይመልከቱ
          </button>
        </div>
      </div>

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

export default FeaturedEmployeeCard;
