import "./Table.css";
import { snacks } from "../../db";

export const Table = () => {
  return (
    <>
      <div className="snack">
        <h1>Snack Table</h1>
        <table className="snack-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Product Weight</th>
              <th>Price</th>
              <th>Calories</th>
              <th>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {snacks?.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.product_weight}</td>
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
