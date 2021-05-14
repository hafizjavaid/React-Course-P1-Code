import React, { Component } from 'react'
// import connect
import { connect } from 'react-redux';
// import Redirect
import * as actions from '../../../store/actions/index'
import { Redirect } from 'react-router-dom';
class Logout extends Component {

    componentDidMount(){
        this.props.onLogout();
        console.log("Loging Out");
    }
    render() {
        return <Redirect to="/" />
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onLogout: () => dispatch(actions.logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);
