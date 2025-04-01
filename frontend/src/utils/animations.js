export const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

export const homeVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};