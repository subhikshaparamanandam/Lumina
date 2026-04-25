import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <nav className="desktop-nav">
              <NavLink to="/shop" className={({isActive}) => isActive ? 'active-link' : ''}>Shop</NavLink>
              <NavLink to="/about" className={({isActive}) => isActive ? 'active-link' : ''}>About</NavLink>
              <NavLink to="/contact" className={({isActive}) => isActive ? 'active-link' : ''}>Contact</NavLink>
            </nav>
          </div>

          <div className="navbar-center">
            <Link to="/" className="brand-logo">LUMINA</Link>
          </div>

          <div className="navbar-right">
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="nav-search-input"
                    placeholder="Search cosmetics..."
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                    style={{
                       border: 'none',
                       borderBottom: '1px solid var(--color-border)',
                       background: 'transparent',
                       padding: '0.4rem',
                       outline: 'none',
                       marginRight: '0.5rem',
                       color: 'var(--color-text)',
                       fontFamily: 'inherit'
                    }}
                  />
                )}
              </AnimatePresence>
              <button 
                className="icon-btn search-btn" 
                onClick={(e) => { e.preventDefault(); setIsSearchOpen(!isSearchOpen); }}
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
            </div>
            
            <button className="icon-btn" onClick={(e) => { e.preventDefault(); setIsWishlistOpen(true); }}><Heart size={22} strokeWidth={1.5} /></button>
            <button className="icon-btn cart-btn" onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}>
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="cart-count">2</span>
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu glass"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="mobile-menu-header">
              <span className="brand-logo">LUMINA</span>
              <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="mobile-nav-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
