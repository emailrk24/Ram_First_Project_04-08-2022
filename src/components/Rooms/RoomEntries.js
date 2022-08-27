import React from "react";
import MaterialTable from "material-table";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Paper as PaperOld } from "@material-ui/core";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center"
}));

export default function RoomEntries(props) {
  let yearMonth = props.filteredMonthYear.split("-");
  const filteredBookings = props.bookingEntries.filter(
    (booking) =>
      new Date(booking.checkInDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(booking.checkInDate).getFullYear() === Number(yearMonth[0])
  );
  return (
    <div>
      <Box sx={{ pt: 3, pb: 2 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={4}
          columns={20}
        >
          <Grid item xs={5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#61b1ff"
              }}
            >
              <br />
              Total Business
              <br /> {} <br /> <br />
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#8ec7ff"
              }}
            >
              App paid <br /> {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#a5d2ff"
              }}
            >
              Cash at hotel <br /> {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#bbddff"
              }}
            >
              UPI payment <br /> {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#d2e8ff"
              }}
            >
              EDC payment <br /> {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#e8f3ff"
              }}
            >
              Pending amount <br /> {}
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#a64ca6"
              }}
            >
              <br /> Total Expenses <br /> {} <br /> <br />
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#bf7fbf"
              }}
            >
              Property expense
              <br />
              {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#cc99cc"
              }}
            >
              Staff welfare
              <br />
              {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#d8b2d8"
              }}
            >
              Banking expense
              <br />
              {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#e5cce5"
              }}
            >
              Staff advance
              <br />
              {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#f2e5f2"
              }}
            >
              UPI expense
              <br />
              {}
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#329932"
              }}
            >
              <br />
              OYO App
              <br />
              <br />
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#7fbf7f"
              }}
            >
              App Paid amount
              <br />
              {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#b2d8b2"
              }}
            >
              OYO deduction
              <br />
              {}
            </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item
              sx={{
                borderRadius: "12px",
                backgroundColor: "#cce5cc"
              }}
            >
              Balance
              <br />
              {}
            </Item>
          </Grid>
        </Grid>
      </Box>
      <MaterialTable
        localization={{
          body: {
            emptyDataSourceMessage: ""
          }
        }}
        options={{
          showTitle: false,
          search: false,
          paging: false
        }}
        components={{
          Container: (props) => <PaperOld {...props} elevation={0} />
        }}
      />
    </div>
  );
}
