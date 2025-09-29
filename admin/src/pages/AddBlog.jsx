// AddBlog.jsx
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";

const AddBlog = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState(""); // Google Drive link state

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1) {
      toast.error("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);
      formData.append("socialMediaLink", socialMediaLink);
      formData.append("googleDriveLink", googleDriveLink); // append Google Drive link
      formData.append("image1", image1);

      const response = await axios.post(`${backendUrl}/api/blog/add`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Blog added successfully!");
        setTitle("");
        setContent("");
        setDate("");
        setSocialMediaLink("");
        setGoogleDriveLink(""); // reset Google Drive link
        setImage1(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add blog.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container px-5 py-2 py-md-4 my-3">
      {/* Blog Upload Image */}
      <div className="mb-4 pt-2">
        <h2 className="mb-4 text-primary-custom d-flex align-items-center gap-2">
          <FaUserPlus className="text-primary-custom" /> Add New Blog
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

      {/* Blog Fields */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Social Media Link (optional)</label>
        <input
          type="url"
          className="form-control"
          value={socialMediaLink}
          onChange={(e) => setSocialMediaLink(e.target.value)}
        />
      </div>

      {/* Google Drive Document Link */}
      <div className="mb-3">
        <label className="form-label">Google Drive Document Link (optional)</label>
        <input
          type="url"
          className="form-control"
          placeholder="https://docs.google.com/document/d/FILE_ID/preview"
          value={googleDriveLink}
          onChange={(e) => setGoogleDriveLink(e.target.value)}
        />
        <small className="form-text text-muted">
          Use the /preview link for embedding in blog posts
        </small>
      </div>

      <button type="submit" className="btn bg-primary-custom text-white">
        Submit Blog
      </button>
    </form>
  );
};

export default AddBlog;
