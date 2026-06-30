/** Intersection plus permissif — évite les images invisibles sur mobile */
export const inView = { once: true, amount: 0.01 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

/** Animation sans opacity — l'image reste visible même si whileInView ne fire pas */
export const slideUp = {
  hidden: { y: 20 },
  visible: { y: 0, transition: { duration: 0.5 } },
};
