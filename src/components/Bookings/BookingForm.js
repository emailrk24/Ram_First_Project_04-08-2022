import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "./BookingForm.css";
import { Checkbox, ListItemText } from "@mui/material";

const rooms = Array.from({ length: 16 }, (v, k) => k + 101).concat(
  Array.from({ length: 16 }, (v, k) => k + 201)
);

export default function BookingForm(props) {
  const [enteredCheckInDate, setEnteredCheckInDate] = useState("");
  const [enteredCheckOutDate, setEnteredCheckOutDate] = useState("");
  const [enteredNumberOfDays, setEnteredNumberOfDays] = useState(0);
  const [enteredSource, setEnteredSource] = useState("App");
  const [enteredBookingId, setEnteredBookingId] = useState("");
  const [enteredRoomNumber, setEnteredRoomNumber] = useState([]);
  const [enteredNumberOfRooms, setEnteredNumberOfRooms] = useState(0);
  const [enteredRentPerDay, setEnteredRentPerDay] = useState("");
  const [enteredEcAmount, setEnteredEcAmount] = useState("");
  const [enteredLcAmount, setEnteredLcAmount] = useState("");
  const [enteredOtherBill, setEnteredOtherBill] = useState("");
  const [enteredTotalBill, setEnteredTotalBill] = useState(0);
  const [enteredCashAtHotel, setEnteredCashAtHotel] = useState("");
  const [enteredUPI, setEnteredUPI] = useState("");
  const [enteredEDC, setEnteredEDC] = useState("");
  const [enteredAppPaidAmount, setEnteredAppPaidAmount] = useState("");
  const [enteredPendingAmount, setEnteredPendingAmount] = useState(0);
  const [enteredBookingStatus, setEnteredBookingStatus] = useState("Pending");

  useEffect(() => {
    setEnteredTotalBill(totalBill);
    setEnteredPendingAmount(pendingAmount);
  }, [
    enteredNumberOfDays,
    enteredNumberOfRooms,
    enteredRentPerDay,
    enteredEcAmount,
    enteredLcAmount,
    enteredOtherBill,
    enteredCashAtHotel,
    enteredUPI,
    enteredEDC,
    enteredAppPaidAmount
  ]);

  useEffect(() => {
    setEnteredNumberOfDays(numberOfDays);
  }, [enteredCheckInDate, enteredCheckOutDate]);

  const numberOfDays = () => {
    // console.log("numberOfDays");
    if (
      !isNaN(Date.parse(enteredCheckInDate)) &&
      !isNaN(Date.parse(enteredCheckOutDate))
    ) {
      return enteredCheckInDate === enteredCheckOutDate
        ? 1
        : (new Date(enteredCheckOutDate).getTime() -
            new Date(enteredCheckInDate).getTime()) /
            (1000 * 3600 * 24);
    } else {
      return 0;
    }
  };

  const totalBill = () => {
    // console.log("totalBill");
    return (
      Number(enteredNumberOfDays) *
        Number(enteredNumberOfRooms) *
        Number(enteredRentPerDay) +
      Number(enteredEcAmount) +
      Number(enteredLcAmount) +
      Number(enteredOtherBill)
    );
  };

  const pendingAmount = () => {
    // console.log("pendingAmount");
    return (
      totalBill() -
      Number(enteredCashAtHotel) -
      Number(enteredUPI) -
      Number(enteredEDC) -
      Number(enteredAppPaidAmount)
    );
  };

  const checkInDateChangeHandler = (event) => {
    setEnteredCheckInDate(event.target.value);
  };
  const checkOutDateChangeHandler = (event) => {
    setEnteredCheckOutDate(event.target.value);
  };
  const sourceChangeHandler = (event) => {
    setEnteredSource(event.target.value);
  };
  const bookingIdChangeHandler = (event) => {
    setEnteredBookingId(event.target.value);
  };
  const roomNoChangeHandler = (event) => {
    const {
      target: { value }
    } = event;
    setEnteredRoomNumber(typeof value === "string" ? value.split(",") : value);
    setEnteredNumberOfRooms(value.length);
  };
  const rentPerDayChangeHandler = (event) => {
    setEnteredRentPerDay(event.target.value);
  };
  const ecAmountChangeHandler = (event) => {
    setEnteredEcAmount(event.target.value);
  };
  const lcAmountChangeHandler = (event) => {
    setEnteredLcAmount(event.target.value);
  };
  const otherBillChangeHandler = (event) => {
    setEnteredOtherBill(event.target.value);
  };
  const cashAtHotelChangeHandler = (event) => {
    setEnteredCashAtHotel(event.target.value);
    // setEnteredPendingAmount(pendingAmount);
  };
  const uPIChangeHandler = (event) => {
    setEnteredUPI(event.target.value);
  };
  const eDCChangeHandler = (event) => {
    setEnteredEDC(event.target.value);
  };
  const appPaidAmountChangeHandler = (event) => {
    setEnteredAppPaidAmount(event.target.value);
  };
  const bookingStatusChangeHandler = (event) => {
    setEnteredBookingStatus(event.target.value);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const bookingDetail = {
      checkInDate: enteredCheckInDate,
      checkOutDate: enteredCheckOutDate,
      numberOfDays: enteredNumberOfDays,
      source: enteredSource,
      bookingId: enteredBookingId,
      roomNumber: enteredRoomNumber,
      numberOfRooms: enteredNumberOfRooms,
      rentPerDay: enteredRentPerDay,
      ecAmount: enteredEcAmount,
      lcAmount: enteredLcAmount,
      otherBill: enteredOtherBill,
      totalBill: enteredTotalBill,
      cashAtHotel: enteredCashAtHotel,
      UPI: enteredUPI,
      EDC: enteredEDC,
      appPaidAmount: enteredAppPaidAmount,
      pendingAmount: enteredPendingAmount,
      bookingStatus: enteredBookingStatus
    };

    console.log(bookingDetail);

    props.onSaveBooking(bookingDetail);

    setEnteredCheckInDate("");
    setEnteredCheckOutDate("");
    setEnteredNumberOfDays(0);
    setEnteredSource("App");
    setEnteredBookingId("");
    setEnteredRoomNumber([]);
    setEnteredNumberOfRooms(0);
    setEnteredRentPerDay("");
    setEnteredEcAmount("");
    setEnteredLcAmount("");
    setEnteredOtherBill("");
    setEnteredTotalBill(0);
    setEnteredCashAtHotel("");
    setEnteredUPI("");
    setEnteredEDC("");
    setEnteredAppPaidAmount("");
    setEnteredPendingAmount(0);
    setEnteredBookingStatus("Pending");
  };

  return (
    <div className="new-booking">
      <form onSubmit={formSubmitHandler}>
        <div className="new-booking__controls">
          <div className="new-booking__control">
            <label>Check-in</label>
            <input
              type="date"
              value={enteredCheckInDate}
              onChange={checkInDateChangeHandler}
            ></input>
          </div>
          <div className="new-booking__control">
            <label>Check-out</label>
            <input
              type="date"
              value={enteredCheckOutDate}
              onChange={checkOutDateChangeHandler}
            ></input>
          </div>
          <div className="new-booking__control new-booking__control_readOnly">
            <label>No. of days</label>
            <input type="number" disabled value={enteredNumberOfDays}></input>
          </div>
          <div className="new-booking__control">
            <label>Source</label>
            <select value={enteredSource} onChange={sourceChangeHandler}>
              <option value="App">App</option>
              <option value="Walk In">Walk In</option>
              <option value="Travel Agent">Travel Agent</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
          <div className="new-booking__control">
            <label>Booking Ref.</label>
            <input
              type="text"
              value={enteredBookingId}
              onChange={bookingIdChangeHandler}
            ></input>
          </div>
          <div className="new-booking__control">
            <label>Rooms</label>
            <Select
              sx={[
                {
                  "& .MuiSelect-outlined": {
                    backgroundColor: "#fff",
                    padding: "0.20rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    width: "10rem",
                    maxWidth: "100%"
                  }
                }
              ]}
              multiple
              value={enteredRoomNumber}
              onChange={roomNoChangeHandler}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Select room</em>
              </MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room} value={room}>
                  {/* {room} */}
                  <Checkbox checked={enteredRoomNumber.indexOf(room) > -1} />
                  <ListItemText primary={room} />
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="new-booking__control new-booking__control_readOnly">
            <label>No. of rooms</label>
            <input type="number" disabled value={enteredNumberOfRooms}></input>
          </div>
          <div className="new-booking__control">
            <label>Rent per day</label>
            <input
              type="number"
              value={enteredRentPerDay}
              onChange={rentPerDayChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control">
            <label>EC amount</label>
            <input
              type="number"
              value={enteredEcAmount}
              onChange={ecAmountChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control">
            <label>LC amount</label>
            <input
              type="number"
              value={enteredLcAmount}
              onChange={lcAmountChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control">
            <label>Other bill</label>
            <input
              type="number"
              value={enteredOtherBill}
              onChange={otherBillChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control new-booking__control_readOnly">
            <label>Total bill</label>
            <input type="number" disabled value={enteredTotalBill}></input>
          </div>
          <div className="new-booking__control">
            <label>Cash at hotel</label>
            <input
              type="number"
              value={enteredCashAtHotel}
              onChange={cashAtHotelChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control">
            <label>UPI</label>
            <input
              type="number"
              value={enteredUPI}
              onChange={uPIChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control">
            <label>EDC</label>
            <input
              type="number"
              value={enteredEDC}
              onChange={eDCChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control">
            <label>App paid amount</label>
            <input
              type="number"
              value={enteredAppPaidAmount}
              onChange={appPaidAmountChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-booking__control new-booking__control_readOnly">
            <label>Pending amount</label>
            <input type="number" disabled value={enteredPendingAmount}></input>
          </div>
          <div className="new-booking__control">
            <label>Booking status</label>
            <select
              value={enteredBookingStatus}
              onChange={bookingStatusChangeHandler}
            >
              <option value="Pending">Pending</option>
              <option value="CheckIn">CheckIn</option>
              <option value="CheckOut">CheckOut</option>
              <option value="No Show">No Show</option>
              <option value="InHouse">InHouse</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="new-booking__actions">
          <button
            type="button"
            className="cancel"
            onClick={props.onCancelBooking}
          >
            Cancel
          </button>
          <button type="submit">Add booking</button>
        </div>
      </form>
    </div>
  );
}
