import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import EmployeeCard from './EmployeeCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';

function EmployeeList() {
  const { profiles, search, showSearch, setSearch } = useContext(ProfileContext);
  const [filterProfiles, setFilterProfiles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const [educationFilter, setEducationFilter] = useState('');
  const [jobTypeSearch, setJobTypeSearch] = useState('');
  const [expRange, setExpRange] = useState('');

  const applyFilter = () => {
    let filtered = Array.isArray(profiles) ? [...profiles] : [];

    if (search) {
      filtered = filtered.filter(item =>
        item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (educationFilter) {
      filtered = filtered.filter(item => item.educationLevel === educationFilter);
    }

   if (jobTypeSearch) {
  filtered = filtered.filter(item => {
    const jobTypes = item.neededJobType;

    if (Array.isArray(jobTypes)) {
      // Check if any job type includes the search string (case-insensitive)
      return jobTypes.some(job =>
        job.toLowerCase().includes(jobTypeSearch.toLowerCase())
      );
    } else if (typeof jobTypes === 'string') {
      return jobTypes.toLowerCase().includes(jobTypeSearch.toLowerCase());
    }
    return false; // no match if undefined or other type
  });
}

    if (expRange) {
      if (expRange === "0-6") {
        filtered = filtered.filter(item => item.totalWorkExperience >= 0 && item.totalWorkExperience <= 6);
      } else if (expRange === "6-18") {
        filtered = filtered.filter(item => item.totalWorkExperience > 6 && item.totalWorkExperience <= 18);
      } else if (expRange === "18+") {
        filtered = filtered.filter(item => item.totalWorkExperience > 18);
      }
    }

    setFilterProfiles(filtered);
    setVisibleCount(6);
  };

  useEffect(() => {
    setFilterProfiles(profiles);
  }, [profiles]);

  useEffect(() => {
    applyFilter();
  }, [educationFilter, jobTypeSearch, expRange, search, showSearch]);

  const handleExploreMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="container mb-4 mt-5 pt-5">
      {/* Search bar */}
      <div className="row justify-content-center mt-1 pt-5">
        <div className="col-md-8 col-lg-7 mb-4">
          <div className="input-group">
  <input
    type="text"
    className="form-control rounded-start-pill ps-4 py-2 shadow-sm bg-white"
    placeholder="በስራ አይነት መፈለግ..."
    value={jobTypeSearch}
    onChange={(e) => setJobTypeSearch(e.target.value)}
  />
  <span className="input-group-text text-white border-start-0 rounded-end-pill bg-primary-custom">
    <FiSearch />
  </span>
</div>

        </div>
      </div>

      <div className="row mt-3">
        {/* Filters */}
        <div className="col-md-3 shadow-sm bg-light py-4">
          <div className="mb-4">
            <h5 className="mb-3 lead d-flex align-items-center gap-2">
              <FiFilter className="text-primary-custom" /> ፈልግ 
            </h5>

            {/* Education Level */}
            <div className="mb-3">
              <label className="form-label fw-bold">የትምህርት ደረጃ</label>
              <select
                className="form-select"
                value={educationFilter}
                onChange={(e) => setEducationFilter(e.target.value)}
              >
                <option value="">ሁሉም</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            {/* Work Experience Range */}
<div className="mb-3">
  <label className="form-label fw-semibold">የሥራ ልምድ</label>
  <div className="d-flex flex-wrap gap-3">
    {["", "0-6", "6-18", "18+"].map((range, i) => (
      <div className="form-check" key={range || 'all'}>
        <input
          className="form-check-input"
          type="radio"
          name="experience"
          value={range}
          id={`exp${i}`}
          checked={expRange === range}
          onChange={(e) => setExpRange(e.target.value)}
        />
        <label className="form-check-label" htmlFor={`exp${i}`}>
          {range === "" ? "ሁሉም" : range === "0-6" ? "0–6 አመት" : range === "6-18" ? "6–18 አመት" : "18+ አመት"}
        </label>
      </div>
    ))}
  </div>
</div>

            {/* Job Type */}
            
          </div>
        </div>

        {/* Profiles List */}
        <div className="col-md-9">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-3">
            <div className="text-center mt-1 mb-0 display-block">
              <h2 className="d-inline-flex align-items-center fw-bold justify-content-center gap-2">
                <FaUsers className="text-primary-custom" />
              የሥራ ፈላጊዎች ፕሮፋይል 
              </h2>
            </div>
          </div>

          <div className="row g-4">
            {filterProfiles.slice(0, visibleCount).map((item, index) => (
              <div key={item._id || index} className="col-md-6 col-lg-4">
                <EmployeeCard
                  id={item._id}
                  image={item.image}
                  name={`${item.firstName} ${item.lastName}`}
                  description={`
                    ${item.educationLevel}, 
                    ${item.totalWorkExperience !== undefined ? item.totalWorkExperience + ' yrs' : 'N/O'},
                    ${item.workExperienceSelf !== undefined ? item.workExperienceSelf + ' yrs' : 'N/O'},
                    ${item.workExperienceGovernment !== undefined ? item.workExperienceGovernment + ' yrs' : 'N/O'}
                  `}
                />
              </div>
            ))}
          </div>

          {visibleCount < filterProfiles.length && (
            <div className="text-center mt-4">
              <button className="btn bg-primary-custom-custom" onClick={handleExploreMore}>
                Explore More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
