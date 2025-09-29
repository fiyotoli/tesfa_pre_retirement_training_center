import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
  import { FaBriefcase } from 'react-icons/fa';
  
const CompanyPendingPaymentList = ({ token }) => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/CompanyPendingPayment/list`, {
        headers: { token },
      });
      if (response.data.success) {
        const sorted = response.data.companies.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCompanies(sorted);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/CompanyPendingPayment/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Company deleted successfully");
        fetchCompanies();
      } else {
        toast.error(response.data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleEditClick = (company) => {
    setEditingId(company._id);
    setEditData({ ...company }); // Copy all company fields
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/CompanyPendingPayment/edit`,
        { id, ...editData },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Company updated successfully");
        setEditingId(null);
        fetchCompanies();
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const filteredCompanies = companies.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      c.businessType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
    <h2 className="mb-4 text-primary-custom d-flex align-items-center gap-2">
             <FaBriefcase className="text-primary-custom" /> List of Companies (Pending Payment)
        
           </h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Name, Company, or Type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="d-flex flex-column gap-3">
        {filteredCompanies.length === 0 && <p>No companies found.</p>}

        {filteredCompanies.map((company) => (
          <div
            key={company._id}
            className="border rounded p-3 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-start gap-2"
          >
            {editingId === company._id ? (
              <div className="d-flex flex-column flex-md-row gap-2 w-100 flex-wrap">
                <input
                  className="form-control"
                  value={editData.fullName || ""}
                  placeholder="Full Name"
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                />
                <input
                  className="form-control"
                  value={editData.companyName || ""}
                  placeholder="Company Name"
                  onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
                />
                <input
                  className="form-control"
                  value={editData.businessType || ""}
                  placeholder="Business Type"
                  onChange={(e) => setEditData({ ...editData, businessType: e.target.value })}
                />
                <input
                  className="form-control"
                  value={editData.phoneNumber || ""}
                  placeholder="Phone"
                  onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                />
                <input
                  className="form-control"
                  value={editData.email || ""}
                  placeholder="Email"
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
                <input
                  className="form-control"
                  value={editData.companyAddress || ""}
                  placeholder="Address"
                  onChange={(e) => setEditData({ ...editData, companyAddress: e.target.value })}
                />
              </div>
            ) : (
              <div className="d-flex flex-column flex-md-row gap-3 w-100 flex-wrap">
                <span><strong>Full Name:</strong> {company.fullName}</span>
                <span><strong>Company:</strong> {company.companyName}</span>
                <span><strong>Type:</strong> {company.businessType}</span>
                <span><strong>Phone:</strong> {company.phoneNumber}</span>
                <span><strong>Email:</strong> {company.email}</span>
                <span><strong>Address:</strong> {company.companyAddress}</span>
              </div>
            )}

            <div className="mt-2 mt-md-0 d-flex gap-2">
              {editingId === company._id ? (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleSave(company._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEditClick(company)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(company._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPendingPaymentList;
