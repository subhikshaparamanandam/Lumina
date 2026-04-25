import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import './WishlistDrawer.css';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock wishlist state
const initialFavorites = [
  { id: 3, name: 'Celestial Palette', price: 85, image: '/product_featured.png' },
  { id: 8, name: 'Dewy Lip Oil', price: 28, image: '/product_featured.png' }
];

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const [items, setItems] = useState(initialFavorites);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="wishlist-backdrop">
          <motion.div 
            className="wishlist-overlay glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="wishlist-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="wishlist-header">
              <h2>Favorites ({items.length})</h2>
              <button className="icon-btn" onClick={onClose}><X size={24} strokeWidth={1} /></button>
            </div>

            <div className="wishlist-body">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="empty-wishlist-msg"
                  >
                    You haven't saved any favorites yet.
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="wishlist-item"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    >
                      <div className="wishlist-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="wishlist-item-details">
                        <div className="wishlist-item-title">{item.name}</div>
                        <div className="wishlist-item-price">${item.price}</div>
                        <div className="wishlist-item-actions">
                          <button className="move-to-cart-btn" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
