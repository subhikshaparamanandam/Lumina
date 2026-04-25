import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <AnimatedPage>
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>Get in Touch</h1>
          <p className="subtitle">We would love to hear from you.</p>
        </motion.div>

        <motion.div 
          className="contact-grid"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="info-item">
              <MapPin className="info-icon" size={24} />
              <div className="info-content">
                <h3>Our Flagship Boutique</h3>
                <p>123 Luxury Avenue<br/>Aesthetic District<br/>Beverly Hills, CA 90210</p>
              </div>
            </div>
            
            <div className="info-item">
              <Mail className="info-icon" size={24} />
              <div className="info-content">
                <h3>Client Care</h3>
                <p>concierge@lumina.beauty<br/>We reply within 24 hours.</p>
              </div>
            </div>

            <div className="info-item">
              <Phone className="info-icon" size={24} />
              <div className="info-content">
                <h3>Contact Number</h3>
                <p>+1 (800) 123-LUMINA<br/>Mon-Fri, 9am - 6pm PST</p>
              </div>
            </div>

            <motion.div 
              className="map-container"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ width: '100%', height: '250px', backgroundColor: 'var(--color-secondary)', borderRadius: '8px', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)' }}
            >
              Interactive Map Integration
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Send a Message</h2>
              
              <div className="form-group">
                <input type="text" id="name" className="form-input" placeholder=" " required />
                <label htmlFor="name" className="form-label">Full Name</label>
              </div>

              <div className="form-group">
                <input type="email" id="email" className="form-input" placeholder=" " required />
                <label htmlFor="email" className="form-label">Email Address</label>
              </div>
              
              <div className="form-group">
                <select id="topic" className="form-input" required defaultValue="">
                  <option value="" disabled hidden>Select Topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="press">Press & Media</option>
                  <option value="other">Other</option>
                </select>
                {/* Custom label styling for select is tricky with floating labels, using standard placeholder */}
              </div>

              <div className="form-group">
                <textarea id="message" className="form-input" placeholder=" " required></textarea>
                <label htmlFor="message" className="form-label">Your Message</label>
              </div>

              <motion.button 
                type="submit" 
                className="btn btn-primary submit-btn"
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <Loader2 size={20} />
                  </motion.div>
                ) : isSuccess ? (
                  'Message Sent!'
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
