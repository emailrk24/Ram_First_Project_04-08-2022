import React, { useState } from "react";
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
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function BookingEntryNew(props) {
  const checkInDate = new Date(props.checkInDate);
  const checkOutDate = new Date(props.checkOutDate);

  const numberOfDays = () => {
    return (
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
    );
  };

  const totalBill = () => {
    return (
      props.numberOfRooms * numberOfDays() * props.rentPerDay +
      props.ecAmount +
      props.lcAmount +
      props.otherBill
    );
  };

  const pendingAmount = () => {
    return (
      totalBill() -
      props.cashAtHotel -
      props.UPI -
      props.EDC -
      props.appPaidAmount
    );
  };

  const [id, setId] = useState(props.id);

  const idClickHandler = () => {
    setId("changedId");
    console.log(id);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={props.name}>
              <StyledTableCell component="th" scope="row">
                {props.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                {checkInDate.toLocaleDateString("en-GB")}
              </StyledTableCell>
              <StyledTableCell align="right">
                {checkOutDate.toLocaleDateString("en-GB")}
              </StyledTableCell>
              <StyledTableCell align="right">{props.source}</StyledTableCell>
              <StyledTableCell align="right">{props.bookingId}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <table>
        <tr>
          <td>{id}</td>
          <td>{checkInDate.toLocaleDateString("en-GB")}</td>
          <td>{checkOutDate.toLocaleDateString("en-GB")}</td>
          <td>{props.source}</td>
          <td>{props.bookingId}</td>
          <td>{props.roomNumber}</td>
          <td>{props.numberOfRooms}</td>
          <td>{numberOfDays()}</td>
          <td>{props.rentPerDay}</td>
          <td>{props.ecAmount}</td>
          <td>{props.lcAmount}</td>
          <td>{props.otherBill}</td>
          <td>{props.otherBill}</td>
          <td>{totalBill()}</td>
          <td>{props.cashAtHotel}</td>
          <td>{props.UPI}</td>
          <td>{props.EDC}</td>
          <td>{props.appPaidAmount}</td>
          <td>{pendingAmount()}</td>
          <td>{props.bookingStatus}</td>
        </tr>
      </table>
    </div>
  );
}
