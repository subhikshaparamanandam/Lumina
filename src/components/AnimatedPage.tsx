import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,      
    transition: { duration: 0.6 }
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
