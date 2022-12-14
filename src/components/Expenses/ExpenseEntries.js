import React, { useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../Constants/TableIcons";
import AddIcon from "@material-ui/icons/Add";
import Button from "@mui/material/Button";
import PopupDialog from "../Features/PopupDialog";
import ExpenseForm from "./ExpenseForm";
import { CsvBuilder } from "filefy";

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

  // console.table(filteredExpenses);

  const [id, setId] = useState(props.id);

  const idClickHandler = () => {
    setId("changedId");
    console.log(id);
  };

  const [tableData, setTableData] = useState(filteredExpenses);

  const columns = [
    { title: <font color="#fff">S.No.</font>, field: "id", align: "left" },
    {
      title: <font color="#fff">Expense date</font>,
      field: "expenseDate",
      align: "left",
      type: "date",
      dateSetting: { locale: "en-GB" }
    },
    {
      title: <font color="#fff">Expense type</font>,
      field: "expenseType",
      align: "left"
    },
    {
      title: <font color="#fff">Description</font>,
      field: "description",
      align: "left"
    },
    {
      title: <font color="#fff">Amount</font>,
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
      id: Math.round(Math.random() * (8099 - 8000) + 8000)
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
        // title="Expense details"
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
                Add Expense
              </Button>
            ),
            tooltip: "Add expense",
            isFreeAction: true,
            onClick: (event) => setOpenPopup(true)
          }
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: "No expenses to display"
          },
          toolbar: {
            exportCSVName: "Download",
            exportTitle: "Download"
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
          exportButton: { csv: true, pdf: false },
          exportAllData: true,
          // exportFileName: "TableData",
          exportCsv: (data, columns) => {
            const columnTitles = data.map(
              (columnDef) => columnDef.title.props.children
            );
            const csvData = columns.map((rowData) =>
              data.map((columnDef) => rowData[columnDef.field])
            );
            const builder = new CsvBuilder(
              `Expenses_${props.filteredMonthYear}.csv`
            )
              .setColumns(columnTitles)
              .addRows(csvData)
              .exportFile();
            return builder;
          },
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
