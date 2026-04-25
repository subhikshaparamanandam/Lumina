import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import './CartDrawer.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock cart state for demo
const initialItems = [
  { ...PRODUCTS[0], quantity: 1 },
  { ...PRODUCTS[5], quantity: 2 }
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = useState(initialItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cart-backdrop">
          <motion.div 
            className="cart-overlay glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="cart-header">
              <h2>Your Bag ({items.length})</h2>
              <button className="icon-btn" onClick={onClose}><X size={24} strokeWidth={1} /></button>
            </div>

            <div className="cart-body">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="empty-cart-msg"
                  >
                    Your bag is currently empty.
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    >
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-title">{item.name}</div>
                        <div className="cart-item-price">${item.price}</div>
                        <div className="cart-item-actions">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}><Minus size={14}/></button>
                          <span>{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}><Plus size={14}/></button>
                          <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary checkout-btn">Proceed to Checkout</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
