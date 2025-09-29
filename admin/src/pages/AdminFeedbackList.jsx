import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { Modal, Button } from "react-bootstrap";

const AdminFeedbackList = ({ token }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeRow, setActiveRow] = useState(2); // highlight 3rd row
  const [selectedFeedback, setSelectedFeedback] = useState(null); // for modal

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/feedback/list`, {
        headers: { token },
      });
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
        setError("");
      } else {
        setError("Failed to load feedback.");
      }
    } catch {
      setError("Error loading feedback.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const res = await axios.delete(`${backendUrl}/api/feedback/${id}`, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("Feedback deleted successfully");
        setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch {
      toast.error("Server error. Could not delete feedback.");
    }
  };

  if (loading) return <p className="text-center my-5">Loading feedback...</p>;
  if (error) return <p className="text-danger text-center my-5">{error}</p>;
  if (feedbacks.length === 0) return <p className="text-center my-5">No feedback found.</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 d-flex align-items-center text-primary-custom">
        <FaCommentDots className="me-2 text-primary-custom" />
        User Feedback
      </h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th style={{ minWidth: "250px" }}>Message</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(({ _id, name, email, message, createdAt }, index) => {
              const isActive = activeRow === index;
              return (
                <tr
                  key={_id}
                  onClick={() => setSelectedFeedback({ name, email, message })}
                  onMouseEnter={() => setActiveRow(index)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={isActive || index === 2 ? "bg-primary text-white" : ""}
                  style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                >
                  <td>{name}</td>
                  <td>{email}</td>
                  <td style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "250px"
                  }}>
                    {message}
                  </td>
                  <td>{new Date(createdAt).toLocaleString()}</td>
                  <td className="text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(_id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for Full Message */}
      <Modal
        show={!!selectedFeedback}
        onHide={() => setSelectedFeedback(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Feedback from {selectedFeedback?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Email:</strong> {selectedFeedback?.email}</p>
          <hr />
          <p><strong>Message:</strong><br /> {selectedFeedback?.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedFeedback(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminFeedbackList;
