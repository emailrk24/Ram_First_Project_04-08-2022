import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import BookingEntries from "./components/Bookings/BookingEntries";
import RoomEntries from "./components/Rooms/RoomEntries";
import ExpenseEntries from "./components/Expenses/ExpenseEntries";
import AccountEntries from "./components/Accounts/AccountEntries";
import StaffEntries from "./components/Staffs/StaffEntries";
import CommonFilter from "./components/Features/CommonFilter";
import "./styles.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import {
  testBookingEntries,
  testRoomEntries,
  testExpenseEntries,
  testStaffEntries
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
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7"
  }
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: "Noto Sans JP",
    fontSize: theme.typography.pxToRem(16),
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
  const currentDay = new Date().getDate();
  const currentMonthYear =
    currentYear + "-" + (currentMonth > 10 ? currentMonth : "0" + currentMonth);
  const currentDate =
    currentYear +
    "-" +
    (currentMonth > 10 ? currentMonth : "0" + currentMonth) +
    "-" +
    (currentDay > 10 ? currentDay : "0" + currentDay);

  const [filteredMonthYear, setFilteredMonthYear] = useState(currentMonthYear);
  const [filteredDate, setFilteredDate] = useState(currentDate);

  const filterMonthChangeHandler = (selectedMonthYear) => {
    console.log("App.js - filterMonthChangeHandler : " + selectedMonthYear);
    setFilteredMonthYear(selectedMonthYear);
  };

  const filterDateChangeHandler = (selectedDate) => {
    console.log("App.js - filterDateChangeHandler : " + selectedDate);
    setFilteredDate(selectedDate);
  };

  const [bookings, setBookings] = useState(testBookingEntries);
  const [rooms, setRooms] = useState(testRoomEntries);
  const [expenses, setExpenses] = useState(testExpenseEntries);
  const [staffDetails, setStaffDetails] = useState(testStaffEntries);

  const addBookingHandler = (bookingDetail) => {
    setBookings((prevBookings) => {
      return [bookingDetail, ...prevBookings];
    });
  };

  const addExpenseHandler = (expenseDetail) => {
    setExpenses((prevExpenses) => {
      return [expenseDetail, ...prevExpenses];
    });
  };

  const addStaffDetailHandler = (staffDetail) => {
    setStaffDetails((prevStaffDetails) => {
      return [staffDetail, ...prevStaffDetails];
    });
  };

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="Appppppp">
      <Box
        sx={{
          width: "100%",
          fontFamily: "Noto Sans JP",
          fontSize: "0.80rem",
          borderRadius: "12px",
          bgcolor: "#2e1534" // "#1976d2" //"#471254"
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
                <CalendarMonthIcon /> BOOKINGS
              </div>
            }
          />
          <StyledTab
            value="2"
            label={
              <div>
                <BedroomParentIcon /> ROOMS
              </div>
            }
          />
          <StyledTab
            value="3"
            label={
              <div>
                <AccountBalanceWalletIcon /> EXPENSES
              </div>
            }
          />
          <StyledTab
            value="4"
            label={
              <div>
                <PeopleAltIcon /> STAFF MANAGEMENT
              </div>
            }
          />
          <StyledTab
            value="5"
            label={
              <div>
                <MenuBookIcon /> ACCOUNTS
              </div>
            }
          />
          <CommonFilter
            defaultMonthYear={filteredMonthYear}
            defaultDate={filteredDate}
            onChangeMonthFilter={filterMonthChangeHandler}
            onChangeDateFilter={filterDateChangeHandler}
          />
        </StyledTabs>
        <Box sx={{ p: 0.5 }} />
      </Box>
      <div>
        <TabPanel value={tabValue} index={"1"}>
          <BookingEntries
            bookingEntries={bookings}
            filteredMonthYear={filteredMonthYear}
            filteredDate={filteredDate}
            onSaveBooking={addBookingHandler}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={"2"}>
          <RoomEntries
            // roomEntries={rooms}
            filteredMonthYear={filteredMonthYear}
            filteredDate={filteredDate}
            bookingEntries={bookings}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={"3"}>
          <ExpenseEntries
            expenseEntries={expenses}
            filteredMonthYear={filteredMonthYear}
            filteredDate={filteredDate}
            onSaveExpense={addExpenseHandler}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={"4"}>
          <StaffEntries
            staffEntries={staffDetails}
            filteredMonthYear={filteredMonthYear}
            onSaveStaffDetail={addStaffDetailHandler}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={"5"}>
          <AccountEntries
            filteredMonthYear={filteredMonthYear}
            bookingEntries={bookings}
            expenseEntries={expenses}
            staffEntries={staffDetails}
          />
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
