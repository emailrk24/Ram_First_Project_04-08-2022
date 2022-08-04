import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter
} from "@mui/material";
import SearchBar from "material-ui-search-bar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    fontWeight: "bold",
    borderRight: "1px dashed white"
  },
  [`&.${tableCellClasses.body}`]: {
    borderRight: "1px dashed white",
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    borderRight: "1px dashed white"
  }
}));

// const useStyles = makeStyles((theme) => ({
//   table: {
//     minWidth: 650
//   },
//   tableContainer: {
//     borderRadius: 15,
//     margin: "10px 10px",
//     maxWidth: 1750
//   },
//   tableHeaderCell: {
//     fontWeight: "bold",
//     backgroundColor: theme.palette.primary.dark,
//     color: theme.palette.getContrastText(theme.palette.primary.dark)
//   },
//   avatar: {
//     backgroundColor: theme.palette.primary.light,
//     color: theme.palette.getContrastText(theme.palette.primary.light)
//   },
//   name: {
//     fontWeight: "bold",
//     color: theme.palette.secondary.dark
//   },
//   status: {
//     fontWeight: "bold",
//     fontSize: "0.75rem",
//     color: "white",
//     backgroundColor: "grey",
//     borderRadius: 8,
//     padding: "3px 10px",
//     display: "inline-block"
//   }
// }));

export default function BookingEntries(props) {
  // const classes = useStyles();
  let yearMonth = props.filteredMonthYear.split("-");

  const filteredBookings = props.bookingEntries.filter(
    (booking) =>
      new Date(booking.checkInDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(booking.checkInDate).getFullYear() === Number(yearMonth[0])
  );

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

  const [rows, setRows] = useState(filteredBookings);
  const [searched, setSearched] = useState("");
  const requestSearch = (searchedVal) => {
    const filteredRows = filteredBookings.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div>
      {rows.length === 0 && (
        <p className="no-booking-entries">No booking found</p>
      )}
      {rows.length > 0 && (
        <div>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          ></SearchBar>
          <TableContainer component={Paper} sx={{ borderRadius: 6 }}>
            <Table
              sx={{
                minWidth: 700,
                maxWidth: 1600
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" colSpan={9}>
                    Booking
                  </StyledTableCell>
                  <StyledTableCell align="center" colSpan={5}>
                    Billing
                  </StyledTableCell>
                  <StyledTableCell align="center" colSpan={5}>
                    Payment
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Check-in</StyledTableCell>
                  <StyledTableCell>Check-out</StyledTableCell>
                  <StyledTableCell>Source</StyledTableCell>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Room No.</StyledTableCell>
                  <StyledTableCell>No. of rooms</StyledTableCell>
                  <StyledTableCell>Days</StyledTableCell>
                  <StyledTableCell>Rent per day</StyledTableCell>
                  <StyledTableCell>EC</StyledTableCell>
                  <StyledTableCell>LC</StyledTableCell>
                  <StyledTableCell>Others</StyledTableCell>
                  <StyledTableCell>Total</StyledTableCell>
                  <StyledTableCell>Cash</StyledTableCell>
                  <StyledTableCell>UPI</StyledTableCell>
                  <StyledTableCell>EDC</StyledTableCell>
                  <StyledTableCell>Paid in App</StyledTableCell>
                  <StyledTableCell>Pending amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((booking) => (
                  <StyledTableRow key={booking.id}>
                    <StyledTableCell scope="row" onClick={idClickHandler}>
                      {booking.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(booking.checkInDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(booking.checkOutDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.source}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.bookingId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.bookingStatus}
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
                    <StyledTableCell align="right">
                      {booking.UPI}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.EDC}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {booking.appPaidAmount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {pendingAmount(booking)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
