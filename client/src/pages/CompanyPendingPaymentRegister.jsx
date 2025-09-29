import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";

const CompanyPendingPaymentRegister = ({ token }) => {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        fullName,
        companyName,
        businessType,
        phoneNumber,
        email,
        companyAddress,
      };

      const response = await axios.post(
        `${backendUrl}/api/CompanyPendingPayment/add`,
        payload,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Company registered successfully!");

        // Reset form
        setFullName("");
        setCompanyName("");
        setBusinessType("");
        setPhoneNumber("");
        setEmail("");
        setCompanyAddress("");
      } else {
        toast.error(response.data.message || "Failed to register company.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container-fluid bg-white mt-5 pt-5">
      <form
        onSubmit={onSubmitHandler}
        className="container px-5 py-2 py-md-4 my-3"
      >
        <h2 className="mb-4 text-primary-custom d-flex align-items-center gap-2">
          <FaUserPlus className="text-primary-custom" /> Register Company
        </h2>

        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">Full Name:</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Company Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">Company Name:</label>
          <input
            type="text"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        {/* Business Type */}
        <div className="mb-3">
          <label className="form-label fw-bold">Business Type:</label>
          <input
            type="text"
            className="form-control"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="form-label fw-bold">Phone Number:</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-bold">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Company Address */}
        <div className="mb-3">
          <label className="form-label fw-bold">Company Address:</label>
          <textarea
            className="form-control"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn bg-primary-custom text-white">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default CompanyPendingPaymentRegister;
