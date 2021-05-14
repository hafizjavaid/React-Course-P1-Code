import React, { Component } from "react";

import { connect } from "react-redux";
import "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
// import Spinner
// import connect
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';
// import Redirect
import { Redirect } from 'react-router-dom';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementtype: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
          autoComplete: "off",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementtype: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Email",
          autoComplete: "off",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true
  };
  componentDidMount(){
    if(!this.props.building && this.props.authPath !== '/')
    {
      this.props.onSetAuthPath();
    }
  }
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  inputChange = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    this.setState({
      controls: updatedControls,
    });
  };
  switchAuth = () =>{

    this.setState(prevState=>{
        return {isSignup: !prevState.isSignup}
    })
  }
  render() {
    const formArray = [];

    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementtype={formElement.config.elementtype}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        label={formElement.id.toUpperCase()}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChange(event, formElement.id)}
      ></Input>
    ));
    if(this.props.loading)
    {
        form = <Spinner />;
    }
    let errorMsg = null;
    if(this.props.error)
    {
        errorMsg = (
            <p>{this.props.error.message}</p>
        )
    }
    let authRedirect = null;
    if(this.props.isAuthenticated )
    {
      authRedirect = <Redirect to={this.props.authPath} />
    }
    return (
      <div className="Auth">
        {authRedirect}
        {errorMsg}
        <form onSubmit={this.submitHandler}>{form}</form>
        <Button btnType="Success"
        clicked={this.submitHandler}>Submit</Button>
         <Button btnType="Danger"
        clicked={this.switchAuth}>Switch to {this.state.isSignup ? 'Signin' : 'Signup'}</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      building: state.burgerBuilder.building,
      authPath: state.auth.authPath

    };
  };
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthPath: () => dispatch(actions.setAuthPath('/'))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
