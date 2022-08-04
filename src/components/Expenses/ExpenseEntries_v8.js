import React, { useState } from "react";
import "./ExpenseEntries.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    //backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function ExpenseEntries(props) {
  let yearMonth = props.filteredMonthYear.split("-");

  const filteredExpenses = props.expenseEntries.filter(
    (expense) =>
      new Date(expense.expenseDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(expense.expenseDate).getFullYear() === Number(yearMonth[0])
  );

  const [id, setId] = useState(props.id);

  const idClickHandler = () => {
    setId("changedId");
    console.log(id);
  };

  return (
    <div className="expense-entriesssssssssss">
      {/* <CommonFilter
        defaultMonth={filteredMonth}
        onChangeFilter={filterChangeHandler}
      /> */}
      {/* dynamically populate the array into a JSX element - 
      an alternate to rendering each object from an array into a JSX element*/}

      {filteredExpenses.length === 0 && (
        <p className="no-expense-entries">No expense found</p>
      )}
      {filteredExpenses.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">Expense date</StyledTableCell>
                <StyledTableCell align="right">Expense type</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <StyledTableRow key={expense.id}>
                  <StyledTableCell scope="row">{expense.id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(expense.expenseDate).toLocaleDateString("en-GB")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {expense.expenseType}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {expense.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {expense.amount}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
