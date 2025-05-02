import { motion } from "framer-motion";

import { pageVariants } from "../utils/animations";

function Header(props) {
  const { title } = props;

  return (
    <div
      className="logo text-center sticky-top py-2 bg-grey"
      role="banner"
      aria-labelledby="page-title"
    >
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ overflow: "hidden" }}
      >
        <h3 id="page-title" className="fs-2 m-0" aria-live="polite">
          {title}
        </h3>
      </motion.div>
    </div>
  );
}

export default Header;
