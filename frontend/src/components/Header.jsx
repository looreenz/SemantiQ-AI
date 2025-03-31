import { pageVariants } from "../utils/animations";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Header(props) {
  const { title } = props;

  return (
    <div className="logo text-center sticky-top py-2 bg-grey">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ overflow: "hidden" }}
      >
        <h3 className="fs-2 m-0">{title}</h3>
      </motion.div>
    </div>
  );
}

export default Header;
