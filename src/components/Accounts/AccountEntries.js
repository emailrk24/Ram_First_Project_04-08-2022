import React, { useState } from "react";
import MaterialTable from "material-table";

export default function AccountEntries(props) {
  return (
    <div>
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
      />
    </div>
  );
}
