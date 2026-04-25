export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Luminous Foundation', price: 58, category: 'Face', image: '/prod_foundation_1777130927212.png', description: 'Experience flawless coverage with our ultra-lightweight Luminous Foundation. Formulated with light-reflecting pearls and hydrating serums, it melts into the skin for a radiant, second-skin finish.' },
  { id: 2, name: 'Velvet Matte Lipstick', price: 42, category: 'Lips', image: '/prod_lipstick_1777130943786.png', description: 'A highly pigmented, non-drying matte lipstick that glides on smoothly and stays comfortable all day.' },
  { id: 3, name: 'Celestial Palette', price: 85, category: 'Eyes', image: '/prod_palette_1777130959144.png', description: 'An ethereal collection of 12 richly pigmented eyeshadows featuring buttery mattes and multi-dimensional shimmers.' },
  { id: 4, name: 'Radiant Glow Blush', price: 38, category: 'Cheeks', image: '/prod_blush_1777130974727.png', description: 'A silky, buildable powder blush that delivers a natural flush of color with a subtle luminous glow.' },
  { id: 5, name: 'Illusion Concealer', price: 32, category: 'Face', image: '/prod_concealer_1777131000519.png', description: 'A creamy, high-coverage concealer that instantly brightens and blurs imperfections while treating the under-eye area.' },
  { id: 6, name: 'Noir Volume Mascara', price: 35, category: 'Eyes', image: '/prod_mascara_1777131022689.png', description: 'Achieve dramatic, gravity-defying volume and intense black color with just one coat.' },
  { id: 7, name: 'Silk Setting Powder', price: 48, category: 'Face', image: '/prod_powder_1777131036125.png', description: 'An ultra-fine translucent powder that locks makeup in place for 16 hours without adding weight or texture.' },
  { id: 8, name: 'Dewy Lip Oil', price: 28, category: 'Lips', image: '/prod_lipoil_1777131052194.png', description: 'A nourishing tinted lip oil infused with botanical extracts for an ultra-glossy, never-sticky finish.' },
];
