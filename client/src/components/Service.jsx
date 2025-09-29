import React, { useState, useEffect } from 'react';
import './Service.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: 'bi-person-badge',
    title: 'የጡረታ የፋይናንስ እቅድ',
    description: 'ቁጠባዎን፣ ኢንቨስትመንቶችዎን እና ወጪዎችዎን ለማስተዳደር እንዲችሉ ግላዊ የፋይናንስ እቅድ እንዲፈጥሩ እንረዳዎታለን፣ ይህም የተረጋጋና ምቹ ጡረታን ያረጋግጣል።',
  },
  {
    icon: 'bi-search',
    title: 'የሥራ ሽግግር መመሪያ',
    description: 'ጡረታ ከወጡ በኋላ ከችሎታዎ እና ከፍላጎቶችዎ ጋር የሚጣጣሙ የትርፍ ጊዜ ሥራዎችን፣ የፍሪላንስ ሥራዎችን ወይም አዲስ ንግድ ለመጀመር የባለሙያ ምክር ያግኙ።',
  },
  {
    icon: 'bi-calendar-check',
    title: 'የጤና እና ደህንነት ስልጠና',
    description: 'የአካል እና የአእምሮ ጤንነትዎን ለመጠበቅ የሚያስችሉ ስልቶችን ይማሩ፣ ይህም የአካል ብቃት እንቅስቃሴዎችን፣ የአመጋገብ ምክሮችን እና የጭንቀት መቆጣጠሪያ ዘዴዎችን ያካትታል።',
  },
  {
    icon: 'bi-award',
    title: 'የሥራ ፈጠራ ሥልጠና',
    description: 'ጡረተኞችን ታሳቢ በማድረግ በተዘጋጁት የሥራ ፈጠራ አውደ ጥናቶች አማካኝነት ፍላጎቶችዎን ትርፋማ ወደሆኑ ሥራዎች እንዴት መቀየር እንደሚችሉ ይወቁ።',
  },
  {
    icon: 'bi-people',
    title: 'ማኅበራዊ እና ማኅበረሰብ ተሳትፎ',
    description: 'ከማኅበረሰብዎ ጋር የተገናኙ እና ንቁ ሆነው እንዲቆዩ የሚያስችሉ የበጎ ፈቃደኝነት እና ማኅበራዊ እንቅስቃሴዎች ዕድሎችን ያስሱ።',
  },
  {
    icon: 'bi-envelope',
    title: 'ግላዊ የምክር አገልግሎት',
    description: 'ልዩ የጡረታ ግቦችዎን እና ተግዳሮቶችዎን ለመፍታት አንድ ለአንድ ድጋፍ ያግኙ፣ ይህም ከጡረታ በኋላ አርኪ ሕይወት እንዲፈጥሩ ይረዳዎታል።',
  },
];

const Service = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div id="services-container ">
      <div className="container mt-5 pt-3 ">
        <div className="text-center my-4" data-aos="fade-down">
          <h2 className="d-inline-flex align-items-center justify-content-center">
            <span
              className="bg-primary-custom me-2"
              style={{
                borderRadius: '50px',
                width: '30px',
                height: '3px',
                display: 'inline-block',
              }}
            ></span>
           አገልግሎቶቻችን
          </h2>
        </div>

        <div className="row mt-3">
          {services.map((service, index) => {
            const isHovered =
              hoveredIndex === index || (index === 1 && hoveredIndex === null);
            return (
              <div
                key={index}
                className="col-md-6 col-lg-4 mb-4 d-flex"
                data-aos="zoom-out"
                data-aos-delay={index * 100}
              >
                <div
                  className={`card service-card w-100 ${
                    isHovered ? 'hovered-card' : ''
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="card-body text-center">
                    <i
                      className={`bi ${service.icon} ${
                        isHovered ? 'text-white' : 'text-primary-custom'
                      }`}
                      style={{ fontSize: isHovered ? '50px' : '30px' }}
                    ></i>
                    <h5 className="card-title mt-3">{service.title}</h5>
                    <div
                      className={`border-bottom mb-2 ${
                        isHovered ? 'border-white' : ''
                      }`}
                    ></div>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
