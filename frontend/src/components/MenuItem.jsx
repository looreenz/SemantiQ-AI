import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MenuItem = ({ path, icon, label, active, setActive }) => {
  return (
    <li key={path} className="p-2 position-relative">
      {active === path && (
        <motion.div
          layoutId="activeIndicator"
          className="active rounded-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
      <Link
        to={path}
        onClick={() => setActive(path)}
        className="text-decoration-none text-white hover-underline-purple d-flex align-items-center"
        aria-label={`Ir a ${label}`}
      >
        <i className={`${icon} px-1`} aria-hidden="true"></i>
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
