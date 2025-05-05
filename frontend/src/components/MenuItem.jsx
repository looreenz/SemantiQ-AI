import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { menuItemVariants } from "../utils/animations";

// MenuItem represents a single item in the sidebar navigation menu
const MenuItem = ({ path, icon, label, active, setActive }) => {
  return (
    <li key={path} className="p-2 position-relative">
      {/* Animated background indicator for the active menu item */}
      {active === path && (
        <motion.div
          layoutId="activeIndicator" // Shared layout ID for smooth animation
          className="active rounded-4" // Custom class for styling the indicator
          variants={menuItemVariants}
        />
      )}

      {/* Link to route with icon and label */}
      <Link
        to={path}
        onClick={() => setActive(path)} // Update active state on click
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
