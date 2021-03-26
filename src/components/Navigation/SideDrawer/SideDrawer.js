import React from "react";

import Logo from "../../Logo/Logo";

import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
const SideDrawer = (props) => {
  //----

  let attachClasses = ['SideDrawer', 'Close'];

  if(props.open)
  {
    attachClasses = ['SideDrawer', 'Open'];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}></Backdrop>
      <div className={attachClasses.join(' ')}>
        <Logo height="11%"></Logo>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
