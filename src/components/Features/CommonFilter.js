import React from "react";

import "./CommonFilter.css";

export default function CommonFilter(props) {
  const filterMonthChangeHandler = (event) => {
    props.onChangeMonthFilter(event.target.value);
  };

  const filterDateChangeHandler = (event) => {
    props.onChangeDateFilter(event.target.value);
  };

  return (
    <div className="common-filter">
      <div className="common-filter__control">
        <input
          type="month"
          value={props.defaultMonthYear}
          onChange={filterMonthChangeHandler}
        />
        <input
          type="date"
          value={props.defaultDate}
          onChange={filterDateChangeHandler}
        />
      </div>
    </div>
  );
}
