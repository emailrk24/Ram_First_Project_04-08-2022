import React, { useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../Constants/TableIcons";
import AddIcon from "@material-ui/icons/Add";
import PopupDialog from "../Features/PopupDialog";
import StaffForm from "./StaffForm";
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
    { title: "S.No", field: "id", align: "left" },
    {
      title: "Staff Name",
      field: "staffName",
      align: "left"
    },
    {
      title: "No. of Calendar days",
      field: "numberOfCalendarDays",
      align: "left"
    },
    { title: "Fixed Salary", field: "fixedSalary", align: "left" },
    {
      title: "No. of Leave days",
      field: "numberOfLeaveDays",
      align: "left"
    },
    {
      title: "No. of Working days",
      field: "numberOfWorkingDays",
      align: "left"
    },
    {
      title: "Total Salary",
      field: "totalSalary",
      align: "left"
    },
    {
      title: "Advance Salary",
      field: "advanceSalary",
      align: "left"
    },
    {
      title: "Balance Salary",
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
      id: Math.round(Math.random() * (9997 - 9000) + 9000)
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
            icon: () => <AddIcon color="#9c27b0" />,
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
          search: false,
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
