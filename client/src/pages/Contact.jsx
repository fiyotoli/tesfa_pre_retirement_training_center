import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message as antdMessage } from 'antd';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import '../components/Contact.css';

const { Title, Text } = Typography;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${backendUrl}/api/feedback/add`, values);
      if (res.data.success) {
        antdMessage.success(res.data.message);
        form.resetFields();
      } else {
        antdMessage.error(res.data.message || "Failed to send message");
      }
    } catch (error) {
      antdMessage.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="container my-5 pt-5">
      {/* Section Header */}
      <div className="text-center mb-2 mt-4">
        <h2 className="d-inline-flex align-items-center justify-content-center">
          <span
            className="bg-primary-custom me-2"
            style={{ borderRadius: '50px', width: '30px', height: '3px', display: 'inline-block' }}
          ></span>
          የመገናኛ መረጃ
        </h2>
      </div>

      <Text
        className="mb-2 text-muted"
        style={{ fontSize: '18px', lineHeight: '1.7', textAlign: 'center', display: 'block' }}
      >
  እርስዎን ለመርዳት እዚህ እንገኛለን! ስለ ቅድመ-ጡረታ ሥልጠና ፕሮግራሞቻችን ማንኛውም አይነት ጥያቄ ካሎት፣ 
  ድጋፍ ከፈለጉ፣ ወይም አስተያየትዎን ለማጋራት ከፈለጉ፣ እባክዎ እኛን ለማግኘት አያመንቱ።   </Text>

      <Row gutter={[32, 32]} className="pt-5">
        {/* Left: Contact Form */}
        <Col xs={24} md={12}>
          <div className="p-5 bg-primary-custom-opacity" style={{ borderRadius: '8px' }}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="ሙሉ ስምዎን ያስገቡ" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input placeholder="ኢሜልዎን ያስገቡ" />
              </Form.Item>
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <Input.TextArea rows={4} placeholder="ጥያቄዎን ወይም መልእክትዎን እዚህ ላይ ይፃፉ" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: '#814516', borderColor: '#814516' }}
                >
                 መልእክት ይላኩ
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Right: Contact Info */}
        <Col xs={24} md={12} className="d-flex flex-column justify-content-center">
          <Title level={2} style={{ color: '#814516' }}>የእውቂያ መረጃ</Title>
          <Text className="mb-4 text-muted" style={{ fontSize: '16px', lineHeight: '1.7' }}>
           ለአርኪ እና ስኬታማ የጡረታ ዘመን በሚዘጋጁበት ጊዜ ቡድናችን በእያንዳንዱ እርምጃ እርስዎን ለመርዳት ዝግጁ ነው። 
          </Text>
          <Text className="mb-4 text-muted" style={{ fontSize: '16px', lineHeight: '1.7' }}>
           ከዚህ በታች ያለውን ቅጽ ይሙሉ ወይም ከኛ ጋር ለመገናኘት የተሰጡትን የመገኛ ዝርዝሮች ይጠቀሙ።
          </Text>

          <ul style={{ padding: 0, listStyle: 'none', fontSize: '16px' }}>
            <li className="mb-3">
              <FaEnvelope className="text-primary-custom me-2" />
              <span>tesfatraining2016@gmail.com</span>
            </li>
            <li className="mb-3">
              <FaPhone className="text-primary-custom me-2" />
              <span>0911440456</span>
            </li>
            <li className="mb-3">
              <FaMapMarkerAlt className="text-primary-custom me-2" />
              <span>ሜክሲኮ፣ አዲስ አበባ፣ ኢትዮጵያ</span>
            </li>
          </ul>
        </Col>
      </Row>

      {/* Google Map */}
      <div className="mt-5 text-center">
        <h3 className="mb-3">ቢሮአችንን ይጎብኙ</h3>
        <p className="text-muted mb-4" style={{ fontSize: '16px' }}>
         ከካሬ ህንፃ አጠገብ በሚገኘው ሀይማን ህንፃ ሜክሲኮ፣ አዲስ አበባ ያገኙናል።
        </p>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6106836895965!2d38.74407000818875!3d9.007923589286115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85d0181f146d%3A0xbe3dcdd55e6fe2c6!2zS0thcmUgQnVpbGRpbmcgfCBNZXhpY28gfCDhiqzhiqzhiK0g4YiF4YqV4Y2DIHwg4Yic4Yqt4Yiy4Yqu!5e0!3m2!1sam!2set!4v1753242748466!5m2!1sam!2set"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
