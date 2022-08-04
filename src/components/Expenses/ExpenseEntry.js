import "./ExpenseEntry.css";
import React, { useState } from "react";

export default function ExpenseEntry(props) {
  const [id, setId] = useState(props.id);

  const idClickHandler = () => {
    setId("changedId");
    console.log(id);
  };

  return (
    <div className="expense-entry">
      <h2 className="expense-entry__description" onClick={idClickHandler}>
        {id}
      </h2>
      <h5 className="expense-entry__date">
        {new Date(props.expenseDate).toLocaleDateString("en-GB")}
      </h5>
      <h4 className="expense-entry__description">{props.expenseType}</h4>
      <h2 className="expense-entry__description">{props.description}</h2>
      <h2 className="expense-entry__description">{props.amount}</h2>
    </div>
  );
}
