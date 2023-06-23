import "./Table.css";
import { snacks } from "../../db";
import { useState } from "react";

export const Table = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (column) => {
    console.log(column);
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredData = (array) => {
    let snack = array;
    if (sortColumn) {
      snack = [...snacks].sort((a, b) => {
        if (sortColumn) {
          let valueA = a[sortColumn];
          let valueB = b[sortColumn];
          if (sortColumn === "product_weight") {
            valueA = +a[sortColumn].replace("g", "");
            valueB = +b[sortColumn].replace("g", "");
            console.log(valueA, valueB);
          }
          if (sortColumn === "ingredients") {
            valueA = a[sortColumn].join("");
            valueB = b[sortColumn].join("");
          }
          if (sortDirection === "asc") {
            if (typeof valueA !== "number") {
              return valueA.localeCompare(valueB);
            } else {
              return valueA - valueB;
            }
          } else {
            if (typeof valueA !== "number") {
              return valueB.localeCompare(valueA);
            } else {
              return valueB - valueA;
            }
          }
        }
      });
    }
    if (searchQuery) {
      snack = snack?.filter(
        ({ product_name, ingredients }) =>
          product_name.toLowerCase().includes(searchQuery) ||
          ingredients.find((el) =>
            el.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    return snack;
  };

  const sortMarker = (name) => {
    return (
      sortColumn === name && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
    );
  };

  const sortedData = [...snacks].sort((a, b) => {
    if (sortColumn) {
      let valueA = a[sortColumn];
      let valueB = b[sortColumn];
      if (sortColumn === "product_weight") {
        valueA = +a[sortColumn].replace("g", "");
        valueB = +b[sortColumn].replace("g", "");
        console.log(valueA, valueB);
      }
      if (sortColumn === "ingredients") {
        valueA = a[sortColumn].join("");
        valueB = b[sortColumn].join("");
      }
      if (sortDirection === "asc") {
        if (typeof valueA !== "number") {
          return valueA.localeCompare(valueB);
        } else {
          return valueA - valueB;
        }
      } else {
        if (typeof valueA !== "number") {
          return valueB.localeCompare(valueA);
        } else {
          return valueB - valueA;
        }
      }
    }
    return snacks;
  });

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
            {filteredData(snacks)?.map((item, index) => (
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
