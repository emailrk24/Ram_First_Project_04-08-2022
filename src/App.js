import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import BookingEntries from "./components/Bookings/BookingEntries";
import ExpenseEntries from "./components/Expenses/ExpenseEntries";
import AccountEntries from "./components/Accounts/AccountEntries";
import CommonFilter from "./components/Features/CommonFilter";
import Login from "./components/Login/Login";
import "./styles.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import {
  testBookingEntries,
  testExpenseEntries
} from "./components/Constants/TestDataSet";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 40,
    // width: "100%",
    backgroundColor: "#635ee7"
  }
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff"
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)"
    }
  })
);

export default function App() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthYear =
    currentYear + "-" + (currentMonth > 10 ? currentMonth : "0" + currentMonth);

  const [filteredMonthYear, setFilteredMonthYear] = useState(currentMonthYear);

  const filterChangeHandler = (selectedMonthYear) => {
    console.log("App.js - filterChangeHandler : " + selectedMonthYear);
    setFilteredMonthYear(selectedMonthYear);
  };

  const [bookings, setBookings] = useState(testBookingEntries);
  const [expenses, setExpenses] = useState(testExpenseEntries);

  const addBookingHandler = (bookingDetail) => {
    setBookings((prevBookings) => {
      return [bookingDetail, ...prevBookings];
    });
  };

  const addExpenseHandler = (expenseDetail) => {
    console.log(
      "Im in addExpenseHandler : " + JSON.stringify(expenseDetail, null, 4)
    );
    setExpenses((prevExpenses) => {
      return [expenseDetail, ...prevExpenses];
    });
    console.table(expenses);
  };

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="Appppppp">
      {/* <Login /> */}
      <Box
        sx={{
          width: "100%",
          fontFamily: "Noto Sans JP",
          fontSize: "0.80rem",
          borderRadius: "12px",
          bgcolor: "#2e1534" //"#471254"
        }}
      >
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <StyledTab
            value="1"
            label={
              <div>
                <CalendarMonthIcon />
                BOOKINGS
              </div>
            }
          />
          <StyledTab
            value="2"
            label={
              <div>
                <AccountBalanceWalletIcon /> EXPENSES
              </div>
            }
          />
          <StyledTab
            value="3"
            label={
              <div>
                <MenuBookIcon />
                ACCOUNTS
              </div>
            }
          />
          <CommonFilter
            defaultMonthYear={filteredMonthYear}
            onChangeFilter={filterChangeHandler}
          />
        </StyledTabs>
        <Box sx={{ p: 0.5 }} />
      </Box>
      <div>
        <TabPanel value={tabValue} index={"1"}>
          <BookingEntries
            bookingEntries={bookings}
            filteredMonthYear={filteredMonthYear}
            onSaveBooking={addBookingHandler}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={"2"}>
          <ExpenseEntries
            expenseEntries={expenses}
            filteredMonthYear={filteredMonthYear}
            onSaveExpense={addExpenseHandler}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={"3"}>
          Account details...
          <AccountEntries />
        </TabPanel>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  // console.log(children + " # " + value + " # " + index);
  return <div>{value === index && children}</div>;
}
