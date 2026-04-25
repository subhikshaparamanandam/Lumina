import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.1 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { 
      duration: 0.4, 
      ease: [0.33, 1, 0.68, 1] 
    } 
  }
};

export default function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="page-content"
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}
