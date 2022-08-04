import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

export default function NewExpense(props) {
  const [isEditing, setIsEditing] = useState(false);

  const newExpenseHandler = () => {
    setIsEditing(true);
  };

  const cancelExpenseHandler = () => {
    setIsEditing(false);
  };

  const addExpenseHandler = (enteredExpenseDetail) => {
    console.log("addExpenseHandler : " + enteredExpenseDetail);
    const expenseDetail = {
      ...enteredExpenseDetail,
      id: Math.round(Math.random() * (9997 - 9000) + 9000)
    };
    props.onSaveExpense(expenseDetail);
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={newExpenseHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpense={addExpenseHandler}
          onCancelExpense={cancelExpenseHandler}
        />
      )}
    </div>
  );
}
