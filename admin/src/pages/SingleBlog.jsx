// SingleBlog.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaExternalLinkAlt, FaBlog, FaFilePdf } from 'react-icons/fa';
import { backendUrl } from '../App';

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
          setRelatedBlogs(filtered.slice(0, 5));
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

  const contentLength = blog.content.length;
  const partLength = Math.ceil(contentLength / 3);
  const rawParagraphs = [
    blog.content.slice(0, partLength),
    blog.content.slice(partLength, partLength * 2),
    blog.content.slice(partLength * 2),
  ];
  const paragraphs = rawParagraphs.filter(p => p.trim().length > 0);

  const handleExploreClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="container mt-5 mb-2">
      <Link to="/blog_list" className="btn text-white bg-primary-custom mb-4">&larr; Back to Blogs</Link>

      {/* Blog Main Section */}
      <div className="row mb-5">
        {/* Left: Image, File, Social Link */}
        <div className="col-md-4">
          {blog.image && (
            <div className="p-2 rounded mb-3" style={{ boxShadow: '0 0 20px rgba(44, 168, 166,.6)' }}>
              <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid rounded"
                style={{ objectFit: 'cover', width: '100%', maxHeight: '300px' }}
              />
            </div>
          )}

          {/* Display PDF / File */}
          {blog.file && (
            <div className="mb-3">
              <h6 className="fw-bold">Attached File:</h6>
              <a
                href={`${backendUrl}${blog.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn custom-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <FaFilePdf /> View File
              </a>
            </div>
          )}

          <hr />

          {blog.socialMediaLink && (
            <div className="mt-3">
              <h6 className="fw-bold">Follow or learn more:</h6>
              <a
                href={blog.socialMediaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn custom-outline-primary mt-2 w-100"
              >
                Social Media Link <FaExternalLinkAlt className="ms-2 text-primary-custom" />
              </a>
            </div>
          )}
        </div>

        {/* Right: Text Content */}
        <div className="col-md-8">
          <h2 className="fw-bold mb-3 text-capitalize">{blog.title}</h2>

          <div className="text-muted mb-4 d-flex align-items-center gap-2">
            <FaCalendarAlt className="text-primary-custom" />
            <small>{new Date(blog.date).toLocaleDateString()}</small>
          </div>

          <div className="lead">
            {paragraphs.map((para, index) => (
              <p key={index} className="mb-3">{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Other Blogs */}
      <div className="row">
        <div className="col-md-12">
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FaBlog className="text-primary-custom" />
            <span>Other Blogs</span>
          </h5>
          <div className="row">
            {relatedBlogs.length === 0 && (
              <p className="text-muted">No related blogs</p>
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
                      className="btn btn-sm custom-outline-primary w-100 mt-auto"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
