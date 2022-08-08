import React, { useState, useEffect } from "react";
import "./StaffForm.css";

export default function StaffForm(props) {
  console
    .log
    // "Im in StaffForm - filteredMonthYear : " + props.filteredMonthYear
    ();

  let yearMonth = props.filteredMonthYear.split("-");
  const calendarDays = new Date(yearMonth[0], yearMonth[1], 0).getDate();
  // console.log("calendarDays : " + calendarDays);

  const [enteredStaffName, setEnteredStaffName] = useState("");
  const [enteredCalendarMonthYear, setEnteredCalendarMonthYear] = useState(
    props.filteredMonthYear
  );
  const [
    enteredNumberOfCalendarDays,
    setEnteredNumberOfCalendarDays
  ] = useState(calendarDays);
  const [enteredFixedSalary, setEnteredFixedSalary] = useState(12000);
  const [enteredNumberOfLeaveDays, setEnteredNumberOfLeaveDays] = useState(0);
  const [enteredNumberOfWorkingDays, setEnteredNumberOfWorkingDays] = useState(
    0
  );
  const [enteredTotalSalary, setEnteredTotalSalary] = useState(0);
  const [enteredAdvanceSalary, setEnteredAdvanceSalary] = useState(0);
  const [enteredBalanceSalary, setEnteredBalanceSalary] = useState(0);

  useEffect(() => {
    setEnteredNumberOfWorkingDays(
      parseFloat(
        enteredNumberOfCalendarDays - enteredNumberOfLeaveDays
      ).toFixed(1)
    );
    // console.log("enteredNumberOfLeaveDays : " + enteredNumberOfLeaveDays);
    // console.log("enteredNumberOfWorkingDays : " + enteredNumberOfWorkingDays);
    setEnteredTotalSalary(
      parseFloat(
        (enteredFixedSalary / enteredNumberOfCalendarDays) *
          enteredNumberOfWorkingDays
      ).toFixed(0)
    );
    // console.log("enteredTotalSalary : " + enteredTotalSalary);
    setEnteredBalanceSalary(
      parseFloat(enteredTotalSalary - enteredAdvanceSalary).toFixed(0)
    );
    // console.log("enteredBalanceSalary : " + enteredBalanceSalary);
  }, [
    enteredFixedSalary,
    enteredNumberOfLeaveDays,
    enteredNumberOfWorkingDays,
    enteredTotalSalary,
    enteredAdvanceSalary
  ]);

  const staffNameChangeHandler = (event) => {
    setEnteredStaffName(event.target.value);
  };
  const fixedSalaryChangeHandler = (event) => {
    setEnteredFixedSalary(event.target.value);
  };
  const numberOfLeaveDaysChangeHandler = (event) => {
    setEnteredNumberOfLeaveDays(event.target.value);
  };
  const advanceSalaryChangeHandler = (event) => {
    setEnteredAdvanceSalary(event.target.value);
  };

  const formSubmitHandler = (event) => {
    console.log("Im in formSubmitHandler");
    event.preventDefault();

    const staffDetail = {
      staffName: enteredStaffName,
      calendarMonthYear: enteredCalendarMonthYear,
      numberOfCalendarDays: enteredNumberOfCalendarDays,
      fixedSalary: enteredFixedSalary,
      numberOfLeaveDays: enteredNumberOfLeaveDays,
      numberOfWorkingDays: enteredNumberOfWorkingDays,
      totalSalary: enteredTotalSalary,
      advanceSalary: enteredAdvanceSalary,
      balanceSalary: enteredBalanceSalary
    };

    console.log(staffDetail);

    props.onSaveStaffDetail(staffDetail);

    setEnteredStaffName("");
    setEnteredCalendarMonthYear(props.filteredMonthYear);
    setEnteredNumberOfCalendarDays(calendarDays);
    setEnteredFixedSalary(12000);
    setEnteredNumberOfLeaveDays(0);
    setEnteredNumberOfWorkingDays(0);
    setEnteredTotalSalary(0);
    setEnteredAdvanceSalary(0);
    setEnteredBalanceSalary(0);
  };

  return (
    <div className="new-staff">
      <form onSubmit={formSubmitHandler}>
        <div className="new-staff__controls">
          <div className="new-staff__control">
            <label>Staff Name</label>
            <input
              type="text"
              value={enteredStaffName}
              onChange={staffNameChangeHandler}
            ></input>
          </div>
          <div className="new-staff__control">
            <label>No. of Calendar days</label>
            <input type="number" hidden value={enteredCalendarMonthYear} />
            <input
              type="number"
              disabled
              value={enteredNumberOfCalendarDays}
            ></input>
          </div>
          <div className="new-staff__control">
            <label>Fixed Salary</label>
            <input
              type="number"
              step="1000"
              value={enteredFixedSalary}
              onChange={fixedSalaryChangeHandler}
            ></input>
          </div>
          <div className="new-staff__control">
            <label>No. of Leave days</label>
            <input
              type="number"
              value={enteredNumberOfLeaveDays}
              onChange={numberOfLeaveDaysChangeHandler}
              step="0.5"
              min="0"
            ></input>
          </div>
          <div className="new-staff__control">
            <label>No. of Working days</label>
            <input
              type="number"
              step="0.5"
              disabled
              value={enteredNumberOfWorkingDays}
            ></input>
          </div>
          <div className="new-staff__control">
            <label>Total Salary</label>
            <input
              type="number"
              disabled
              step="0.5"
              value={enteredTotalSalary}
            ></input>
          </div>
          <div className="new-staff__control">
            <label>Advance Salary</label>
            <input
              type="number"
              value={enteredAdvanceSalary}
              onChange={advanceSalaryChangeHandler}
              min="0"
            ></input>
          </div>
          <div className="new-staff__control">
            <label>Balance Salary</label>
            <input
              type="number"
              disabled
              step="0.5"
              value={enteredBalanceSalary}
            ></input>
          </div>
        </div>
        <div className="new-staff__actions">
          <button type="button" onClick={props.onCancelStaffDetail}>
            Cancel
          </button>
          <button type="submit">Add Staff</button>
        </div>
      </form>
    </div>
  );
}
