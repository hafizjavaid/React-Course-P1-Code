import React from "react";

import "./Input.css";

const Input = (props) => {

  let inputElement = null;
  const classes = ['InputElement'];
  if(props.invalid && props.shouldValidate && props.touched){
      classes.push('Invalid');
  }
  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          
        onChange={props.changed}
        className={classes.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          
        onChange={props.changed}
        className={classes.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select 
        onChange={props.changed}
        className={classes.join(' ')} value={props.value}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          
        onChange={props.changed}
        className={classes.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className="Input">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
