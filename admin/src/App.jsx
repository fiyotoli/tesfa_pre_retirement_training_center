import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddEmployee from './pages/AddEmployee';
import ListEmployee from './pages/ListEmployee';
import ListTestimonials from './pages/ListTestimonials';
import AddTestimonial from './pages/AddTestimonial';
import AddBlog from './pages/AddBlog';
import AddJob from './pages/AddJob';
import DashboardHome from './pages/DashboardHome';
import BlogList from './pages/BlogList';
import SingleBlog from './pages/SingleBlog';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminFeedbackList from './pages/AdminFeedbackList';
import Login from './components/Login';
import JobList from './pages/JobList';
import TrainerPendingPaymentList from './pages/TrainerPendingPayment';
import CompanyPendingPaymentList from './pages/CompanyPendingPaymentList';


export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency ="$";
function App() {
  

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') :'');

  useEffect(()=>{
    localStorage.setItem('token', token)
    }, [token])

  return (
    <div>
      <ToastContainer />
      {token === "" ? 
       <Login setToken={setToken} />
      :
        <>
          <Navbar  setToken={setToken}/>
          <hr />
          <div style={{ display: 'flex' }}>
           
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path='/' element={<DashboardHome  />} /> */
                <Route path='/add' element={<AddEmployee  token={token} />} /> */
                <Route path='/add_job' element={<AddJob  token={token} />} /> */
                <Route path='/Trainer_Pending_Payment_list' element={<TrainerPendingPaymentList />} /> */
                <Route path='/Company_Pending_Payment_list' element={<CompanyPendingPaymentList/>} /> */
                <Route path='/job_list' element={<JobList  token={token} />} /> */
                <Route path='/list' element={<ListEmployee token={token} />} />
                <Route path='/list_testimonial' element={<ListTestimonials token={token} />} />
                <Route path='/feedback_list' element={<AdminFeedbackList token={token}/>} />
                <Route path='/add_testimonial' element={<AddTestimonial  token={token}/>} /> 
                <Route path='/blog_list' element={<BlogList token={token}/>} />
                <Route path="/blog/:id" element={<SingleBlog />} />

                <Route path='/add_blog' element={<AddBlog   token={token}/>} /> 
                 
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
