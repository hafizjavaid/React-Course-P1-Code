import React, { Component } from "react";
import "./Layout.css";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends Component {

 
  // State
  state = {
    showSidebar: false,
  }

  // SideHandler
   sideHandler = () => {

    this.setState({showSidebar: false})
  }
  

   // SideHandler
   toggleSide = () => {
    this.setState((prevState) =>
      {
      return { 
        showSidebar: !prevState.showSidebar 
      }
    })
  }
  render() {
    return (
      <Aux>
        <Toolbar iconClicked={this.toggleSide}></Toolbar>
        <SideDrawer open={this.state.showSidebar} closed={this.sideHandler}></SideDrawer>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
