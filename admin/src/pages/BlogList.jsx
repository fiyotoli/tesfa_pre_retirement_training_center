import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaEdit, FaTrash, FaBlog } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const BlogList = ({ token }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/blog/list`);
      if (response.data.success) {
        setBlogs(response.data.blogs);
      } else {
        toast.error(response.data.message || 'Failed to load blogs');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  try {
    const response = await axios.post(`${backendUrl}/api/blog/remove`, { id }, {
      headers: { token }
    });
    if (response.data.success) {
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } else {
      toast.error(response.data.message || "Failed to delete blog");
    }
  } catch (error) {
    toast.error(error.message || "Error deleting blog");
  }
};


  const handleEdit = (blog) => {
    setEditData({ ...blog });
    setShowModal(true);
    setImage(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editData).forEach((key) => formData.append(key, editData[key]));
      formData.append('id', editData._id);
      if (image) formData.append('image1', image);

      const res = await axios.post(`${backendUrl}/api/blog/edit`, formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success('Blog updated successfully');
        setShowModal(false);
        setEditData(null);
        fetchBlogs();
      } else {
        toast.error(res.data.message || 'Failed to update blog');
      }
    } catch (err) {
      toast.error('Error updating blog');
    }
  };

  if (loading) return <p className="text-center my-5">Loading blogs...</p>;
  if (error) return <p className="text-danger text-center my-5">{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary-custom d-flex justify-content-center align-items-center gap-2">
        <FaBlog /> List of Blogs
      </h2>
      <div className="row">
        {blogs.slice(0, 6).map((blog) => (
          <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border border-light-subtle">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="card-img-top"
                  style={{ height: '300px',width:'100%', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column ">
                <h5 className="card-title text-capitalize ">
                  {blog.title.split(' ').slice(0, 6).join(' ')}
                  {blog.title.split(' ').length > 6 && '...'}
                </h5>
                <span className='border-bottom border-dark my-2 '></span>
                <p className="card-text flex-grow-1">
                  <FaBookOpen className="me-2 text-primary-custom" />
                  {blog.content.length > 100
                    ? `${blog.content.substring(0, 100)}...`
                    : blog.content}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn bg-primary-custom text-white btn-sm"
                    style={{ transition: 'all 0.3s' }}
                  >
                    Read More
                  </Link>
                 <div className="d-flex gap-2">
    <button
      className="btn btn-sm btn-warning"
      onClick={() => handleEdit(blog)}
      title="Edit"
      type="button"
    >
      <FaEdit />
    </button>
    <button
      className="btn btn-sm btn-danger"
      onClick={() => handleDelete(blog._id)}
      title="Delete"
      type="button"
    >
      <FaTrash />
    </button>
  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length > 6 && (
        <div className="text-center mt-4">
          <Link to="/blog_list" className="btn btn-outline-primary">Explore More</Link>
        </div>
      )}

      {showModal && editData && (
        <div className="modal show d-block bg-dark bg-opacity-75" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content bg-light text-light">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header border-0 d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center">
    <FaEdit className="text-primary-custom me-2 fs-4" />
    <h5 className="modal-title text-dark mb-0">Edit Blog</h5>
  </div>
  <button
    type="button"
    className="btn-close"
    onClick={() => setShowModal(false)}
  ></button>
</div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">Title</label>
                    <input
                      id="editTitle"
                      type="text"
                      className="form-control"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editContent" className="form-label">Content</label>
                    <textarea
                      id="editContent"
                      className="form-control"
                      rows="5"
                      value={editData.content}
                      onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDate" className="form-label">Date</label>
                    <input
                      id="editDate"
                      type="date"
                      className="form-control"
                      value={editData.date ? editData.date.slice(0, 10) : ''}
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editSocialMediaLink" className="form-label">Social Media Link</label>
                    <input
                      id="editSocialMediaLink"
                      type="url"
                      className="form-control"
                      value={editData.socialMediaLink || ''}
                      onChange={(e) => setEditData({ ...editData, socialMediaLink: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editImage" className="form-label">Upload Image</label>
                    <input
                      id="editImage"
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="submit" className="btn btn-success">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
