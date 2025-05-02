import { motion } from "framer-motion";

import { pageVariants } from "../utils/animations";

function Header(props) {
  const { title } = props;

  return (
    // Header banner for the page
    <div
      className="logo text-center sticky-top py-2 bg-grey"
      role="banner"
      aria-labelledby="page-title"
    >
      {/* Animated title using Framer Motion */}
      <motion.div
        variants={pageVariants} // Animation keyframes
        initial="initial" // Initial state
        animate="animate" // Animation on mount
        exit="exit" // Animation on unmount
        style={{ overflow: "hidden" }}
      >
        <h3 id="page-title" className="fs-2 m-0" aria-live="polite">
          {title} {/* Page title displayed */}
        </h3>
      </motion.div>
    </div>
  );
}

export default Header;
