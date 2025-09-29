import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBullseye, FaLightbulb, FaHandshake } from 'react-icons/fa';
import about from '../assets/about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container px-3 pt-5 pb-1 ">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-md-6 order-sm-1 order-2" data-aos="zoom-in">
          <img 
            src={about}
            alt="About Illustration" 
            className="img-fluid"
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6 order-sm-2 order-1" data-aos="fade-left">
          <h2 className="mb-4">ስለ እኛ</h2>

          {/* Mission */}
          <div className="mb-4">
            <h5 className="d-flex align-items-center">
              <FaBullseye className="me-2 text-primary-custom fw-bold" />ተልዕኮ 
            </h5>
            <p className="text-muted mb-0">
             ከጡረታ በፊትና በኋላ ለሚገኙ ዜጎች ሙያዊ ክህሎቶችንና የአኗኗር ዘይቤ ምክሮችን በመስጠት፣ ቀጣይነት ያለው የሥራ ተሳትፎና ግላዊ እርካታ እንዲያገኙ መርዳት፤ ይህንም በዘመናዊ የኦንላይን ሥልጠናና በውጤታማ የሥራ ማገናኛ አገልግሎት ማሳካት።   </p>
          </div>

          {/* Vision */}
          <div className="mb-4">
            <h5 className="d-flex align-items-center">
              <FaLightbulb className="me-2 text-primary-custom fw-bold"  />ራዕይ 
            </h5>
            <p className="text-muted mb-0">
              ጡረታን የዕድገትና የፈጠራ ምዕራፍ በማድረግ፣ የእያንዳንዱን ዜጋ ልምድና እውቀት ለሀገር ልማት የሚውልበትን ምቹ ሥነ-ምህዳር መፍጠር።  </p>
          </div>

          {/* Values */}
          <div className="mb-4">
            <h5 className="d-flex align-items-center">
              <FaHandshake className="me-2 text-primary-custom" />እሴቶች 
            </h5>
            <p className="text-muted mb-0">
             የእያንዳንዱን ግለሰብ የረጅም ዓመታት ልምድና እውቀት ከፍ ያለ ግምት በመስጠት፣ ለቀጣይ ትውልድ እንዲተላለፍ እና ለሀገር ዕድገት እንዲውል ማገዝ።      </p>
          </div>

          {/* CTA Button */}
          <Link to="/about" className="btn bg-primary-custom text-white mt-3">
           ቡድናችንን ያግኙ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;