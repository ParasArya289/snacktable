import "./Table.css";
import { snacks } from "../../db";
import { useState } from "react";
import { filteredData } from "../../helper/filter";

export const Table = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filterDataArr = filteredData(
    snacks,
    searchQuery,
    sortColumn,
    sortDirection
  );

  const sortMarker = (name) => {
    return (
      sortColumn === name && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
    );
  };

  return (
    <>
      <div className="snack">
        <h1>Snack Table</h1>
        <input
          type="text"
          placeholder="search by name or ingredient"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <table className="snack-table">
          <thead>
            <tr>
              <th onClick={(e) => handleSort("id")}>Id {sortMarker("id")}</th>

              <th onClick={() => handleSort("product_name")}>
                Product Name {sortMarker("product_name")}
              </th>

              <th onClick={(e) => handleSort("product_weight")}>
                Product Weight {sortMarker("product_weight")}
              </th>

              <th onClick={(e) => handleSort("price")}>
                Price {sortMarker("price")}
              </th>

              <th name="calories" onClick={(e) => handleSort("calories")}>
                Calories {sortMarker("calories")}
              </th>

              <th onClick={(e) => handleSort("ingredients")}>
                Ingredients {sortMarker("ingredients")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filterDataArr?.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_weight}</td>
                <td>{item.price}</td>
                <td>{item.calories}</td>
                <td>{item.ingredients.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
