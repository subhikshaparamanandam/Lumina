import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import './ProductDetail.css';

// Mock DB for the current demo
const SHOP_PRODUCTS = [
  { id: '1', name: 'Luminous Foundation', price: '$58', category: 'Face', image: '/product_featured.png', description: 'Experience flawless coverage with our ultra-lightweight Luminous Foundation. Formulated with light-reflecting pearls and hydrating serums, it melts into the skin for a radiant, second-skin finish.' },
  { id: '2', name: 'Velvet Matte Lipstick', price: '$42', category: 'Lips', image: '/product_featured.png', description: 'A highly pigmented, non-drying matte lipstick that glides on smoothly and stays comfortable all day.' },
  { id: '3', name: 'Celestial Palette', price: '$85', category: 'Eyes', image: '/product_featured.png', description: 'An ethereal collection of 12 richly pigmented eyeshadows featuring buttery mattes and multi-dimensional shimmers.' },
  { id: '4', name: 'Radiant Glow Blush', price: '$38', category: 'Cheeks', image: '/product_featured.png', description: 'A silky, buildable powder blush that delivers a natural flush of color with a subtle luminous glow.' },
  { id: '5', name: 'Illusion Concealer', price: '$32', category: 'Face', image: '/product_featured.png', description: 'A creamy, high-coverage concealer that instantly brightens and blurs imperfections while treating the under-eye area.' },
  { id: '6', name: 'Noir Volume Mascara', price: '$35', category: 'Eyes', image: '/product_featured.png', description: 'Achieve dramatic, gravity-defying volume and intense black color with just one coat.' },
  { id: '7', name: 'Silk Setting Powder', price: '$48', category: 'Face', image: '/product_featured.png', description: 'An ultra-fine translucent powder that locks makeup in place for 16 hours without adding weight or texture.' },
  { id: '8', name: 'Dewy Lip Oil', price: '$28', category: 'Lips', image: '/product_featured.png', description: 'A nourishing tinted lip oil infused with botanical extracts for an ultra-glossy, never-sticky finish.' },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = SHOP_PRODUCTS.find(p => p.id === id) || SHOP_PRODUCTS[0];

  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');
  const [isAdded, setIsAdded] = useState(false);
  const [zoomMousePos, setZoomMousePos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomMousePos({ x, y });
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Duplicate for mock gallery
  const galleryImages = [product.image, product.image, product.image];

  return (
    <AnimatedPage>
      <div className="pdp-container">
        <div className="pdp-grid">
          
          {/* Gallery */}
          <motion.div 
            className="pdp-gallery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div 
              className="pdp-main-img"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <motion.img 
                ref={imgRef}
                src={galleryImages[activeThumb]} 
                alt={product.name} 
                animate={{ 
                  scale: isZooming ? 1.5 : 1,
                  transformOrigin: isZooming ? `${zoomMousePos.x}% ${zoomMousePos.y}%` : 'center center'
                }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                style={{ filter: isZooming ? 'brightness(1.05)' : 'brightness(1)' }}
              />
            </div>
            <div className="pdp-thumbnails">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`pdp-thumb ${activeThumb === idx ? 'active' : ''}`}
                  onClick={() => setActiveThumb(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="pdp-info"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <span className="pdp-category">{product.category}</span>
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-price">{product.price}</div>
            
            <div className="pdp-actions">
              <motion.button 
                className={`btn ${isAdded ? 'btn-glass' : 'btn-primary'} pdp-atc-btn`}
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
                animate={isAdded ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {isAdded ? 'Added to Cart' : 'Add to Cart — ' + product.price}
              </motion.button>
              <button className="pdp-wishlist-btn">
                <Heart size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="pdp-divider" />

            {/* Tabs */}
            <div className="pdp-tabs-container">
              <div className="pdp-tabs-header">
                {['description', 'ingredients', 'reviews'].map((tab) => (
                  <button 
                    key={tab}
                    className={`pdp-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab as any)}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTabIndicator" className="pdp-tab-indicator" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="pdp-tab-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'description' && <p>{product.description}</p>}
                    {activeTab === 'ingredients' && <p>Water, Cyclopentasiloxane, Isododecane, Glycerin, PEG-10 Dimethicone, Butylene Glycol, Nylon-12, Titanium Dioxide, Disteardimonium Hectorite...</p>}
                    {activeTab === 'reviews' && <p>★★★★★ (128 Reviews)<br/><br/>"Absolutely stunning finish. Looks just like my skin, but better." - Chloe S.</p>}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Related Products Hook */}
        <div className="related-section">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Complete The Look</h2>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', overflowX: 'auto', paddingBottom: '2rem' }} className="no-scrollbar">
               {/* Quick render of a few products for the carousel */}
               {SHOP_PRODUCTS.slice(0, 3).map(p => (
                 <Link to={`/product/${p.id}`} key={p.id} style={{ display: 'block', minWidth: '280px' }}>
                    <div style={{ width: '100%', aspectRatio: '4/5', backgroundColor: 'var(--color-secondary)' }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                      <h4 style={{ fontWeight: 400, marginBottom: '0.5rem' }}>{p.name}</h4>
                      <p style={{ color: 'var(--color-gold)' }}>{p.price}</p>
                    </div>
                 </Link>
               ))}
            </div>
          </motion.div>
        </div>

      </div>
    </AnimatedPage>
  );
}
