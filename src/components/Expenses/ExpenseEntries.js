import React, { useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../Constants/TableIcons";
import AddIcon from "@material-ui/icons/Add";
import PopupDialog from "../Features/PopupDialog";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseEntries(props) {
  console.log("Im in ExpenseEntries");
  console.log("props.filteredMonthYear : " + props.filteredMonthYear);
  console.table(props.expenseEntries);

  const [openPopup, setOpenPopup] = useState(false);

  let yearMonth = props.filteredMonthYear.split("-");

  const filteredExpenses = props.expenseEntries.filter(
    (expense) =>
      new Date(expense.expenseDate).getMonth() + 1 === Number(yearMonth[1]) &&
      new Date(expense.expenseDate).getFullYear() === Number(yearMonth[0])
  );

  const propertyExpense = filteredExpenses
    .filter((expense) => expense.expenseType === "Property Expense")
    .reduce((accumulator, object) => {
      return accumulator + Number(object.amount);
    }, 0);

  console.table(filteredExpenses);

  const [id, setId] = useState(props.id);

  const idClickHandler = () => {
    setId("changedId");
    console.log(id);
  };

  const [tableData, setTableData] = useState(filteredExpenses);

  const columns = [
    { title: "S.No", field: "id", align: "left" },
    {
      title: "Expense date",
      field: "expenseDate",
      align: "left",
      type: "date",
      dateSetting: { locale: "en-GB" }
    },
    { title: "Expense type", field: "expenseType", align: "left" },
    { title: "Description", field: "description", align: "left" },
    {
      title: "Amount",
      field: "amount",
      align: "center"
      // type: "currency",
      // currencySetting: { currencyCode: "INR", minimumFractionDigits: 2 }
    }
  ];

  const addExpenseHandler = (enteredExpenseDetail) => {
    console.log(
      "addExpenseHandler : " + JSON.stringify(enteredExpenseDetail, null, 4)
    );
    const expenseDetail = {
      ...enteredExpenseDetail,
      id: Math.round(Math.random() * (9997 - 9000) + 9000)
    };
    props.onSaveExpense(expenseDetail);
    setOpenPopup(false);
  };

  const cancelExpenseHandler = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={filteredExpenses}
        icons={tableIcons}
        // title="Booking details"
        components={
          {
            // Toolbar: (props) => (
            //   <div
            //     style={{
            //       color: "#fff"
            //     }}
            //   >
            //     <MTableToolbar {...props} />
            //   </div>
            // ),
            // Row: (props) => (
            //   <Grid style={{ backgroundColor: "#e8eaf5", display: "contents" }}>
            //     <MTableBodyRow {...props} />
            //   </Grid>
            // ),
            // Pagination: (props) => <TablePagination {...props} />
          }
        }
        actions={[
          {
            icon: () => <AddIcon color="#9c27b0" />,
            tooltip: "Add expense",
            isFreeAction: true,
            onClick: (event) => setOpenPopup(true)
          }
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: "No expenses to display"
          }
        }}
        options={{
          showTitle: false,
          // doubleHorizontalScroll: true,
          // tableLayout: "auto",
          showEmptyDataSourceMessage: true,
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
            { value: filteredExpenses.length, label: "All" }
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
        title={"Add New Expense"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ExpenseForm
          onSaveExpense={addExpenseHandler}
          onCancelExpense={cancelExpenseHandler}
        />
      </PopupDialog>
    </div>
  );
}
