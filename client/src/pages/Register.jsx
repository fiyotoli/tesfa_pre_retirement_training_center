import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="container mt-5 pt-5 mb-4">
      <div className="text-center mb-4 mt-4">
        <h2 className="d-inline-flex align-items-center justify-content-center">
          <span
            className="bg-primary-custom me-2"
            style={{ borderRadius: '50px', width: '30px', height: '3px', display: 'inline-block' }}
          ></span>
          ለመመዝገብ
        </h2>
      </div>
      <div className="row justify-content-center">
        {/* Employee Card */}
        <div className="col-md-6 col-lg-5 mb-4">
          <div className="card h-100 d-flex flex-column shadow p-4 text-center">
            <h4>እንደ ሰልጣኝ ይመዝገቡ</h4>
            <hr />
            <h6>ጥቅሞች:</h6>
            <ul className="text-start flex-grow-1">
              <li>ከጡረታ በፊት ለሚሰጡ ስልጠናዎች በቀላሉ ይቀላቀላሉ።</li>
              <li>ከስልጠና በኋላ፣ የፕሮፋይልዎ መረጃ በድህረ ገጹ ላይ ይታያል።</li>
              <li>ልምድ ያላቸው ባለሙያዎችን ለሚፈልጉ ድርጅቶች የመቀጠር እድልዎ ይጨምራል።</li>
            </ul>
            <Link
              to="/trainerRegister" 
              className="btn view-detail-button-register mt-auto"
            >
              ይመዝገቡ
            </Link>
          </div>
        </div>

        {/* Company Card */}
        <div className="col-md-6 col-lg-5 mb-4">
          <div className="card h-100 d-flex flex-column shadow p-4 text-center">
            <h4>እንደ ድርጅት ይመዝገቡ</h4>
            <hr />
            <h6>ጥቅሞች:</h6>
            <ul className="text-start flex-grow-1">
              <li>ለከፍተኛ የስራ መደቦች የስራ ማስታወቂያዎችን ይለጥፋሉ።</li>
              <li>ልምድ ካላቸው እና የሰለጠኑ ባለሙያዎች ጋር በቀጥታ ይገናኛሉ።</li>
              <li>ብቃት ያላቸው እና አስቀድመው የተመረጡ እጩዎችን ማግኘት ይችላሉ።</li>
            </ul>
            <Link
              to="/companyRegister"
              className="btn view-detail-button-register mt-auto"
            >
              ይመዝገቡ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
