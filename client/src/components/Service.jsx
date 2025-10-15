import React, { useEffect, useState } from 'react';
import './Service.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBrain } from 'react-icons/fa'; // Professional psychology icon

const services = [
  {
    icon: 'bi-cash-stack',
    title: 'የፋይናንስ እና የሀብት ማኔጅመንት ዝግጅት፡ አስተማማኝ ነገን መፍጠር',
    description: `ይህ የሥልጠና ክፍል ጡረተኞች ፋይናንሳዊ ነፃነትና መረጋጋት እንዲያገኙ የሚያስችል ወሳኝ ምሰሶ ነው።
ትኩረታችን ተሳታፊዎች ከወዲሁ (ጡረታ ሳይወጡ) አስተማማኝ የፋይናንስ አቋም እንዲኖራቸው በማስቻል፣
በጡረታ ሕይወታቸው ገንዘባቸውን በብቃት እንዲያስተዳድሩ የሚያስችላቸውን ተግባራዊ ዕውቀትና ክህሎት
ማጎናጸፍ ላይ ነው።
በሥልጠናው ጡረታን እንደ እረፍት ጊዜ እንጂ እንደ የገንዘብ ቀውስ ምንጭ እንዳይመለከቱት እናደርጋለን።`,
    formore: `• የጡረታ ገቢ እቅድ ማውጣት። 
• የጡረታ ገቢ እቅድ ማውጣት እና የገንዘብ ፍሰት ማስተዳደር:ጡረታ ከወጡ በኋላ የሚያስፈልጋቸውን ወርሃዊ ወጪ በትክክል እንዲያሰሉ እና ትክክለኛ የበጀት እቅድ እንዲያወጡ እናስችላለን።
• ከጡረታ ፈንድ፣ ከኪራይ ወይም ከሌሎች ምንጮች የሚመጣውን ገቢ ከወጪያቸው ጋር በማነጻጸር የገንዘብ ፍሰት (Cash Flow) በትክክል ማስተዳደርን እናስጨብጣለን። 
• የኢንቨስትመንት አማራጮች፣ የቁጠባ ስልቶች እና የሀብት ጥበቃ:ጡረታ ከወጡ በኋላም ቢሆን ሀብታቸውን የሚያሳድጉበትን አስተማማኝ የኢንቨስትመንት (ለምሳሌ የአጭርና የረዥም ጊዜ የንግድ ሥራ፣ ቦንድ ወይም ሌላ ንብረት) አማራጮችን እናስተዋውቃለን።
• ቀደም ብለው ያጠራቀሙትን ሀብት ከዋጋ ንረት (Inflation) እና ከማይጠበቁ አደጋዎች እንዴት መጠበቅ እንደሚችሉ እናሠለጥናለን።`
  },
  {
    icon: <FaBrain />,
    title: 'ሥነ-ልቦናዊና ማኅበራዊ ዝግጅት፡ ሙሉ ማንነትዎን ማዘጋጀት',
    description: `ጡረታ ከገንዘብ ለውጥ በላይ ነው፤ የሕይወት ዘይቤና የማንነት ለውጥም ጭምር ነው።
ይህ የሥልጠና ክፍል ተሳታፊዎች በሥነ-ልቦና ተረጋግተው፣ ማኅበራዊ ትስስራቸውን አጠናክረውና አዲስ
ትርጉም ባለው መንገድ እንዲኖሩ ለማብቃት ተዘጋጅቷል። በሥልጠናችን፣ ለውስጣዊ ሰላምዎና ለማኅበራዊ
ደኅንነትዎ ቁልፍ የሆኑትን ጉዳዮች ላይ እናተኩራለን።`,
    formore: `• የማንነትና የጊዜ አጠቃቀምን መቋቋም: ከሥራ መቋረጥ ጋር ተያይዞ የሚመጣውን የማንነት ለውጥ እና በድንገት የሚያገኙትን ነፃ ጊዜ በአግባቡ የመጠቀም ግንዛቤ እናስጨብጣለን። ነፃ ጊዜዎን ወደ ትርጉም ያለውና አዎንታዊ ተግባራት እንዲለውጡ እናስችላለን። 
• ጤናማ ማኅበራዊ ትስስር መፍጠርና ማስቀጠል: ከቤተሰብ፣ በተለይም ከትዳር አጋርና ከልጆች ጋር ጤናማና ፍሬያማ ግንኙነት ለመፍጠር የሚያስችል አቅጣጫ እናመላክታለን። በተጨማሪም አዲስ የማኅበረሰብ ተሳትፎዎችን እንዴት ማጠናከር እንደሚችሉ እንደግፋለን።
• ውጥረትን መቆጣጠርና በራስ መተማመንን ማሳደግ: በጡረታ ሊመጡ የሚችሉ ውጥረቶችን (ጭንቀቶችን) ውጤታማ በሆነ መንገድ እንዴት መቆጣጠር እንደሚቻል እናሠለጥናለን። በራስዎ ያለዎትን መተማመን በማሳደግ፣ አዲሱን የሕይወት ምዕራፍዎን በደስታና በልበ ሙሉነት እንዲመሩ እናግዛለን።  
• በዚህ ሥልጠና፣ ጡረታ የብቸኝነትና የጭንቀት ምንጭ ሳይሆን፣ የግል እርካታና የማኅበራዊ መሻሻል ዘመን እንዲሆን እናዘጋጅዎታለን።`
  },
  {
    icon: 'bi-heart-pulse',
    title: 'ጤና እና ደህንነት (Wellbeing)',
    description: `ጤና የደስታና የስኬታማ ጡረታ መሠረት ነው። ይህ የስልጠና ክፍል ተሳታፊዎች በጡረታ ዘመናቸው በአካልም
ሆነ በአእምሮ ንቁና ጤናማ ሆነው እንዲቆዩ የሚያስችላቸውን ተግባራዊ ዕውቀት እና ዘላቂ ልማዶች
እናስጨብጣለን።`,
    formore: `• በጡረታ ወቅት ንቁና ጤናማ ሕይወትን ለመምራት የሚያስችሉ የአመጋገብና የአካል ብቃት ምክሮች፡ ለጡረታ ዕድሜ ተስማሚ የሆኑ እና ጉልበት የሚሰጡ የአመጋገብ ልማዶችን እናስተዋውቃለን።  
• የተለያዩ የአካል ብቃት እንቅስቃሴዎችን በመለማመድ፣ የመገጣጠሚያ ህመሞችንና የልብና የደም ዝውውር ችግሮችን መከላከልን እናስችላለን።
•ጤንነትን በቋሚነት መከታተል እና አስፈላጊውን የሕክምና ድጋፍ በወቅቱ ማግኘት እንለምዳለን።  
• የአእምሮ ጤንነትን ለመጠበቅ የሚረዱ እንደ ማንበብ፣ አዲስ ነገር መማር፣ ወይም የትርፍ ጊዜ ማሳለፊያዎች ላይ መሳተፍን የመሳሰሉ ጠቃሚ እንቅስቃሴዎችን እናበረታታለን።
• የተለመዱትን የእድሜ መግፋት በሽታዎችን የመከላከል እና የሕይወት ጥራትን የማሻሻል ዘዴዎችን እናስጨብጣለን።
• የመዝናናት እና የአእምሮ ሰላም ማግኘት (Stress Management) ስልቶችን እናሠለጥናለን።
• የእርጅናን ሂደት በአዎንታዊነት መቀበልና በደስታ መኖር፡እርጅናን እንደ መማርና ዕድገት ቀጣይ ምዕራፍ በመመልከት፣ በእድሜ መግፋት የሚመጡ ለውጦችን በፈገግታና በልበ ሙሉነት መቀበልን እናብቃለን።
• ላለፉት ስኬቶች አመስጋኝ በመሆንና ወደፊት በሚመጣው ላይ በማተኮር በደስታ የተሞላ ሕይወት መምራት እንዲችሉ እንደግፋለን።
• ይህ የስልጠና ክፍል ተሳታፊዎች ረጅም ዕድሜን ከጥሩ ጤንነት ጋር እንዲያጣጥሙ ይረዳቸዋል።`
  },
  {
    icon: 'bi-person-lines-fill',
    title: 'ድኅረ-ጡረታ ድጋፍና ምክክር፡ የእርምጃዎ ቀጣይ ደጋፊ',
    description: `ሥልጠናው በቅድመ-ጡረታ ዝግጅት አያበቃም፤ የሕይወት ለውጦች በጡረታ መጀመሪያ ዓመታትም ሊገጥሙ
ስለሚችሉ፣ የእኛ ማዕከል ጡረታ ከወጡ በኋላም እርምጃዎትን የሚደግፍ ተከታታይ ድጋፍ ይሰጣል። በዚህ
ድጋፍ፣ ተሳታፊዎች ጡረታን በልበ ሙሉነትና በተስፋ መምራት እንዲችሉ እናስችላለን።`,
    formore: `• የማያቋርጥ ድጋፍ፡ የፋይናንስና የሥነ-ልቦና ምክክር።
•ጡረታ ከወጡ በኋላ ባሉት ወሳኝ ጊዜያት፣ የጡረታ ገቢ እቅዳቸው በሥራ ላይ ሲውል የሚገጥማቸውን የፋይናንስ ጥያቄዎች ወይም ያልተጠበቁ ውሳኔዎችን ለመወሰን ተጨባጭ ምክር እንሰጣለን።
• ከጡረታ ጋር ተያይዞ የሚመጣ ማንኛውንም የሥነ-ልቦናዊ ጫና ወይም የመላመድ ፈተና በማማከር በፍጥነት እንዲያሸንፉ እንደግፋለን።
• የአቻ መማማር መድረኮች፡ የማኅበራዊ መረብ መፍጠርረተኞች ልምድ የሚለዋወጡበት፣ አዲስ ጓደኛ የሚፈጥሩበት እና እርስ በርስ የሚደጋገፉበት መደበኛ የመገናኛ መድረኮች (ለምሳሌ ወርሃዊ ስብሰባዎች ወይም የቡድን ውይይቶች) እናዘጋጃለን።
•ይህ አገልግሎት የጡረተኞችን ማኅበራዊ ትስስር ያጠናክራል፣ ብቸኝነትን ይከላከላል እና የጋራ የማኅበረሰብ ስሜትን ይፈጥራል።
•በእኛ ተከታታይ ድጋፍ አማካኝነት፣ ጠንካራ የማኅበራዊ መረብ ተጠቃሚ በመሆን የጡረታ ሕይወትዎን በመረጋጋትና በደስታ ይቀጥላሉ።
`
  },
  {
    icon: 'bi-lightbulb',
    title: 'የአዲስ ሥራ ፈጠራና ዕድል ፍለጋ፡ ልምድን ወደ ትርፍ መለወጥ',
    description: `ጡረታ የሥራ ሕይወት መጨረሻ ሳይሆን አዲስ የፈጠራና የኢኮኖሚ ዕድል መጀመርያ ሊሆን ይችላል።
ይህ የሥልጠና ክፍል ዓላማው ተሳታፊዎች በጡረታ ጊዜያቸው ንቁ፣ ገቢ የሚያስገኙ አማራጭ የሥራ
መስኮችን እንዲያገኙና አዲስ ንግድ እንዲፈጥሩ ለመርዳት ነው። በዚህም የኢኮኖሚ ጥገኝነትን እንዲቀንሱ
እና ፋይዳ ባላቸው ተግባራት እንዲጠመዱ እናበረታታለን።`,
    formore: `• ነፃ ጊዜን ወደ ገቢ ምንጭ መለወጥ:ጡረታ ከወጡ በኋላ የሚያገኙትን ነፃ ጊዜ ከቤት ቁጭታ ይልቅ ወደ አዲስ ገቢ ምንጭ ወይም ማኅበራዊ ፋይዳ ወዳለው ተሳትፎ እንዴት መለወጥ እንደሚቻል እናስጨብጣለን።  
• ለአነስተኛ ንግድ ሥራ የሚሆን የገበያ ትንተና፣ የቢዝነስ እቅድ ማውጣት እና አስፈላጊ የሆኑ ሕጋዊ ሂደቶችን እንዴት ማጠናቀቅ እንደሚቻል እናሠለጥናለን። 
• ለጡረታ ጊዜ ተስማሚ የሆኑ ሥራዎችን መለየት: ተሳታፊዎች ለዓመታት ያከማቹትን ሙያዊ ዕውቀትና ልምድ (Transferable Skills) ገምግመው፣ ከግል ፍላጎታቸው ጋር የሚጣጣሙ አዳዲስ የሥራ ዕድሎችን እንዲለዩ እናግዛለን።
• ለጡረተኞች የሚሆኑ አማራጮች እንደ ምክክር (Consultancy)፣ የአካዳሚክ ማስተማር፣ የፈቃደኝነት አገልግሎት ወይም የትርፍ ጊዜ ማሳለፊያን ወደ ንግድ ሥራ መለወጥ ሊሆን እንደሚችል እናሳያለን።
• በዚህ ሥልጠና፣ ጡረተኞች ፋይዳ ያላቸውና የሚያስደስቱ ተግባራትን በመፈጸም፣ የገንዘብ ነፃነትን እያጠናከሩ የሕይወት እርካታቸውን ከፍ ያደርጋሉ።
`
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
                      ዝርዝሮችን ይመልከቱ
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
                   <span className='fw-bold '>የምናስጨብጣቸው ቁልፍ ክህሎቶች፦</span>
                  <p className='mt-2' style={{ whiteSpace: 'pre-line' }}>{selectedService.formore}</p>
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
