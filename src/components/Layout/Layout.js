import React, { Component } from "react";
import "./Layout.css";
import { connect } from 'react-redux';
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";

// import connect
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  // State
  state = {
    showSidebar: false,
  };

  // SideHandler
  sideHandler = () => {
    this.setState({ showSidebar: false });
  };

  // SideHandler
  toggleSide = () => {
    this.setState((prevState) => {
      return {
        showSidebar: !prevState.showSidebar,
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar 
        iconClicked={this.toggleSide}
        isAuth={this.props.isAuthenticated}> </Toolbar>{" "}
        <SideDrawer 
        open={this.state.showSidebar}
        closed={this.sideHandler}
        isAuth={this.props.isAuthenticated}>
         
        </SideDrawer>
        <div> Toolbar, Sidebar, Backdrop </div>{" "}
        <main className="content"> {this.props.children} </main>{" "}
      </Aux>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null,
  }
}
export default connect(mapStateToProps)(Layout);
