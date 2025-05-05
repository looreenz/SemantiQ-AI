// Animation variants for page transitions
export const pageVariants = {
  initial: { opacity: 0, y: 50 }, // Start off-screen (bottom) and transparent
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }, // Smooth entrance animation
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3 }, // Exit upwards with fade out
  },
};

// Animation variants specifically for homepage sections
export const homeVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
    },
  },
};

// Animation variants for menu item transitions
export const menuItemVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    }
  },
}
