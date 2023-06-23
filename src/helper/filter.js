export const filteredData = (array, searchQuery, sortColumn, sortDirection) => {
  let snack = array;
  if (sortColumn) {
    snack = [...snack].sort((a, b) => {
      if (sortColumn) {
        let valueA = a[sortColumn];
        let valueB = b[sortColumn];
        if (sortColumn === "product_weight") {
          valueA = +a[sortColumn].replace("g", "");
          valueB = +b[sortColumn].replace("g", "");
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
