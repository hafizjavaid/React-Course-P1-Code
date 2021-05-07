import React from "react";

import { NavLink } from "react-router-dom";
import "./NavigationItems.css";
const NavigationItems = () => {
  return (
    <ul className="NavigationItems">
      <li className="NavigationItem">
        <NavLink exact to="/">Burger Builder</NavLink>
      </li>
      <li className="NavigationItem">
        <NavLink to="/orders"> Orders</NavLink>
      </li>
    </ul>
  );
};

export default NavigationItems;
