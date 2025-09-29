import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaBlog } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  if (loading) return <p className="text-center my-5">Loading blogs...</p>;
  if (error) return <p className="text-danger text-center my-5">{error}</p>;

  return (
    <div className="container my-5 pt-5">
      <h2 className="text-center mt-4 mb-2 text-primary-custom d-flex justify-content-center align-items-center gap-2">
        <FaBlog /> የቅርብ ጊዜ ብሎጎች
      </h2>
      <p className="text-center text-muted mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        ከስፋ የቅድመ ጡረታ ማሰልጠኛ ማዕከል ሥልጠና ፕሮግራሞች አዳዲስ ዜናዎችን ፣ እውቀቶችንና ዝማኔዎችን ያግኙ።
      </p>

      <div className="row g-4">
        {blogs.slice(0, 6).map((blog) => (
          <div key={blog._id} className="col-md-6 col-lg-4 d-flex">
            <div className="card h-100 shadow-sm border border-light-subtle d-flex flex-column">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="card-img-top"
                  style={{ height: '350px', width: '100%', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-capitalize">
                  {blog.title.split(' ').slice(0, 6).join(' ')}
                  {blog.title.split(' ').length > 6 && '...'}
                </h5>
                <span className="border-bottom border-dark my-2"></span>
                <p className="card-text flex-grow-1">
                  <FaBookOpen className="me-2 text-primary-custom" />
                  {blog.content.length > 100
                    ? `${blog.content.substring(0, 100)}...`
                    : blog.content}
                </p>
                <div className="d-flex justify-content-start mt-auto">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn view-detail-button btn-sm"
                    style={{ transition: 'all 0.3s' }}
                  >
                    ዝርዝሮችን ይመልከቱ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More */}
      {blogs.length > 6 && (
        <div className="text-center mt-4">
          <Link to="/blog_list" className="btn btn-outline-primary">
            Explore More
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogList;
