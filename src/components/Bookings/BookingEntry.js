import "./BookingEntry.css";
import React, { useState } from "react";

export default function BookingEntry(props) {
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
    <div className="booking-entry">
      {/* <div className="header">
        <h3>Checkin date</h3>
        <h3>Checkout date</h3>
        <h2 className="booking-entry__description">Source</h2>
        <h2 className="booking-entry__description">Booking Id</h2>
        <h3>Room no.</h3>
        <h3>No. of rooms</h3>
        <h3>No. of days</h3>
        <h3>Rent per day</h3>
        <h3>EC amoount</h3>
        <h3>LC amount</h3>
        <h3>Other bill</h3>
        <h3 className="booking-entry__price">Total bill</h3>
        <h3>Cash at hotel</h3>
        <h3>UPI</h3>
        <h3>EDC</h3>
        <h3>App paid amount</h3>
        <h3 className="booking-entry__price">Pending amount</h3>
        <h3>Booking status</h3>
      </div> */}
      <h2 className="booking-entry__description" onClick={idClickHandler}>
        {id}
      </h2>
      <h5 className="booking-entry__date">
        {checkInDate.toLocaleDateString("en-GB")}
      </h5>
      <h4 className="booking-entry__date">
        {checkOutDate.toLocaleDateString("en-GB")}
      </h4>
      <h4 className="booking-entry__description">{props.source}</h4>
      <h2 className="booking-entry__description">{props.bookingId}</h2>
      <h2 className="booking-entry__description">{props.roomNumber}</h2>
      <h2 className="booking-entry__description">{props.numberOfRooms}</h2>
      <h2 className="booking-entry__description">{numberOfDays()}days</h2>
      <h2 className="booking-entry__description">{props.rentPerDay}</h2>
      <h2 className="booking-entry__description">{props.ecAmount}</h2>
      <h2 className="booking-entry__description">{props.lcAmount}</h2>
      <h2 className="booking-entry__description">{props.otherBill}</h2>
      <h3 className="booking-entry__price">{totalBill()}</h3>
      <h2 className="booking-entry__description">{props.cashAtHotel}</h2>
      <h2 className="booking-entry__description">{props.UPI}</h2>
      <h2 className="booking-entry__description">{props.EDC}</h2>
      <h2 className="booking-entry__description">{props.appPaidAmount}</h2>
      <h3 className="booking-entry__price">{pendingAmount()}</h3>
      <h2 className="booking-entry__description">{props.bookingStatus}</h2>
    </div>
  );
}
