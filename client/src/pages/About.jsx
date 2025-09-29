import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaBullseye, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import aboutBanner from '../assets/team.jpg';
;
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      {/* Hero Section with image left and text right */}
      <div className="about-hero-section pt-5 mt-5 mt-lg-0">
        <Container>
          <Row className="align-items-center mt-5">
            <Col md={6}>
              <img
                src={aboutBanner}
                alt="About Us"
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6} className="text-md-start mt-4 mt-md-0">
              <h1 className="fw-bold display-5 text-primary-custom">ስለ ድርጅታችን</h1>
              <p className="mt-3">
            ተስፋ የቅድመ ጡረታ ሥልጠና ማዕከላችን ፣ ወደ ጡረታ የተቃረቡ ሰራተኞች  ለወደፊት ሕይወታቸው/ከጡረታ መውጣት በኃላ ላለው ዘመናቸው ከወዲሁ በብቃት እንዲያዘጋጁ ለማብቃት፣ በጡረታ ላይ የሚገኙትም ጡረታን በፀጋ ተቀብለው ቀሪ ህይወታቸውን ምርታማ፣ጤናማና፣ስኬታማ በሆነ ሁኔታ እንዲያሳልፉ ለማስገንዘብ የተነሳሳ ሀገር በቀል የስልጠና ማዕከል ነው፡፡    </p>
              <p>
              በሀገራችን ጡረታ የሚወጡ የመንግስትና የግል ድርጅት ሰራተኞች ከስራ ዓለም ወደ ጡረታ ዓለም የሚያደርጉት ሽግግር ፍጹም ከጭንቀት ከፍርሃት ከድንጋጤ ነፃ በሆነ  ሁኔታ እንዲከናወን  በገንዘብ እቅድ፣ በስነልቦና ዝግጅት ፣በሥራ ዕድሎች ፈጠራ ግንዛቤ፣ በጤና እና በግል ልማት እውቀትና ክህሎቶች ላይ ግንዛቤ ማስጨበጥ ረገድ ተግባራዊ ድጋፍ እንሰጣለን አቅማቸውን እንገነባለን።
ግባችን እያንዳንዱን የሥልጠና ተሳታፊ ጡረታ ከወጣ በኋላ አስተማማኝና ትርጉም ያለው ሕይወት እንዲፈጥር መደገፍና ማብቃት ነው።     
               </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Our Story - moved just below hero */}
      <section className="bg-light OurStory py-5">
        <Container>
          <h2 className="text-center mb-4 text-primary-custom">ታሪካችን</h2>
          <p className="lead text-center mx-auto" style={{ maxWidth: '800px' }}>
           የተስፋ ቅድመ ጡረታ ስልጠና ማዕከል እንደ ኢትዮጵያውያን አቆጣጠር በ2016 የተመሰረተ ሲሆን፣ አጫጭር ጊዜ ስልጠናዎችን ለመስጠት ህጋዊ ፈቃድ ያለው ተቋም ነው። ማዕከላችን የተመሰረተው ጡረታ ላይ በሚገኙና የጡረታ ልምድና ተሞክሮ ባላቸው በአቶ ተስፋዬ ደሳለኝ ጥልቅ እምነትና ከግል ልምዳቸው በመነሳት ነው።   
           </p>
          <p className="lead text-center mx-auto" style={{ maxWidth: '800px' }}>
           አቶ ተስፋዬ ከረጅም ዓመታት አገልግሎት በኋላ ጡረታ ሲወጡ ያጋጠሟቸውን ተግዳሮቶች መነሻ በማድረግ፣ መሰል ችግሮች ሌሎች ወገኖቻችን ላይ እንዳይደርሱ ለመከላከልና የተሻለ ምዕራፍ እንዲገቡ ለማስቻል ይህንን ማዕከል አቋቋሙ። እስካሁን ድረስም ለ200 ለሚጠጉ ሰራተኞች ስልጠና በመስጠት ወደ ጡረታ ህይወታቸው በተሟላ ዝግጅት እንዲገቡ አግዘናል።  </p>
        </Container>
      </section>

      {/* Mission, Vision, Culture */}
<Container className="my-5">
  <Row className="text-center mb-5 g-4">
    {/* Mission Card */}
    <Col md={6} lg={4}>
      <Card className="h-100 p-4">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary-custom text-white" style={{ width: '60px', height: '60px' }}>
          <FaBullseye size={30} />
        </div>
        <h4 className='fw-bold'>ተልዕኮአችን</h4>
        <p>ጡረታ ለሚቃረቡና ጡረታ ለወጡ ዜጎች ሁሉን አቀፍ ሥልጠናዎችንና የምክር አገልግሎቶችን በመስጠት፣ ለለውጥ ምዕራፉ በአእምሮአዊ፣ ፋይናንሳዊና ማኅበራዊ ጉዳዮች እንዲዘጋጁ ማስቻል።
        </p>
      </Card>
    </Col>

    {/* Vision Card (Zoomed out with shadow) */}
    <Col md={6} lg={4}>
      <Card className="h-100 p-4 shadow-lg vision-card">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary-custom text-white" style={{ width: '60px', height: '60px' }}>
          <FaHandshake size={30} />
        </div>
        <h4 className='fw-bold'>ራዕያችን</h4>
        <p>ራዕያችን: በኢትዮጵያ ውስጥ የቅድመ ጡረታ ዝግጅትና ከጡረታ በኋላ የሥራ ተሳትፎን በማጎልበት ረገድ ግንባር ቀደም ማዕከል መሆን።</p>
      </Card>
    </Col>

    {/* Culture Card */}
    <Col md={6} lg={4}>
      <Card className="h-100 p-4">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary-custom text-white" style={{ width: '60px', height: '60px' }}>
          <FaUsers size={30} />
        </div>
        <h4 className='fw-bold'>የእኛ ባህል</h4>
        <p>በሁሉም ስልጠናዎቻችንና አገልግሎቶቻችን፣ ለተሳታፊዎቻችን ብሩህ ተስፋን እና አዎንታዊ አመለካከትን እናሰንቃለን። ጡረታ የገደብ ሳይሆን የዕድሎች በር መሆኑን እናሳያለን። </p>
      </Card>
    </Col>
  </Row>
</Container>


     {/* CTA Section */}
<div className="cta-section d-flex align-items-center justify-content-center text-white text-center">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-10">
        <h2 className="mb-1">ልምድ ያላቸውና ታማኝ ባለሙያዎችን መቅጠር ይፈልጋሉ?</h2>
        <p className="mb-2">
          ተስፋ የቅድመ ጡረታ ሥልጠና በቂ ልምድ ያላቸውንና ለድርጅትዎ የበኩላቸውን አስተዋጽኦ ለማድረግ 
          የተዘጋጁ ጡረተኞችን ያገናኝዎታል። ክፍት የሥራ ቦታዎችዎን ያስታውቁንና ትክክለኛውን የሰው ኃይል ዛሬውኑ ያግኙ።
        </p>
        <Link to="/profile" className="btn-profile btn btn-light btn-lg mt-2">
          የሥራ ፈላጊዎች ፕሮፋይል
        </Link>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default AboutUs;
