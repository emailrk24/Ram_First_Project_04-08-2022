import React, { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm(props) {
  const [enteredExpenseType, setEnteredExpenseType] = useState(
    "Property Expense"
  );
  const [enteredExpenseDate, setEnteredExpenseDate] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const expenseTypeChangeHandler = (event) => {
    setEnteredExpenseType(event.target.value);
  };
  const expenseDateChangeHandler = (event) => {
    setEnteredExpenseDate(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const formSubmitHandler = (event) => {
    console.log("Im in formSubmitHandler");
    event.preventDefault();

    const expenseDetail = {
      expenseType: enteredExpenseType,
      expenseDate: enteredExpenseDate,
      description: enteredDescription,
      amount: enteredAmount
    };

    console.log(expenseDetail);

    props.onSaveExpense(expenseDetail);

    setEnteredExpenseType("Property Expense");
    setEnteredExpenseDate("");
    setEnteredDescription("");
    setEnteredAmount("");
  };

  return (
    <div className="new-expense">
      <form onSubmit={formSubmitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Expense type</label>
            <select
              value={enteredExpenseType}
              onChange={expenseTypeChangeHandler}
            >
              <option value="Property Expense">Property Expense</option>
              <option value="Staff Welfare">Staff Welfare</option>
              <option value="Banking Expense">Banking Expense</option>
              <option value="Staff Advance">Staff Advance</option>
              <option value="UPI Expense">UPI Expense</option>
            </select>
          </div>
          <div className="new-expense__control">
            <label>Expense date</label>
            <input
              type="date"
              value={enteredExpenseDate}
              onChange={expenseDateChangeHandler}
            ></input>
          </div>
          <div className="new-expense__control">
            <label>Description</label>
            <input
              type="text"
              value={enteredDescription}
              onChange={descriptionChangeHandler}
            ></input>
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              value={enteredAmount}
              onChange={amountChangeHandler}
              min="0"
            ></input>
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancelExpense}>
            Cancel
          </button>
          <button type="submit">Add expense</button>
        </div>
      </form>
    </div>
  );
}
