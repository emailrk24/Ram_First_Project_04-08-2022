import React from "react";
import MaterialTable from "material-table";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Paper as PaperOld } from "@material-ui/core";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center"
}));

export default function AccountEntries(props) {
  let yearMonth = props.filteredMonthYear.split("-");
  const filteredBookings = props.bookingEntries.filter(
    (booking) =>
      new Date(booking.checkInDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(booking.checkInDate).getFullYear() === Number(yearMonth[0])
  );
  const totalBill = filteredBookings
    .reduce((accumulator, object) => {
      return accumulator + Number(object.totalBill);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalAppPaidValue = filteredBookings.reduce((accumulator, object) => {
    return accumulator + Number(object.appPaidAmount);
  }, 0);
  const totalAppPaid = totalAppPaidValue.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR"
  });
  const oyoDeduction = (totalAppPaidValue * 0.32).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR"
  });
  const oyoBalance = (
    totalAppPaidValue -
    totalAppPaidValue * 0.32
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR"
  });
  const totalCashAtHotel = filteredBookings
    .reduce((accumulator, object) => {
      return accumulator + Number(object.cashAtHotel);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalUPI = filteredBookings
    .reduce((accumulator, object) => {
      return accumulator + Number(object.UPI);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalEDC = filteredBookings
    .reduce((accumulator, object) => {
      return accumulator + Number(object.EDC);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalPendingAmount = filteredBookings
    .reduce((accumulator, object) => {
      return accumulator + Number(object.pendingAmount);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const filteredExpenses = props.expenseEntries.filter(
    (expense) =>
      new Date(expense.expenseDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(expense.expenseDate).getFullYear() === Number(yearMonth[0])
  );
  const totalExpense = filteredExpenses
    .reduce((accumulator, object) => {
      return accumulator + Number(object.amount);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalPropertyExpense = filteredExpenses
    .filter((expense) => expense.expenseType === "Property Expense")
    .reduce((accumulator, object) => {
      return accumulator + Number(object.amount);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalStaffWelfare = filteredExpenses
    .filter((expense) => expense.expenseType === "Staff Welfare")
    .reduce((accumulator, object) => {
      return accumulator + Number(object.amount);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalBankingExpense = filteredExpenses
    .filter((expense) => expense.expenseType === "Banking Expense")
    .reduce((accumulator, object) => {
      return accumulator + Number(object.amount);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalStaffAdvance = filteredExpenses
    .filter((expense) => expense.expenseType === "Staff Advance")
    .reduce((accumulator, object) => {
      return accumulator + Number(object.amount);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const totalUPIExpense = filteredExpenses
    .filter((expense) => expense.expenseType === "UPI Expense")
    .reduce((accumulator, object) => {
      return accumulator + Number(object.amount);
    }, 0)
    .toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR"
    });
  const filteredStaffDetails = props.staffEntries.filter(
    (staffEntry) => staffEntry.calendarMonthYear === props.filteredMonthYear
  );

  return (
    <div>
      <Box sx={{ pt: 3, pb: 2 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={4}
          columns={20}
        >
          <Grid item xs={5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#61b1ff"
              }}
            >
              <br />
              Total Business
              <br /> {totalBill} <br /> <br />
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#8ec7ff"
              }}
            >
              App paid <br /> {totalAppPaid}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#a5d2ff"
              }}
            >
              Cash at hotel <br /> {totalCashAtHotel}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#bbddff"
              }}
            >
              UPI payment <br /> {totalUPI}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#d2e8ff"
              }}
            >
              EDC payment <br /> {totalEDC}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#e8f3ff"
              }}
            >
              Pending amount <br /> {totalPendingAmount}
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#a64ca6"
              }}
            >
              <br /> Total Expenses <br /> {totalExpense} <br /> <br />
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#bf7fbf"
              }}
            >
              Property expense
              <br />
              {totalPropertyExpense}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#cc99cc"
              }}
            >
              Staff welfare
              <br />
              {totalStaffWelfare}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#d8b2d8"
              }}
            >
              Banking expense
              <br />
              {totalBankingExpense}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#e5cce5"
              }}
            >
              Staff advance
              <br />
              {totalStaffAdvance}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#f2e5f2"
              }}
            >
              UPI expense
              <br />
              {totalUPIExpense}
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#329932"
              }}
            >
              <br />
              OYO App
              <br />
              <br />
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#7fbf7f"
              }}
            >
              App Paid amount
              <br />
              {totalAppPaid}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#b2d8b2"
              }}
            >
              OYO deduction
              <br />
              {oyoDeduction}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#cce5cc"
              }}
            >
              Balance
              <br />
              {oyoBalance}
            </Item>
          </Grid>
        </Grid>
      </Box>
      <MaterialTable
        localization={{
          body: {
            emptyDataSourceMessage: ""
          }
        }}
        options={{
          showTitle: false,
          search: false,
          paging: false
        }}
        components={{
          Container: (props) => <PaperOld {...props} elevation={0} />
        }}
      />
    </div>
  );
}
