import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaExternalLinkAlt, FaBlog, FaFileAlt } from 'react-icons/fa';

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Scroll to top when blog ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.post(`${backendUrl}/api/blog/single`, { blogId: id });
        if (res.data.success) {
          setBlog(res.data.blog);
        } else {
          setError('Blog not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching blog.');
      }
    };

    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blog/list`);
        if (res.data.success) {
          const filtered = res.data.blogs.filter(b => b._id !== id);
          setRelatedBlogs(filtered.slice(0, 6)); // show only 6 blogs
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    fetchAllBlogs();
  }, [id]);

  if (loading) return <p className="text-center my-5">Loading blog...</p>;
  if (error) return <p className="text-danger text-center my-5">{error}</p>;
  if (!blog) return null;

  const handleExploreClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="container mb-2 mt-5 pt-5">
      <Link to="/blog_list" className="btn view-detail-button mb-4 mt-2">
        &larr; ወደ ብሎግ ተመለስ
      </Link>

      {/* Blog Main Section */}
      <div className="mb-5">
        {blog.image && (
          <div
            className="p-2 rounded mb-3"
            style={{ boxShadow: '0 0 20px rgba(25, 45, 61,.8)' }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid rounded"
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          </div>
        )}

        <hr />

        {blog.socialMediaLink && (
          <div className="mt-3">
            <h6 className="fw-bold">ለበለጠ ዝርዝር</h6>
            <a
              href={blog.socialMediaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn view-detail-button mt-2 d-inline-block"
            >
              ለበለጠ ሊንኩን ተጭነው ይመልከቱ
              <FaExternalLinkAlt className="ms-2 text-primary-custom" />
            </a>
          </div>
        )}

        {/* Google Drive Document Link */}
        {blog.googleDriveLink && (
          <div className="mt-3">
            <h6 className="fw-bold">Google Drive Document</h6>
            <a
              href={blog.googleDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn view-detail-button mt-2 d-inline-flex align-items-center gap-2"
            >
              <FaFileAlt className="text-primary-custom" />
              የጉግል ዶክመንት ተመልከቱ
            </a>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="col-md-10 mb-5">
        <h2 className="fw-bold mb-3 text-capitalize">{blog.title}</h2>

        <div className="text-muted mb-4 d-flex align-items-center gap-2">
          <FaCalendarAlt className="text-primary-custom" />
          <small>{new Date(blog.date).toLocaleDateString()}</small>
        </div>

        <div className="lead">
          <p className="mb-3">{blog.content}</p>
        </div>
      </div>

      {/* Other Blogs */}
      <div className="row">
        <div className="col-md-12">
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FaBlog className="text-primary-custom" />
            <span>ሌሎች ብሎጎች</span>
          </h5>
          <div className="row">
            {relatedBlogs.length === 0 && (
              <p className="text-muted">ምንም ተዛማጅ ብሎጎች የሉም</p>
            )}
            {relatedBlogs.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4 mb-3">
                <div className="card shadow-sm h-100">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-img-top"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body p-2 d-flex flex-column justify-content-between">
                    <h6 className="card-title text-capitalize mb-2">
                      {item.title.split(' ').slice(0, 5).join(' ')}
                      {item.title.split(' ').length > 5 && '...'}
                    </h6>
                    <button
                      onClick={() => handleExploreClick(item._id)}
                      className="btn btn-sm view-detail-button w-100 mt-auto"
                    >
                      ዝርዝሮችን ይመልከቱ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore More Button */}
          <div className="text-center mt-4">
            <Link to="/blog_list" className="btn view-detail-button">
              ተጨማሪ ብሎጎችን ይመልከቱ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
