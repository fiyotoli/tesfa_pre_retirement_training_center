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
           ሰራተኞች ከስራ ህይወት ወደ የጡረታ ህይወት በሚያደርጉት ሽግግር ሂደት ሊያጋጥማቸው የሚችል
ኢኮኖሚያዊ፣ ሥነ-ልቦናዊ፣ እና ማህበራዊ ፈተናዎችን እንዲቋቋሙ ለማስቻል የቅድመ ጠረታና የድህረ
ጡረታ የሥልጠና መድረኮችን አዘጋጅቶ ስልጠና መስጠት፣ አቅም መገንባት፣ የምክር አገልግሎት መስጠት።   </p>
          </div>

          {/* Vision */}
          <div className="mb-4">
            <h5 className="d-flex align-items-center">
              <FaLightbulb className="me-2 text-primary-custom fw-bold"  />ራዕይ 
            </h5>
            <p className="text-muted mb-0">
             ጡረተኞች በአዲሱ የህይወት ምዕራፋቸው ስኬታማ፣ ተደሳችና ፋይዳ ያለው ኑሮ እንዲመሩ
የሚያስችል ዕውቀትና ብቃት የሚያጎናጽፍ መሪ የስልጠና ተቋም መሆን።
 </p>
          </div>

         {/* Values */}
<div className="mb-4">
  <h5 className="d-flex align-items-center">
    <FaHandshake className="me-2 text-primary-custom" />እሴቶች
  </h5>

  <ul className="list-group list-group-flush text-muted">
    <li className="list-group-item">
      የለውጥ ድጋፍ (Transition Support): ከሥራ ሕይወት ወደ ጡረታ የሚደረገውን ሽግግር በዕውቀትና በልበ ሙሉነት መደገፍ።
    </li>
    <li className="list-group-item">
      ሙሉአዊ ዝግጅት (Holistic Preparation): የፋይናንስ፣ የጤና እና የማኅበራዊ ሕይወት ዘርፎችን ያካተተ ሁለንተናዊ ዝግጅትን ማረጋገጥ።
    </li>
    <li className="list-group-item">
      የጡረተኞች ክብር (Retiree Dignity): ለእያንዳንዱ ተሳታፊ ክብርና አክብሮት መስጠት እንዲሁም የነቃ ተሳትፎውን ማበረታታት።
    </li>
    <li className="list-group-item">
      ተጨባጭ ዕውቀት (Practical Knowledge): በጡረታ ሕይወት ውስጥ አስፈላጊና ተግባራዊ የሆኑ ክህሎቶችንና መረጃዎችን ማቅረብ።
    </li>
    <li className="list-group-item">
      ዘላቂ ፋይዳ (Lasting Impact): በሥልጠናው ምክንያት ረዥም ጊዜ የሚዘልቅ ስኬታማና ተደሳች የጡረታ ሕይወትን ማጎናጸፍ።
    </li>
  </ul>
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