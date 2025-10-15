import React, { useEffect, useState } from 'react';
import './Service.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBrain } from 'react-icons/fa'; // Professional psychology icon

const services = [
  {
    icon: 'bi-cash-stack',
    title: 'የፋይናንስ እና የሀብት ማኔጅመንት ዝግጅት',
    description: `ይህ የሥልጠና ክፍል ጡረተኞች ፋይናንሳዊ ነፃነትና መረጋጋት እንዲያገኙ የሚያስችል ወሳኝ ምሰሶ ነው።`,
    formore: `• የጡረታ ገቢ እቅድ ማውጣት  
• የገንዘብ ፍሰት ማስተዳደር  
• የኢንቨስትመንት አማራጮች  
• የሀብት ጥበቃ`
  },
  {
    icon: <FaBrain />,
    title: 'ሥነ-ልቦናዊና ማኅበራዊ ዝግጅት',
    description: `ጡረታ ከገንዘብ ለውጥ በላይ ነው፤ የሕይወት ዘይቤና የማንነት ለውጥም ጭምር ነው።`,
    formore: `• የማንነት እና የጊዜ አጠቃቀም መቋቋም  
• ጤናማ ማኅበራዊ ትስስር  
• ውጥረትን መቆጣጠር  
• ጡረታን የግል እርካታ ዘመን መሆን`
  },
  {
    icon: 'bi-heart-pulse',
    title: 'ጤና እና ደህንነት (Wellbeing)',
    description: `ጤና የደስታና የስኬታማ ጡረታ መሠረት ነው።`,
    formore: `• ንቁና ጤናማ ሕይወት  
• የአእምሮ ጤንነትን መጠበቅ  
• የእድሜ መግፋት መከላከል  
• በደስታ መኖር`
  },
  {
    icon: 'bi-person-lines-fill',
    title: 'ድኅረ-ጡረታ ድጋፍና ምክክር',
    description: `ሥልጠናው በቅድመ-ጡረታ ዝግጅት አያበቃም፤ የሕይወት ለውጦች በጡረታ መጀመሪያ ዓመታትም ሊገጥሙ ስለሚችሉ፣ የእኛ ማዕከል ተከታታይ ድጋፍ ይሰጣል።`,
    formore: `• የፋይናንስ ምክክር  
• የማኅበራዊ ትስስር መጠንከር  
• የሕይወት ደስታና መረጋጋት`
  },
  {
    icon: 'bi-lightbulb',
    title: 'የአዲስ ሥራ ፈጠራና ዕድል ፍለጋ',
    description: `ጡረታ የሥራ ሕይወት መጨረሻ ሳይሆን አዲስ የፈጠራና የኢኮኖሚ ዕድል መጀመሪያ ሊሆን ይችላል።`,
    formore: `• አዲስ የንግድ ሀሳቦች  
• የልምድ ተሞክሮን ወደ ገቢ መቀየር  
• ሙያዊ ምክር`
  }
];

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const hoverColor = '#814516';

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleShowMore = (service) => {
    setSelectedService(service);
  };

  const handleClose = () => {
    setSelectedService(null);
  };

  return (
    <div id="services-container">
      <div className="container mt-5 pt-3">
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
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                className="col-md-6 col-lg-4 mb-4 d-flex"
                data-aos="zoom-out"
                data-aos-delay={index * 100}
              >
                <div
                  className="card service-card w-100 d-flex flex-column"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: isHovered ? hoverColor : '#fff',
                    color: isHovered ? '#fff' : '#000',
                    height: '100%',
                  }}
                >
                  <div className="card-body text-center d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      <div className="mb-3">
                        {typeof service.icon === 'string' ? (
                          <i
                            className={`bi ${service.icon}`}
                            style={{
                              fontSize: isHovered ? '50px' : '30px',
                              color: isHovered ? '#fff' : hoverColor,
                              transition: 'all 0.3s ease',
                            }}
                          ></i>
                        ) : (
                          React.cloneElement(service.icon, {
                            size: isHovered ? 50 : 30,
                            color: isHovered ? '#fff' : hoverColor,
                          })
                        )}
                      </div>
                      <h5
                        className="card-title mt-2"
                        style={{
                          color: isHovered ? '#fff' : hoverColor,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {service.title}
                      </h5>
                      <div
                        className="border-bottom mb-2"
                        style={{
                          borderColor: isHovered ? '#fff' : hoverColor,
                          transition: 'all 0.3s ease',
                        }}
                      ></div>
                      <p className="card-text">{service.description}</p>
                    </div>
                    <button
                      className="btn mt-3"
                      style={{
                        backgroundColor: isHovered ? '#fff' : hoverColor,
                        color: isHovered ? hoverColor : '#fff',
                        border: `1px solid ${hoverColor}`,
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => handleShowMore(service)}
                    >
                      For More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Popup Modal */}
        {selectedService && (
          <div
            className="modal show fade d-block"
            tabIndex="-1"
            role="dialog"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content p-3">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold" style={{ color: hoverColor }}>
                    {selectedService.title}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleClose}></button>
                </div>
                <div className="modal-body">
                  <p style={{ whiteSpace: 'pre-line' }}>{selectedService.formore}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;
