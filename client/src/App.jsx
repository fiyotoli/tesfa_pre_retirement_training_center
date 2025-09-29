import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import AboutUs from './pages/About';
import Contact from './pages/Contact';
import JobCard from './pages/JobCard';




import ProfileDetail from './pages/ProfileDetail';

import NavbarComponent from './components/Navbar';

import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import { FaArrowAltCircleUp } from 'react-icons/fa';
import Footer from './components/Footer';
import EmployeeList from './components/EmployeeList';
import BlogList from './pages/BlogList';
import SingleBlog from './pages/SingleBlog';
import SingleJob from './pages/SingleJob';
import Register from './pages/Register';
import TrainerPendingPaymentRegistration from './pages/TrainerPendingPaymentRegistration';
import CompanyPendingPaymentRegister from './pages/CompanyPendingPaymentRegister';


export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Simulating a loading delay (e.g., for data fetching)
      const timer = setTimeout(() => {
          setLoading(false);
      }, 1000); // Adjust the time as needed

      return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <NavbarComponent />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
          <div className="d-flex justify-content-center gap-2">
            {/* First Spinner Button */}
            <button className="btn bg-primary-custom text-white" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm text-white" aria-hidden="true"></span>
              <span className="visually-hidden text-white " role="status">Loading...</span>
            </button>
            {/* Second Spinner Button */}
            <button className="btn bg-primary-custom text-white" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm text-white" aria-hidden="true"></span>
              <span role="status text-white">Loading...</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <ToastContainer />
          
          <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='/about' element={<AboutUs />} />
              <Route path='/profile' element={<EmployeeList/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/blog' element={<BlogList/>} />
              <Route path='/job' element={<JobCard/>} />
              <Route path='/trainerRegister' element={<TrainerPendingPaymentRegistration/>} />
              <Route path='/companyRegister' element={<CompanyPendingPaymentRegister/>} />
              <Route path='/job/:id' element={<SingleJob/>} />
               <Route path='/contact' element={<Contact/>} />
            <Route path='/profile/:profileId' element={<ProfileDetail />} />
           <Route path="/blog/:id" element={<SingleBlog />} />
          
           
          </Routes>

          <button
            onClick={scrollToTop}
            className="btn bg-primary-custom"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              display: loading ? 'none' : 'block' // Hide when loading
            }}
          >
            <FaArrowAltCircleUp className='text-white' />
          </button>
          <Footer/>
        </>
      )}
    </div>
  );
}

export default App;
