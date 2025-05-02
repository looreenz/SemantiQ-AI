// Animation variants for page transitions
export const pageVariants = {
  initial: { opacity: 0, y: 50 }, // Start off-screen (bottom) and transparent
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 } // Smooth entrance animation
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3 } // Exit upwards with fade out
  },
};

// Animation variants specifically for homepage sections
export const homeVariants = {
  initial: { opacity: 0, scale: 0.9 }, // Slightly zoomed out and transparent
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 } // Zoom-in with fade-in effect
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3 } // Exit with upward motion and fade
  },
};
