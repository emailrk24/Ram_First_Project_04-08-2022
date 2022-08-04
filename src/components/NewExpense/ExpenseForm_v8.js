import React, { useState } from "react";
import "./ExpenseForm.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ExpenseForm(props) {
  const [enteredExpenseType, setEnteredExpenseType] = useState("");
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
    event.preventDefault();

    const expenseDetail = {
      expenseType: enteredExpenseType,
      expenseDate: enteredExpenseDate,
      description: enteredDescription,
      amount: enteredAmount
    };

    console.log(expenseDetail);

    props.onSaveExpense(expenseDetail);

    setEnteredExpenseType("");
    setEnteredExpenseDate("");
    setEnteredDescription("");
    setEnteredAmount("");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Expense
      </Button>
      <Dialog>
        <DialogContent
          className="new-expense__controls"
          onSubmit={formSubmitHandler}
        >
          <div className="new-expense__control">
            <label>Expense type (dropdown)</label>
            <input
              type="text"
              value={enteredExpenseType}
              onChange={expenseTypeChangeHandler}
            ></input>
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
            ></input>
          </div>
        </DialogContent>
        <DialogActions className="new-expense__actions">
          <button type="button" onClick={props.onCancelExpense}>
            Cancel
          </button>
          <button type="submit">Add expense</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
