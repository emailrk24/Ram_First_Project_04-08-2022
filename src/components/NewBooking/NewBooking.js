import React, { useState } from "react";
import "./NewBooking.css";
import BookingForm from "./BookingForm";

export default function NewBooking(props) {
  const [isEditing, setIsEditing] = useState(false);

  const newBookingHandler = () => {
    setIsEditing(true);
  };

  const cancelBookingHandler = () => {
    setIsEditing(false);
  };

  const addBookingHandler = (enteredBookingDetail) => {
    const bookingDetail = {
      ...enteredBookingDetail,
      id: Math.round(Math.random() * (9997 - 9000) + 9000)
    };
    props.onSaveBooking(bookingDetail);
    setIsEditing(false);
  };

  return (
    <div className="new-booking">
      {!isEditing && (
        <button onClick={newBookingHandler}>Add New Booking</button>
      )}
      {isEditing && (
        <BookingForm
          onSaveBooking={addBookingHandler}
          onCancelBooking={cancelBookingHandler}
        />
      )}
    </div>
  );
}
