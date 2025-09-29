import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
   
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', {email, password});
      if (response.data.success) {
        setToken(response.data.token)
        // localStorage.setItem('token', response.data.token);
      }
     else{
      toast.error(response.data.message)
     }
      
    } catch (error) {
      console.log( error);
      toast.error(error.message)
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '400px' }}>
      <div className="text-center my-4">
  <h2 className="d-inline-flex align-items-center justify-content-center">
    <span className="bg-primary-custom me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>
  Admin Login
  </h2>
</div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              className="form-control"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn view-detail-button w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
