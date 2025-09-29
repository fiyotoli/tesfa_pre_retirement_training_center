import React, { useState, useEffect } from 'react';
import { Accordion, Container, Row, Col, Image } from 'react-bootstrap';
import { FaQuestionCircle, FaPlus } from 'react-icons/fa';
import faqImage from '../assets/faq1.jpg';
import './Faq.css';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Faq = () => {
  const [activeKey, setActiveKey] = useState("0");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

const faqItems = [
  {
    question: "ቅድመ ጠረታ ስልጠና ምንድን ነው?",
    answer: "ከጡረታ በፊት የሚሰጠው ስልጠና ዕድሜያቸው ወደ ጡረታ ለተቃረቡና ከ5-10 ዓመት ለሚቀራቸው ሰራተኞች የገንዘብ፣ የአኗኗር ዘይቤ እና የሙያ አማራጮቻቸውን እንዲያቅዱ ለመርዳት የተነደፈ ፕሮግራም ሲሆን፣ ወደ ጡረታ የሚያደርጉት ሽግግር በተቀላጠፈና በሚያስደስት መልኩ እንዲሆን ያግዛል።",
    eventKey: "0",
  },
  {
    question: "ከጡረታ በፊት በሚሰጠው ስልጠና ላይ መገኘት ምን ጥቅም አለው?",
    answer: "ከጡረታ በፊት መዘጋጀት ጭንቀትን ሊቀንስ፣ ገንዘብዎን በጥበብ እንዲያስተዳድሩ ሊረዳዎት፣ አዳዲስ የሥራ ወይም የመዝናኛ ዕድሎችን እንዲያስሱ እና ከጡረታ በኋላ አጠቃላይ የኑሮ ጥራትዎን እንዲሻሻል የሚያግዝ በመሆኑ በቅድመ ጡረታ ስልጠና ላይ መገኘት ጠቃሚ ነው።",
    eventKey: "1",
  },
  {
    question: "በስንት ዓመቴ ነው ለጡረታ ማቀድ መጀመር ያለብኝ?",
    answer: "ከሚጠበቀው የጡረታ ዕድሜዎ (በኢትዮጵያ ከ60 ዓመት) በፊት ብዙ ዓመታት ቀደም ብሎ ማቀድ መጀመር በጣም ጥሩ ነው፡፡ ከ3 እስከ 5 ዓመታት ቀደም ብሎ መዘጋጀት መጀመር ለገንዘብ እና ለግል ዝግጅቶች የተሻለ ጊዜ እንዲኖርዎት ይረዳዎታል።",
    eventKey: "2",
  },
  {
    question: "ከጡረታ በኋላ ምን ዓይነት ሥራዎች መሥራት እችላለሁ?",
    answer: "ብዙ አማራጮች አሉ፣ ከፊል ጊዜ ሥራ፣ በነፃ ሙያተኝነት (freelancing)፣ አማካሪነት (consulting)፣ በፈቃደኝነት አገልግሎት መስጠት (volunteering)፣ አነስተኛ ንግድ መጀመር፣ ወይም እንደ የማስተማር አገልግሎት (tutoring) ወይም ምናባዊ ረዳትነት (virtual assistance) ያሉ የመስመር ላይ ሥራዎችን መስራት ይችላሉ።",
    eventKey: "3",
  },
  {
    question: "ከጡረታ በፊት የሚሰጠው ስልጠና ገንዘቤን እንዳስተዳድር ይረዳኛል?",
    answer: "አዎ! ስልጠናው የጡረታ ፈንድዎ ረዘም ላለ ጊዜ እንዲቆይ ለማድረግ ስለ በጀት ማውጣት፣ መቆጠብ፣ ኢንቨስት ማድረግ እና ገቢዎን ማስተዳደርን በተመለከተ ምክሮችን ያካትታል።",
    eventKey: "4",
  },
];



  return (
    <Container className="mt-5 pt-5">
      <Row className="align-items-center">
        {/* Left Side - Image with AOS */}
        <Col lg={6} md={6} sm={12} className="mb-4" data-aos="fade-up">
          <Image src={faqImage} alt="FAQ" fluid rounded />
        </Col>

        {/* Right Side - Accordion with AOS */}
        <Col lg={6} md={6} sm={12} data-aos="fade-left">
          <div className="text-left my-4">
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
              ተደጋግሞ የሚጠየቁ ጥያቄዎች 
            </h2>
          </div>

          <Accordion activeKey={activeKey} flush>
            {faqItems.map(({ question, answer, eventKey }) => (
              <Accordion.Item
                eventKey={eventKey}
                key={eventKey}
                style={{ border: 'none' }}
                data-aos="zoom-in-up"
              >
                <Accordion.Header onClick={() => handleToggle(eventKey)} style={{ borderBottom: '1px solid #ddd' }}>
                  <FaQuestionCircle className="me-2 text-primary-custom" size={20} />
                  <span className="flex-grow-1 text-start">{question}</span>
                  <FaPlus className="text-primary-custom" size={20} />
                </Accordion.Header>
                <Accordion.Body>{answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Faq;
