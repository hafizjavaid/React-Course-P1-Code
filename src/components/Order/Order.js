import React from "react";

import "./Order.css";
const Order = (props) => {
  const ingradients = [];

  for (let ingradientsName in props.ingradients) {
    ingradients.push({
      name: ingradientsName,
      amount: props.ingradients[ingradientsName],
    });
  }

  const ingradientsOut = ingradients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
          border: '1px solid #ccc'
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className="order">
      <p>Ingradients: {ingradientsOut}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
