import React, { useState } from "react";
import BookingEntries from "./components/Bookings/BookingEntries";
import ExpenseEntries from "./components/Expenses/ExpenseEntries";
import CommonFilter from "./components/Features/CommonFilter";
import Login from "./components/Login/Login";
import "./styles.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Divider from "@mui/material/Divider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const testBookingEntries = [
  {
    id: 9999,
    checkInDate: "2022-08-15",
    checkOutDate: "2022-08-19",
    source: "App",
    bookingId: "SK4 1LW",
    roomNumber: "5A",
    numberOfRooms: 2,
    rentPerDay: 100,
    ecAmount: 10,
    lcAmount: 20,
    otherBill: 30,
    cashAtHotel: 100,
    UPI: 0,
    EDC: 0,
    appPaidAmount: 40,
    bookingStatus: "INHOUSE"
  },
  {
    id: 9998,
    checkInDate: "2022-08-20",
    checkOutDate: "2022-08-25",
    source: "WalkIn",
    bookingId: "G28AJ",
    roomNumber: "1A",
    numberOfRooms: 1,
    rentPerDay: 100,
    ecAmount: 10,
    lcAmount: 20,
    otherBill: 30,
    cashAtHotel: 100,
    UPI: 0,
    EDC: 0,
    appPaidAmount: 40,
    bookingStatus: "INHOUSE"
  },
  {
    id: 8888,
    checkInDate: "2022-08-20",
    checkOutDate: "2022-08-25",
    source: "WalkIn",
    bookingId: "CF6AJ",
    roomNumber: "1A",
    numberOfRooms: 1,
    rentPerDay: 100,
    ecAmount: 10,
    lcAmount: 20,
    otherBill: 30,
    cashAtHotel: 100,
    UPI: 0,
    EDC: 0,
    appPaidAmount: 40,
    bookingStatus: "INHOUSE"
  },
  {
    id: 9001,
    checkInDate: "2022-08-20",
    checkOutDate: "2022-08-25",
    source: "WalkIn",
    bookingId: "641108",
    roomNumber: "1A",
    numberOfRooms: 1,
    rentPerDay: 100,
    ecAmount: 10,
    lcAmount: 20,
    otherBill: 30,
    cashAtHotel: 100,
    UPI: 0,
    EDC: 0,
    appPaidAmount: 40,
    bookingStatus: "INHOUSE"
  },
  {
    id: 9000,
    checkInDate: "2022-08-27",
    checkOutDate: "2022-08-30",
    source: "App",
    bookingId: "641108",
    roomNumber: "10",
    numberOfRooms: 2,
    rentPerDay: 100,
    ecAmount: 10,
    lcAmount: 20,
    otherBill: 30,
    cashAtHotel: 100,
    UPI: 0,
    EDC: 0,
    appPaidAmount: 40,
    bookingStatus: "CANCEL"
  },
  {
    id: 8999,
    checkInDate: "2022-05-24",
    checkOutDate: "2022-05-24",
    source: "App",
    bookingId: "SK4 1LW",
    roomNumber: "5A",
    numberOfRooms: 2,
    rentPerDay: 100,
    ecAmount: 10,
    lcAmount: 20,
    otherBill: 30,
    cashAtHotel: 100,
    UPI: 0,
    EDC: 0,
    appPaidAmount: 40,
    bookingStatus: "INHOUSE"
  }
];

const testExpenseEntries = [
  {
    id: 999,
    expenseType: "Property expense",
    expenseDate: "2022-08-19",
    description: "Water",
    amount: "315"
  },
  {
    id: 998,
    expenseType: "Staff welfare",
    expenseDate: "2022-08-20",
    description: "Manoj",
    amount: "200"
  },
  {
    id: 997,
    expenseType: "Utensils",
    expenseDate: "2022-05-20",
    description: "Plates",
    amount: "200"
  },
  {
    id: 996,
    expenseType: "Maintenance",
    expenseDate: "2022-08-20",
    description: "Cleaning",
    amount: "200"
  },
  {
    id: 999,
    expenseType: "Property expense",
    expenseDate: "2022-08-19",
    description: "Water",
    amount: "315"
  },
  {
    id: 998,
    expenseType: "Staff welfare",
    expenseDate: "2022-08-20",
    description: "Manoj",
    amount: "200"
  },
  {
    id: 997,
    expenseType: "Utensils",
    expenseDate: "2022-05-20",
    description: "Plates",
    amount: "200"
  },
  {
    id: 996,
    expenseType: "Maintenance",
    expenseDate: "2022-08-20",
    description: "Cleaning",
    amount: "200"
  },
  {
    id: 999,
    expenseType: "Property expense",
    expenseDate: "2022-08-19",
    description: "Water",
    amount: "315"
  },
  {
    id: 998,
    expenseType: "Staff welfare",
    expenseDate: "2022-08-20",
    description: "Manoj",
    amount: "200"
  },
  {
    id: 997,
    expenseType: "Utensils",
    expenseDate: "2022-05-20",
    description: "Plates",
    amount: "200"
  },
  {
    id: 996,
    expenseType: "Maintenance",
    expenseDate: "2022-08-20",
    description: "Cleaning",
    amount: "200"
  },
  {
    id: 999,
    expenseType: "Property expense",
    expenseDate: "2022-08-19",
    description: "Water",
    amount: "315"
  },
  {
    id: 998,
    expenseType: "Staff welfare",
    expenseDate: "2022-08-20",
    description: "Manoj",
    amount: "200"
  },
  {
    id: 997,
    expenseType: "Utensils",
    expenseDate: "2022-05-20",
    description: "Plates",
    amount: "200"
  },
  {
    id: 996,
    expenseType: "Maintenance",
    expenseDate: "2022-08-20",
    description: "Cleaning",
    amount: "200"
  },
  {
    id: 999,
    expenseType: "Property expense",
    expenseDate: "2022-08-19",
    description: "Water",
    amount: "315"
  },
  {
    id: 998,
    expenseType: "Staff welfare",
    expenseDate: "2022-08-20",
    description: "Manoj",
    amount: "200"
  },
  {
    id: 997,
    expenseType: "Utensils",
    expenseDate: "2022-05-20",
    description: "Plates",
    amount: "200"
  },
  {
    id: 996,
    expenseType: "Maintenance",
    expenseDate: "2022-08-20",
    description: "Cleaning",
    amount: "200"
  },
  {
    id: 999,
    expenseType: "Property expense",
    expenseDate: "2022-08-19",
    description: "Water",
    amount: "315"
  },
  {
    id: 998,
    expenseType: "Staff welfare",
    expenseDate: "2022-08-20",
    description: "Manoj",
    amount: "200"
  },
  {
    id: 997,
    expenseType: "Utensils",
    expenseDate: "2022-05-20",
    description: "Plates",
    amount: "200"
  },
  {
    id: 996,
    expenseType: "Maintenance",
    expenseDate: "2022-08-20",
    description: "Cleaning",
    amount: "200"
  },
  {
    id: 999,
    expenseType: "Property expense",
    expenseDate: "2022-08-19",
    description: "Water",
    amount: "315"
  },
  {
    id: 998,
    expenseType: "Staff welfare",
    expenseDate: "2022-08-20",
    description: "Manoj",
    amount: "200"
  },
  {
    id: 997,
    expenseType: "Utensils",
    expenseDate: "2022-05-20",
    description: "Plates",
    amount: "200"
  },
  {
    id: 996,
    expenseType: "Maintenance",
    expenseDate: "2022-08-20",
    description: "Cleaning",
    amount: "200"
  }
];

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
    // props.setOpenPopup(false);
  };

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="Appppppp">
      {/* <Login /> */}
      {/* <div style={{ fontSize: "2rem" }} align="center">
        Hotel - Expense Management Platform
      </div>
      <Divider /> */}
      <Box
        sx={{ width: "100%", fontFamily: "Noto Sans JP", fontSize: "0.80rem" }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            value="1"
            label={
              <div>
                <CalendarMonthIcon />
                Bookings
              </div>
            }
          />
          <Tab
            value="2"
            label={
              <div>
                <AccountBalanceWalletIcon /> Expenses
              </div>
            }
          />
          <Tab
            value="3"
            label={
              <div>
                <MenuBookIcon />
                Accounts
              </div>
            }
          />
          <CommonFilter
            defaultMonthYear={filteredMonthYear}
            onChangeFilter={filterChangeHandler}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={"1"}>
        <BookingEntries
          bookingEntries={bookings}
          filteredMonthYear={filteredMonthYear}
          onSaveBooking={addBookingHandler}
        />
        {/* <NewBooking onSaveBooking={addBookingHandler} /> */}
      </TabPanel>
      <TabPanel value={tabValue} index={"2"}>
        <ExpenseEntries
          expenseEntries={expenses}
          filteredMonthYear={filteredMonthYear}
          onSaveExpense={addExpenseHandler}
        />
        {/* <NewExpense onSaveExpense={addExpenseHandler} /> */}
      </TabPanel>
      <TabPanel value={tabValue} index={"3"}>
        Account details
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  // console.log(children + " # " + value + " # " + index);
  return <div>{value === index && children}</div>;
}
