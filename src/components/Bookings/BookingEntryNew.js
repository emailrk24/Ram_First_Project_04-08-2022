import "./BookingEntry.css";
import React, { useState } from "react";
import "../DisplayTable/BasicTable.css";

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
