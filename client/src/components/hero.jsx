import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero from '../assets/hero.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div id="hero-container" className="container-fluid bg-white mt-5 pt-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section: Text */}
          <div
            className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0 mt-5 mt-md-5 mt-lg-0"
            data-aos="fade-up"
          >
            <h3 className="display-3 fw-bold ">
              <span className="text-dark ">ተስፋ የቅድመ ጡረታ </span>
              <span className="text-primary-custom ">ማሰልጠኛ ማዕከል!</span>
            </h3>
            <p className="lead mt-3">
              ጡረታ ማለት የሕይወት ምዕራፍ መቀየር እንጂ ስራ ማቆም አይደለም! እንኳን ወደ ተስፋ ቅድመ ጡረታ ስልጠና ማዕከል እና የሲንየር ባለሙያዎች የሥራ ማገናኛ ድረ-ገጽ በደህና መጡ!
            </p>
            <Link to="/register" className="btn btn-lg text-white bg-primary-custom mt-2">
              ይመዝገቡ
            </Link>
          </div>

          {/* Right Section: Image */}
          <div className="col-12 col-md-6 text-center" data-aos="fade-left">
            <img
              src={hero}
              alt="Employee Portal Advert"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
