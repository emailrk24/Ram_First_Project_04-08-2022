import React, { useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../Constants/TableIcons";
import AddIcon from "@material-ui/icons/Add";
import Button from "@mui/material/Button";
import PopupDialog from "../Features/PopupDialog";
import BookingForm from "./BookingForm";

export default function BookingEntries(props) {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      title: <font color="#fff">Check-in</font>,
      field: "checkInDate",
      align: "left",
      type: "date",
      dateSetting: { locale: "en-GB" }
    },
    {
      title: <font color="#fff">Check-out</font>,
      field: "checkOutDate",
      align: "left",
      type: "date",
      dateSetting: { locale: "en-GB" }
    },
    { title: <font color="#fff">Source</font>, field: "source", align: "left" },
    {
      title: <font color="#fff">Booking Ref.</font>,
      field: "bookingId",
      align: "left"
    },
    {
      title: <font color="#fff">Room No.</font>,
      field: "roomNumber",
      align: "left",
      render: (rowData) => <div>{rowData.roomNumber.toString()}</div>
    },
    {
      title: <font color="#fff">No. of rooms</font>,
      field: "numberOfRooms",
      align: "left"
    },
    {
      title: <font color="#fff">No. of days</font>,
      field: "numberOfDays",
      align: "left"
    },
    {
      title: <font color="#fff">Rent per day</font>,
      field: "rentPerDay",
      align: "left"
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">EC amt</font>,
      field: "ecAmount",
      align: "left"
      // type: "currency"
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">LC amt</font>,
      field: "lcAmount",
      align: "left",
      type: "number"
      // type: "currency"
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">Other bill</font>,
      field: "otherBill",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">Total bill</font>,
      field: "totalBill",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">Cash at hotel</font>,
      field: "cashAtHotel",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">UPI</font>,
      field: "UPI",
      align: "left"
      // type: "currency"
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">EDC</font>,
      field: "EDC",
      align: "left"
      // type: "currency"
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">App paid amt</font>,
      field: "appPaidAmount",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">Pending amt</font>,
      field: "pendingAmount",
      align: "left"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    },
    {
      title: <font color="#fff">Booking status</font>,
      field: "bookingStatus",
      align: "left"
    }
  ];
  const addBookingHandler = (enteredBookingDetail) => {
    console.log(
      "addBookingHandler : " + JSON.stringify(enteredBookingDetail, null, 4)
    );
    const bookingDetail = {
      ...enteredBookingDetail,
      id: Math.round(Math.random() * (8099 - 8000) + 8000)
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
        actions={[
          {
            // icon: () => <AddIcon color="#9c27b0" />,
            icon: () => (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  backgroundColor: "#40005d",
                  "&:hover": {
                    backgroundColor: "#510674"
                  }
                }}
                startIcon={<AddIcon />}
              >
                Add Booking
              </Button>
            ),
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
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
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
          columnsButton: false,
          cellStyle: {
            fontFamily: "Noto Sans JP",
            fontSize: "0.8rem",
            padding: "8px 6px 8px 2px"
          },
          rowStyle: (data, index) => {
            return {
              background: index % 2 === 0 ? "#FFEFD5" : null,
              padding: "5rem"
              // color: selectedRow === index ? "#FFC0CB" : "#000",
            };
          },
          headerStyle: {
            background: "#2e1534", //"#1976d2", //"#9c27b0", //"#ba68c8",
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
