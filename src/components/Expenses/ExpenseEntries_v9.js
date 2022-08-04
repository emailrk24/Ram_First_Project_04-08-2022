import React, { useState } from "react";
import "./ExpenseEntries.css";
import ExpenseEntry from "./ExpenseEntry";
import CommonFilter from "../CommonFilter";

export default function ExpenseEntries(props) {
  const currentMonth = new Date().toLocaleString("en-GB", { month: "short" });
  const [filteredMonth, setFilteredMonth] = useState(currentMonth);

  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  const filteredExpenses = props.expenseEntries.filter(
    (expense) =>
      new Date(expense.expenseDate).toLocaleString("en-GB", {
        month: "short"
      }) === filteredMonth
  );

  return (
    <div className="expense-entries">
      <CommonFilter
        defaultMonth={filteredMonth}
        onChangeFilter={filterChangeHandler}
      />
      {/* dynamically populate the array into a JSX element - 
      an alternate to rendering each object from an array into a JSX element*/}
      {filteredExpenses.length === 0 && (
        <p className="no-expense-entries">No expense found</p>
      )}
      {filteredExpenses.map((expense) => (
        <ExpenseEntry
          key={expense.id}
          id={expense.id}
          expenseType={expense.expenseType}
          expenseDate={expense.expenseDate}
          description={expense.description}
          amount={expense.amount}
        />
      ))}
    </div>
  );
}
