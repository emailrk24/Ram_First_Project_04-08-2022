import React, { useState } from "react";
import "./BookingEntries.css";

import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

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

export default function BookingEntries(props) {
  // console.log("Im before filteredBookings : " + props.filteredMonth);

  let yearMonth = props.filteredMonthYear.split("-");

  const filteredBookings = props.bookingEntries.filter(
    (booking) =>
      new Date(booking.checkInDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(booking.checkInDate).getFullYear() === Number(yearMonth[0])
  );

  /* const filteredBookings = props.bookingEntries.filter(
    (booking) =>
      new Date(booking.checkInDate).toLocaleString("en-GB", {
        month: "short"
      }) === props.filteredMonth ||
      new Date(booking.checkOutDate).toLocaleString("en-GB", {
        month: "short"
      }) === props.filteredMonth
  ); */

  const numberOfDays = (booking) => {
    return (
      (new Date(booking.checkOutDate).getTime() -
        new Date(booking.checkInDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };

  const totalBill = (booking) => {
    return (
      booking.numberOfRooms * numberOfDays(booking) * booking.rentPerDay +
      booking.ecAmount +
      booking.lcAmount +
      booking.otherBill
    );
  };

  const pendingAmount = (booking) => {
    return (
      totalBill(booking) -
      booking.cashAtHotel -
      booking.UPI -
      booking.EDC -
      booking.appPaidAmount
    );
  };

  const [id, setId] = useState(props.id);

  const idClickHandler = () => {
    setId("changedId");
    console.log(id);
  };

  return (
    <div className="booking-entriessssssssss">
      {/* <CommonFilter
        defaultMonth={filteredMonth}
        onChangeFilter={filterChangeHandler}
      /> */}
      {/* dynamically populate the array into a JSX element - 
      an alternate to rendering each object from an array into a JSX element*/}

      {filteredBookings.length === 0 && (
        <p className="no-booking-entries">No booking found</p>
      )}
      {filteredBookings.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No</StyledTableCell>
                <StyledTableCell>Check-in</StyledTableCell>
                <StyledTableCell>Check-out</StyledTableCell>
                <StyledTableCell>Source</StyledTableCell>
                <StyledTableCell>Booking Id</StyledTableCell>
                <StyledTableCell align="right">Room No.</StyledTableCell>
                <StyledTableCell align="right">No. of rooms</StyledTableCell>
                <StyledTableCell align="right">No. of days</StyledTableCell>
                <StyledTableCell align="right">Rent per day</StyledTableCell>
                <StyledTableCell align="right">EC amount</StyledTableCell>
                <StyledTableCell align="right">LC amount</StyledTableCell>
                <StyledTableCell align="right">Other bill</StyledTableCell>
                <StyledTableCell align="right">Total bill</StyledTableCell>
                <StyledTableCell align="right">Cash at hotel</StyledTableCell>
                <StyledTableCell align="right">UPI</StyledTableCell>
                <StyledTableCell align="right">EDC</StyledTableCell>
                <StyledTableCell align="right">App paid amount</StyledTableCell>
                <StyledTableCell align="right">Pending amount</StyledTableCell>
                <StyledTableCell align="right">Booking status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
                <StyledTableRow key={booking.id}>
                  <StyledTableCell scope="row" onClick={idClickHandler}>
                    {booking.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(booking.checkInDate).toLocaleDateString("en-GB")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(booking.checkOutDate).toLocaleDateString("en-GB")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.source}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.bookingId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.numberOfRooms}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {numberOfDays(booking)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.rentPerDay}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.ecAmount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.lcAmount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.otherBill}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {totalBill(booking)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.cashAtHotel}
                  </StyledTableCell>
                  <StyledTableCell align="right">{booking.UPI}</StyledTableCell>
                  <StyledTableCell align="right">{booking.EDC}</StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.appPaidAmount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {pendingAmount(booking)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking.bookingStatus}
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
