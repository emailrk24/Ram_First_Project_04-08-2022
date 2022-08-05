import React, { useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../Constants/TableIcons";
import AddIcon from "@material-ui/icons/Add";
import PopupDialog from "../Features/PopupDialog";
import BookingForm from "./BookingForm";

export default function BookingEntries(props) {
  const [openPopup, setOpenPopup] = useState(false);
  let yearMonth = props.filteredMonthYear.split("-");
  const filteredBookings = props.bookingEntries.filter(
    (booking) =>
      new Date(booking.checkInDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(booking.checkInDate).getFullYear() === Number(yearMonth[0])
  );
  const [tableData, setTableData] = useState(filteredBookings);
  const columns = [
    { title: "S.No", field: "id", align: "left" },
    {
      title: "Check-in",
      field: "checkInDate",
      align: "left",
      type: "date",
      dateSetting: { locale: "en-GB" }
    },
    {
      title: "Check-out",
      field: "checkOutDate",
      align: "left",
      type: "date",
      dateSetting: { locale: "en-GB" }
    },
    { title: "Source", field: "source", align: "left" },
    { title: "Booking Ref.", field: "bookingId", align: "left" },
    {
      title: "Room No.",
      field: "roomNumber",
      align: "left",
      render: (rowData) => <div>{rowData.roomNumber.toString()}</div>
    },
    { title: "No. of rooms", field: "numberOfRooms", align: "left" },
    {
      title: "No. of days",
      field: "numberOfDays",
      align: "left"
    },
    {
      title: "Rent per day",
      field: "rentPerDay",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "EC amt",
      field: "ecAmount",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "LC amt",
      field: "lcAmount",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "Other bill",
      field: "otherBill",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "Total bill",
      field: "totalBill",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "Cash at hotel",
      field: "cashAtHotel",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "UPI",
      field: "UPI",
      align: "left"
      // type: "currency"
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "EDC",
      field: "EDC",
      align: "left"
      // type: "currency"
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "App paid amt",
      field: "appPaidAmount",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: "Pending amt",
      field: "pendingAmount",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    { title: "Booking status", field: "bookingStatus", align: "left" }
  ];
  const addBookingHandler = (enteredBookingDetail) => {
    console.log(
      "addBookingHandler : " + JSON.stringify(enteredBookingDetail, null, 4)
    );
    const bookingDetail = {
      ...enteredBookingDetail,
      id: Math.round(Math.random() * (9997 - 9000) + 9000)
    };
    props.onSaveBooking(bookingDetail);
    setOpenPopup(false);
  };
  const cancelBookingHandler = () => {
    setOpenPopup(false);
  };
  return (
    <div>
      <MaterialTable
        columns={columns}
        data={filteredBookings}
        icons={tableIcons}
        // title="Booking details"
        // components={{
        //   Pagination: (props) => <TablePagination {...props} />
        // }}
        actions={[
          {
            icon: () => <AddIcon color="#9c27b0" />,
            tooltip: "Add New Booking",
            isFreeAction: true,
            onClick: (event) => setOpenPopup(true)
          }
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: "No bookings to display"
          }
        }}
        options={{
          showTitle: false,
          // tableLayout: "auto",
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchAutoFocus: false,
          searchFieldVariant: "standard",
          // filtering: true,
          paging: true,
          pageSizeOptions: [
            10,
            50,
            100,
            { value: filteredBookings.length, label: "All" }
          ],
          pageSize: 10,
          emptyRowsWhenPaging: false,
          // paginationType: "stepped",
          // showFirstLastPageButtons: false,
          // paginationPosition: "top",
          // exportButton: true,
          // exportAllData: true,
          // exportFileName: "TableData",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          // selection: true,
          // showSelectAllCheckbox: false,
          // showTextRowsSelected: false,
          // selectionProps: (rowData) => ({
          //   disabled: rowData.age == null
          //   // color:"primary"
          // }),
          // grouping: true,
          columnsButton: true,
          cellStyle: {
            fontFamily: "Noto Sans JP",
            fontSize: "0.8rem",
            padding: "8px 6px 8px 2px"
          },
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#FFEFD5" } : null,
          padding: "5rem",
          headerStyle: {
            background: "#2e1534", //"#9c27b0", //"#ba68c8",
            color: "#fff",
            // fontWeight: "bold",
            fontFamily: "Noto Sans JP",
            fontSize: "0.8rem",
            padding: "2px 6px 8px 2px"
          }
        }}
      />
      <PopupDialog
        title={"Add New Booking"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <BookingForm
          onSaveBooking={addBookingHandler}
          onCancelBooking={cancelBookingHandler}
        />
      </PopupDialog>
    </div>
  );
}
