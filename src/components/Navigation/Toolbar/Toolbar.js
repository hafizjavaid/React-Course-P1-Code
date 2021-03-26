import React from 'react'

import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import "./Toolbar.css"
const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            <div className="DrawerToggle" onClick={props.iconClicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo height="80%"></Logo>
            <nav className="desktop">
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    )
}

export default Toolbar;
