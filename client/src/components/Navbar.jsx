import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

// Import your logo image from assets folder
import logo from '../assets/logo.png';  // adjust path & filename as needed

function NavbarComponent() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(prev => !prev);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setExpanded(false);
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="white"
      variant="light"
      fixed="top"
      expanded={expanded}
      className="shadow-lg "
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          {/* Replace text logo with image */}
          <img src={logo} alt="Tesfa PRTC Logo" style={{ height: '60px' }} />
        </Navbar.Brand>

        {/* Toggler */}
        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={handleToggle}
        >
          {!expanded ? (
            <span className="navbar-toggler-icon"></span>
          ) : (
            <span className="close-icon" style={{ fontSize: '1.5rem' }}>&times;</span>
          )}
        </Navbar.Toggle>

        {/* Nav Links */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto text-center">
            <NavLink
              to="/profile"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? 'fw-bold text-primary-custom' : ''}`
              }
            >
              የሥራ ፈላጊዎች ፕሮፋይል
            </NavLink>
            <NavLink
              to="/job"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? 'fw-bold text-primary-custom' : ''}`
              }
            >
             ክፍት የሥራ ቦታ
            </NavLink>
            <NavLink
              to="/register"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? 'fw-bold text-primary-custom' : ''}`
              }
            >
             ለመመዝገብ
            </NavLink>
            <NavLink
              to="/blog"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? 'fw-bold text-primary-custom' : ''}`
              }
            >
              ብሎግ
            </NavLink>
            <NavLink
              to="/about"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? 'fw-bold text-primary-custom' : ''}`
              }
            >
              ስለ እኛ
            </NavLink>
          </Nav>

          {/* Right-side Button */}
          <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
            <Link to="/contact">
              <button className="btn bg-primary-custom text-white">የመገናኛ መረጃ</button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
