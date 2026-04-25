import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import './Home.css';
import { useRef } from 'react';

const FEATURED_PRODUCTS = [
  { id: 1, name: 'Luminous Foundation', price: '$58', category: 'Face' },
  { id: 2, name: 'Velvet Matte Lipstick', price: '$42', category: 'Lips' },
  { id: 3, name: 'Celestial Palette', price: '$85', category: 'Eyes' },
  { id: 4, name: 'Radiant Glow Blush', price: '$38', category: 'Cheeks' },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const carouselRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 }
    }
  };

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div className="hero-bg" style={{ y }}>
          <img src="/hero_bg.png" alt="Luxury Makeup" className="hero-img" />
          <div className="hero-overlay" />
        </motion.div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <h1 className="hero-title">Redefine<br/>Your Radiance</h1>
            <p className="hero-subtitle subtitle">Experience the zenith of luxury cosmetics, tailored for your unique glow.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">
                Shop Collection <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-glass">
                Discover The Brand
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products - Horizontal Scroll */}
      <section className="featured-section">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span className="section-eyebrow" variants={itemVariants}>Editor's Pick</motion.span>
          <motion.h2 variants={itemVariants}>Iconic Essentials</motion.h2>
        </motion.div>

        <motion.div 
          ref={carouselRef} 
          className="carousel-container"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div 
            drag="x" 
            dragConstraints={carouselRef} 
            className="carousel-track"
          >
            {FEATURED_PRODUCTS.map((product, idx) => (
              <motion.div 
                key={product.id} 
                className="product-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="product-img-wrapper">
                  <img src="/product_featured.png" alt={product.name} />
                  <div className="product-hover-actions">
                    <button className="btn btn-glass quick-add">Quick Add</button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">{product.price}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-grid">
          <motion.div 
            className="philosophy-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>The Art of Complexion</h2>
            <p className="subtitle">Formulated with rare botanical extracts and advanced skincare science, our collection melts seamlessly into your skin, providing a flawless, second-skin finish.</p>
            <Link to="/about" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '2rem' }}>Read Our Story</Link>
          </motion.div>
          <motion.div 
            className="philosophy-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="visual-block" />
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
