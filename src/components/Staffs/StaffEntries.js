import React, { useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../Constants/TableIcons";
import AddIcon from "@material-ui/icons/Add";
import Button from "@mui/material/Button";
import PopupDialog from "../Features/PopupDialog";
import StaffForm from "./StaffForm";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import { purple } from "@mui/material/colors";

// import { TablePagination, Grid, Typography, Divider } from "@material-ui/core";

export default function StaffEntries(props) {
  console.log(
    "Im in StaffEntries - filteredMonthYear : " + props.filteredMonthYear
  );
  const [openPopup, setOpenPopup] = useState(false);

  const filteredStaffDetails = props.staffEntries.filter(
    (staffEntry) => staffEntry.calendarMonthYear === props.filteredMonthYear
  );

  // console.table(filteredStaffDetails);

  const [id, setId] = useState(props.id);

  const idClickHandler = () => {
    setId("changedId");
    console.log(id);
  };

  const [tableData, setTableData] = useState(filteredStaffDetails);

  const columns = [
    { title: <font color="#fff">S.No</font>, field: "id", align: "left" },
    {
      title: <font color="#fff">Staff Name</font>,
      field: "staffName",
      align: "left"
    },
    {
      title: <font color="#fff">No. of Calendar days</font>,
      field: "numberOfCalendarDays",
      align: "left"
    },
    {
      title: <font color="#fff">Fixed Salary</font>,
      field: "fixedSalary",
      align: "left"
    },
    {
      title: <font color="#fff">No. of Leave days</font>,
      field: "numberOfLeaveDays",
      align: "left"
    },
    {
      title: <font color="#fff">No. of Working days</font>,
      field: "numberOfWorkingDays",
      align: "left"
    },
    {
      title: <font color="#fff">Total Salary</font>,
      field: "totalSalary",
      align: "left"
    },
    {
      title: <font color="#fff">Advance Salary</font>,
      field: "advanceSalary",
      align: "left"
    },
    {
      title: <font color="#fff">Balance Salary</font>,
      field: "balanceSalary",
      align: "left"
    }
  ];

  const addStaffDetailHandler = (enteredStaffDetail) => {
    console.log(
      "addStaffHandler : " + JSON.stringify(enteredStaffDetail, null, 4)
    );
    const staffDetail = {
      ...enteredStaffDetail,
      id: Math.round(Math.random() * (8099 - 8000) + 8000)
    };
    props.onSaveStaffDetail(staffDetail);
    setOpenPopup(false);
  };

  const cancelStaffDetailHandler = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={filteredStaffDetails}
        icons={tableIcons}
        // components={{
        //   Pagination: (props) => (
        //     <>
        //       <Grid container style={{ padding: 1 }}>
        //         <Grid sm={3} item>
        //           <Typography variant="subtitle2">Summary</Typography>
        //         </Grid>
        //         <Grid sm={1} item align="center">
        //           <Typography variant="subtitle2">
        //             Fixed salary
        //             {filteredStaffDetails.reduce((accumulator, staffDetail) => {
        //               return accumulator + Number(staffDetail.fixedSalary);
        //             }, 0)}
        //           </Typography>
        //         </Grid>
        //         <Grid sm={1} item align="center">
        //           <Typography variant="subtitle2">
        //             Total salary
        //             {filteredStaffDetails.reduce((accumulator, staffDetail) => {
        //               return accumulator + Number(staffDetail.totalSalary);
        //             }, 0)}
        //           </Typography>
        //         </Grid>
        //         <Grid sm={1} item align="center">
        //           <Typography variant="subtitle2">
        //             Balance salary
        //             {filteredStaffDetails.reduce((accumulator, staffDetail) => {
        //               return accumulator + Number(staffDetail.balanceSalary);
        //             }, 0)}
        //           </Typography>
        //         </Grid>
        //       </Grid>
        //     </>
        //   )
        // }}
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
                Add Staff
              </Button>
            ),
            tooltip: "Add Staff",
            isFreeAction: true,
            onClick: (event) => setOpenPopup(true)
          }
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: "No staff details to display"
          }
        }}
        options={{
          showTitle: false,
          // doubleHorizontalScroll: true,
          // tableLayout: "auto",
          showEmptyDataSourceMessage: true,
          sorting: true,
          search: true,
          // searchFieldAlignment: "right",
          // searchAutoFocus: false,
          // searchFieldVariant: "standard",
          // filtering: true,
          paging: false,
          // pageSizeOptions: [
          //   10,
          //   50,
          //   100,
          //   { value: filteredStaffDetails.length, label: "All" }
          // ],
          // pageSize: 10,
          // emptyRowsWhenPaging: false,
          // paginationType: "stepped",
          // showFirstLastPageButtons: false,
          // paginationPosition: "top",
          // exportButton: true,
          // exportAllData: true,
          // exportFileName: "TableData",
          // addRowPosition: "first",
          // actionsColumnIndex: -1,
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
            fontSize: "0.80rem"
          },
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#FFEFD5" } : null,
          padding: "5rem",
          headerStyle: {
            background: "#2e1534", //"#9c27b0", //"#ba68c8",
            color: "#fff",
            // fontWeight: "bold",
            fontFamily: "Noto Sans JP",
            fontSize: "0.80rem"
          }
        }}
      />
      <PopupDialog
        title={"Add New Staff"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <StaffForm
          filteredMonthYear={props.filteredMonthYear}
          onSaveStaffDetail={addStaffDetailHandler}
          onCancelStaffDetail={cancelStaffDetailHandler}
        />
      </PopupDialog>
    </div>
  );
}
