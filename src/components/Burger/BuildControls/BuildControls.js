import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className="BuildControls">
         <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control=>(
            <BuildControl key={control.type} label={control.label}
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientremoved(control.type)}
            disableds={props.disabled[control.type]} 
            
             />
        ))}
        <button 
        className="OrderButton"
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;