import React, { useEffect, useState } from 'react';
import axios from 'axios';
import maleAvatar from '../assets/male_avatar.png';
import femaleAvatar from '../assets/female-avatar.png';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const ListTestimonials = ({ token }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added loading state
  const [error, setError] = useState(null); // ✅ optional error state if needed

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${backendUrl}/api/testimonials/all`);
      if (Array.isArray(res.data)) {
        setTestimonials(res.data);
      } else {
        toast.error('Unexpected response format');
        setTestimonials([]);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching testimonials');
      setError('Failed to fetch testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const getAvatar = (gender) => (gender === 'Male' ? maleAvatar : femaleAvatar);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/testimonials/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success('Testimonial deleted successfully');
        fetchTestimonials();
      } else {
        toast.error(res.data.message || 'Delete failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting testimonial');
    }
  };

  const handleEdit = (t) => {
    setEditData({ ...t });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/api/testimonials/edit`, editData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success('Testimonial updated successfully');
        setShowModal(false);
        setEditData(null);
        fetchTestimonials();
      } else {
        toast.error(res.data.message || 'Failed to update testimonial');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating testimonial');
    }
  };

  if (loading) return <p className="text-center my-5">Loading testimonial...</p>; // ✅ loading display
  if (error) return <p className="text-danger text-center my-5">{error}</p>; // ✅ error display

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary-custom">
        <HiOutlineChatAlt2 className="text-primary-custom me-2" />
        What People Say
      </h2>

      <div className="row">
        {testimonials.map((t, index) => (
          <div key={t._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card p-3 shadow-sm text-center h-100 position-relative d-flex flex-column justify-content-between">
              <div className="d-flex mb-2 flex-column align-items-center justify-content-center flex-grow-1">
                <p className="mb-3 flex-grow-1 text-capitalize d-flex align-items-center justify-content-center">
                  {t.feedback}
                </p>
                <hr className="border-primary w-100" />
                <img
                  src={getAvatar(t.gender)}
                  alt={t.name}
                  className="rounded-circle mx-auto mb-3"
                  style={{ width: '80px', height: '80px' }}
                />
                <h5 className="fw-bold mb-1 text-capitalize">{t.name}</h5>
                <p className="text-muted text-capitalize">{t.title}</p>
              </div>

              <div className="position-absolute bottom-0 end-0 my-2 me-2 mt-4">
                <button
                  className="btn btn-sm btn-warning me-1"
                  onClick={() => handleEdit(t)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(t._id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length > 6 && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary">Explore More</button>
        </div>
      )}

      {showModal && editData && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header border-0 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <HiOutlineChatAlt2 className="text-primary-custom me-2 fs-4" />
                    <h5 className="modal-title text-dark mb-0">Edit Testimonial</h5>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Feedback</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={editData.feedback}
                      onChange={(e) =>
                        setEditData({ ...editData, feedback: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-control"
                      value={editData.gender}
                      onChange={(e) =>
                        setEditData({ ...editData, gender: e.target.value })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListTestimonials;
