import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries?.map((country,i) => (
        <tr className="country_list" key ={i}>
          <td>{country.totalName}</td>
          <td>
            <strong>{numeral(country.totalCase).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
