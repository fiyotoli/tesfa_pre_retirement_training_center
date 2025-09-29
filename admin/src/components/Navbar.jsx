import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  MdAddCircleOutline,
  MdFormatListBulleted,
  MdClose,
  MdCreate,
  MdRateReview,
  MdLibraryBooks,
  MdListAlt,
  MdFeedback,
} from 'react-icons/md';
import {
FaBriefcase

} from 'react-icons/fa';
import logo from '../assets/logo.png';

function Navbar({ setToken }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(window.innerWidth < 992);
  const location = useLocation();

  const [selectedPath, setSelectedPath] = useState(location.pathname);

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      const isSmall = window.innerWidth < 992;
      setIsSmallOrMedium(isSmall);
      setSidebarOpen(!isSmall);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const navLinkClass = (to) => {
    const isActive = selectedPath === to;
    return `sidebar-link text-decoration-none d-flex align-items-center gap-2 mb-3 small fw-semibold ${
      isActive ? 'active-link' : 'text-black'
    }`;
  };

  const onNavLinkClick = (to) => {
    setSelectedPath(to);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white d-flex align-items-center justify-content-between py-3 px-5 fixed-top shadow-sm">
        <Link className="navbar-brand" to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Tesfa PRTC Logo" style={{ height: '60px' }} />
        </Link>
        <button onClick={() => setToken('')} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 bg-light vh-100 shadow-lg p-3"
        style={{
          width: '250px',
          zIndex: 1050,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-0">
          <Link to="/" className="text-decoration-none" onClick={() => onNavLinkClick('/')}>
            <img src={logo} alt="Tesfa PRTC Logo" style={{ height: '60px' }} />
          </Link>
          <MdClose
            size={20}
            onClick={closeSidebar}
            style={{ cursor: 'pointer', color: 'black' }}
          />
        </div>

        <p className="text-muted small mb-3 mt-2 text-start">Admin Dashboard</p>
        <hr className="border border-black opacity-100 my-3" />

        {/* Sidebar Links Scrollable */}
        <div
          className="d-flex flex-column overflow-auto"
          style={{
            maxHeight: 'calc(100vh - 150px)',
            paddingRight: '4px',
          }}
        >
          {/* Section 1 */}
          <div className="pb-3 border-bottom border-black">
            <NavLink to="/add" className={() => navLinkClass('/add')} onClick={() => onNavLinkClick('/add')}>
              <MdAddCircleOutline className="sidebar-icon" size={18} />
              <span>Add Employee</span>
            </NavLink>
            <NavLink to="/list" className={() => navLinkClass('/list')} onClick={() => onNavLinkClick('/list')}>
              <MdFormatListBulleted className="sidebar-icon" size={18} />
              <span>List Employee</span>
            </NavLink>
          </div>

          {/* Jobs Section */}
          <div className="py-3 border-bottom border-black">
            <NavLink to="/add_job" className={() => navLinkClass('/add_job')} onClick={() => onNavLinkClick('/add_job')}>
              <FaBriefcase className="sidebar-icon" size={18} />
              <span>Add Job</span>
            </NavLink>
            <NavLink to="/job_list" className={() => navLinkClass('/job_list')} onClick={() => onNavLinkClick('/job_list')}>
              <MdFormatListBulleted className="sidebar-icon" size={18} />
              <span>List Job</span>
            </NavLink>
          </div>

          {/* Testimonials Section */}
          <div className="py-3 border-bottom border-black">
            <NavLink to="/add_testimonial" className={() => navLinkClass('/add_testimonial')} onClick={() => onNavLinkClick('/add_testimonial')}>
              <MdCreate className="sidebar-icon" size={18} />
              <span>Add Testimonial</span>
            </NavLink>
            <NavLink to="/list_testimonial" className={() => navLinkClass('/list_testimonial')} onClick={() => onNavLinkClick('/list_testimonial')}>
              <MdRateReview className="sidebar-icon" size={18} />
              <span>List Testimonial</span>
            </NavLink>
          </div>

          {/* Blogs & Feedback */}
          <div className="py-3">
            <NavLink to="/add_blog" className={() => navLinkClass('/add_blog')} onClick={() => onNavLinkClick('/add_blog')}>
              <MdLibraryBooks className="sidebar-icon" size={18} />
              <span>Add Blog</span>
            </NavLink>
            <NavLink to="/blog_list" className={() => navLinkClass('/blog_list')} onClick={() => onNavLinkClick('/blog_list')}>
              <MdListAlt className="sidebar-icon" size={18} />
              <span>List Blog</span>
            </NavLink>
            <NavLink to="/feedback_list" className={() => navLinkClass('/feedback_list')} onClick={() => onNavLinkClick('/feedback_list')}>
              <MdFeedback className="sidebar-icon" size={18} />
              <span>User Feedback</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Content Offset */}
      <div className={`container-fluid pt-5 px-4 ms-0 ${sidebarOpen ? 'ms-250' : ''}`}></div>

      {/* Styles */}
      <style>{`
        .sidebar-link {
          padding: 4px 8px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .sidebar-icon {
          color: #814516;
          transition: color 0.3s ease;
        }

        .sidebar-link:hover {
          background-color: #814516 !important;
          color: white !important;
        }

        .sidebar-link:hover .sidebar-icon {
          color: white !important;
        }

        .active-link {
          background-color: #814516 !important;
          color: white !important;
        }

        .active-link .sidebar-icon {
          color: white !important;
        }

        /* Optional custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #814516;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
}

export default Navbar;
