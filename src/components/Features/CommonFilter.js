import React from "react";

import "./CommonFilter.css";

export default function CommonFilter(props) {
  const filterChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className="common-filter">
      <div className="common-filter__control">
        <label>Filter by month</label>
        <input
          type="month"
          value={props.defaultMonthYear}
          onChange={filterChangeHandler}
        />
      </div>
    </div>
  );
}
