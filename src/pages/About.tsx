import { useRef } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const StorySection = ({ title, text, reverse = false, delay = 0 }: { title: string, text: string[], reverse?: boolean, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image (moves slower than scroll)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div className={`story-section ${reverse ? 'reverse' : ''}`} ref={ref}>
      <motion.div 
        className="story-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay }}
      >
        <h2>{title}</h2>
        {text.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </motion.div>
      <div className="story-visual">
         <motion.img 
           style={{ y }}
           src="/hero_bg.png" 
           alt="Brand Visual" 
           className="parallax-img"
         />
      </div>
    </div>
  );
};

export default function About() {
  return (
    <AnimatedPage>
      <div className="about-container">
        
        {/* Intro */}
        <motion.div 
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        >
          <h1>Our Heritage</h1>
          <p>Born from a passion for authentic beauty, LUMINA has redefined the boundaries of luxury cosmetics by blending avant-garde science with botanical purity.</p>
        </motion.div>

        {/* Scroll Storytelling */}
        <StorySection 
          title="The Origin"
          text={[
            "Founded in 2024 by visionary makeup artists, LUMINA was created with a singular mission: to strip away the complex layers of modern beauty and return to radiant simplicity.",
            "We believe that makeup should never mask who you are. Instead, it should be a tool to elevate and illuminate your natural architecture."
          ]}
        />

        <StorySection 
          title="Conscious Craftsmanship"
          reverse={true}
          text={[
            "Every pigment we select and every serum we formulate tells a story of ethical sourcing and meticulous laboratory precision.",
            "Our products are vegan, cruelty-free, and packaged in endlessly recyclable glass and metal hardware, ensuring that our footprint is as pure as our finish."
          ]}
        />

        {/* Ingredients / Philosophy Details */}
        <div className="ingredients-banner">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Lumina Standard
          </motion.h2>
          <div className="ingredients-grid">
            {[
              { title: 'Rose Quartz Extract', text: 'Finely milled to bounce light and blur texture instantly.' },
              { title: 'Squalane Barrier', text: 'Olive-derived hydration that locks in moisture for 24 hours.' },
              { title: 'Clean Pigments', text: 'Free from talc, parabens, and synthetic fragrances.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="ingredient-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </AnimatedPage>
  );
}
