import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedEmployeeCard from "./FeaturedEmployeeCard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const FeaturedEmployeesSection = () => {
  const [featuredEmployees, setFeaturedEmployees] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 cards initially

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/profile/featured`);
        if (data.success) {
          setFeaturedEmployees(data.employees);
        }
      } catch (error) {
        console.error("Failed to fetch featured employees", error);
      }
    };

    fetchFeatured();
  }, []);

  const handleExploreMore = () => {
    setVisibleCount((prev) => prev + 6); // Show 6 more on each click
  };

  return (
    <div className="container my-5">
     <div className="text-center my-4" data-aos="fade-down">
          <h2 className="d-inline-flex align-items-center justify-content-center">
            <span
              className="bg-primary-custom me-2"
              style={{
                borderRadius: '50px',
                width: '30px',
                height: '3px',
                display: 'inline-block',
              }}
            ></span>
         የተመረጡ ሰራተኞች
          </h2>
        </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3  row-cols-lg-4  g-4">
     {featuredEmployees.length === 0 ? (
  <div className="w-100 text-center">
    <p className="fs-5 text-muted">No featured employees to display.</p>
  </div>
) : (




          featuredEmployees
            .slice(0, visibleCount)
           .map((emp) => (
  <FeaturedEmployeeCard
    key={emp._id}
    employee={{
      ...emp,
      description: `
        ${emp.educationLevel || 'N/A'}, 
        ${emp.totalWorkExperience !== undefined ? emp.totalWorkExperience + ' yrs' : 'Unknown'},
        ${emp.workExperienceSelf !== undefined ? emp.workExperienceSelf + ' yrs' : 'Unknown'},
        ${emp.workExperienceGovernment !== undefined ? emp.workExperienceGovernment + ' yrs' : 'Unknown'}
      `
    }}
  />
))

        )}
      </div>

      {visibleCount < featuredEmployees.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary px-4 py-2"
            style={{
              transition: "all 0.3s ease",
              borderRadius: "30px",
              fontWeight: "500",
            }}
            onClick={handleExploreMore}
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedEmployeesSection;
