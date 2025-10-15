import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";

const TrainerPendingPaymentRegistration = ({ token }) => {
  const [image1, setImage1] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1) {
      toast.error("Image is not selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", JSON.stringify(address));
      formData.append("image1", image1);

      const response = await axios.post(
        `${backendUrl}/api/TrainerPendingPayment/add`,
        formData,
        {
          headers: { token, "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
        setImage1(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container-fluid bg-white mt-5 pt-5">
      <form
        onSubmit={onSubmitHandler}
        className="container px-5 py-2 py-md-4 my-3"
      >
        {/* profile Upload */}
        <div className="mb-4 pt-2">
          <h2 className="mb-4 text-primary-custom d-flex align-items-center gap-2">
            <FaUserPlus className="text-primary-custom" /> እንደ ሰልጣኝ ይመዝገቡ
          </h2>

          <label
            htmlFor="image1"
            className="border p-2 rounded d-flex align-items-center justify-content-center"
            style={{ width: "150px", height: "150px", cursor: "pointer" }}
          >
            <img
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt="upload preview"
              className="img-fluid"
              style={{ maxHeight: "100%" }}
            />
            <input
              type="file"
              id="image1"
              hidden
              accept="image/*"
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
        </div>

        {/* Two Columns */}
        <div className="row">
          <div className="col-md-6">
            {/* First Name */}
            <div className="mb-3">
              <label className="form-label fw-bold text-capitalize">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-bold text-capitalize">Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label fw-bold text-capitalize">Last Name:</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label fw-bold text-capitalize">
                Phone Number:
              </label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

           {/* Address */}
<div className="mb-3">
  <label className="form-label fw-bold text-capitalize">Address:</label>
  <input
    type="text"
    className="form-control"
    placeholder="mexico, Addis Ababa, Ethiopia"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    required
  />
</div>

          </div>
        </div>

        <button type="submit" className="btn bg-primary-custom text-white">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default TrainerPendingPaymentRegistration;
