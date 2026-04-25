import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import './Shop.css';

export default function Shop() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <AnimatedPage>
      <div className="shop-container">
        <motion.div 
          className="shop-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>The Collection</h1>
          <p className="subtitle">Discover our full range of luxury cosmetics.</p>
        </motion.div>
        
        <motion.div 
          className="shop-grid"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              className="shop-product"
              variants={itemVariants}
            >
              <div className="shop-product-img">
                <img src={product.image} alt={product.name} />
                <div className="shop-product-hover">
                  <Link to={`/product/${product.id}`} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>View Details</Link>
                </div>
              </div>
              <div className="shop-product-info">
                <span className="shop-product-category">{product.category}</span>
                <h3 className="shop-product-name">{product.name}</h3>
                <div className="shop-product-price">${product.price}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
