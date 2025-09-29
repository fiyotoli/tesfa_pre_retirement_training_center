import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { FaQuoteLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import maleAvatar from '../assets/male_avatar.png';
import femaleAvatar from '../assets/female-avatar.png';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    axios
      .get(`${backendUrl}/api/testimonials/all`)
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error('Failed to fetch testimonials:', err));
  }, []);

  const getAvatar = (gender) =>
    gender === 'Male' ? maleAvatar : femaleAvatar;

  // Group testimonials in sets of 3
  const chunkedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    chunkedTestimonials.push(testimonials.slice(i, i + 3));
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-4" data-aos="fade-left">
  <h2
    className="d-inline-flex align-items-center justify-content-center"
    style={{ whiteSpace: 'nowrap' }} // prevent wrapping
  >
    <span
      className="bg-primary-custom me-2"
      style={{
        borderRadius: '50px',
        width: '30px',
        height: '3px',
        display: 'inline-block',
      }}
    ></span>
    የሥልጠናው ተሳታፊዎች አስተያየት
  </h2>
</div>


      <Carousel
        ref={carouselRef}
        indicators={false}
        controls={false}
        interval={5000}
      >
        {chunkedTestimonials.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="row" data-aos="fade-up">
              {group.map((testimonial, i) => (
                <div
                  className="col-lg-4 col-md-6 mb-4"
                  key={testimonial._id || i}
                >
                  <div
                    className="card h-100 shadow-sm"
                    data-aos="zoom-in"
                    data-aos-delay={`${i * 100}`}
                  >
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <FaQuoteLeft className="text-primary-custom display-5 mb-3" />
                        {/* Equal-height feedback section */}
                     <p
  className="card-text mb-3 text-capitalize"
  style={{
    minHeight: '120px',          // ensures equal height for all cards
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
  }}
>
  {testimonial.feedback.length > 150
    ? testimonial.feedback.substring(0, 150) + '…'
    : testimonial.feedback}
</p>

                      </div>

                      <div>
                        <hr className="border-black" />
                        <img
                          src={getAvatar(testimonial.gender)}
                          alt={testimonial.name}
                          className="rounded-circle mb-3"
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                        />
                        <h5 className="card-title text-capitalize">
                          {testimonial.name}
                        </h5>
                        <p className="text-muted mb-0 text-capitalize">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom Carousel Controls */}
      <div className="d-flex justify-content-center mt-4" data-aos="fade-up">
        <button
          className="btn bg-primary-custom rounded shadow me-2"
          style={{ width: '50px', height: '50px' }}
          onClick={() => carouselRef.current.prev()}
        >
          <i className="bi bi-box-arrow-left text-white" />
        </button>
        <button
          className="btn bg-primary-custom rounded shadow"
          style={{ width: '50px', height: '50px' }}
          onClick={() => carouselRef.current.next()}
        >
          <i className="bi bi-box-arrow-right text-white" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
