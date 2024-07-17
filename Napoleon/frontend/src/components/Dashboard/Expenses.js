import React, { useState, useEffect } from "react";
import "../Dashboard/Expenses.css";
import Header from "../Home/header/Header";
import Button from "react-bootstrap/esm/Button";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [selectExpense, setSelectExpense] = useState({});

  useEffect(() => {
    fetch("http://localhost:2025/admin/allGeneralExpenses")
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        setExpenses(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const person = e.target.person.value;
    const price = e.target.price.value;
    const paid = e.target.paid.value;
    fetch("http://localhost:2025/admin/addGeneralExpenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, person, price, paid }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExpenses([...expenses, data]);
        window.location.reload();
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      (expense.name &&
        expense.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (expense.person &&
        expense.person.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const formateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const paid = e.target[0].value;
    console.log(selectExpense);
    fetch(`http://localhost:2025/admin/payExpense/${selectExpense.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setActive(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="expenses-page">
        <div className="expenses-section">
          <h1>المصاريف</h1>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <table className="table-expenses">
            <thead>
              <tr>
                <th>حالة الدفع</th>
                <th>التاريخ</th>
                <th>متبقي</th>
                <th>تم دفع</th>
                <th>النكلفة</th>
                <th>الجهة</th>
                <th>البند</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses
                ? filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>
                        {expense.price > expense.paid ? (
                          <PiCurrencyCircleDollarFill
                            className="payButton"
                            onClick={() => {
                              setActive(true);
                              setSelectExpense(expense);
                            }}
                          />
                        ) : (
                          <p className="paidStatus">مدفوع</p>
                        )}
                      </td>
                      <td>{formateDate(expense.createdAt)}</td>
                      <td>{expense.remaining}</td>
                      <td>{expense.paid}</td>
                      <td>{expense.price}</td>
                      <td>{expense.person}</td>
                      <td>{expense.name}</td>
                    </tr>
                  ))
                : expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>
                        {expense.price > expense.paid ? (
                          <PiCurrencyCircleDollarFill
                            className="payButton"
                            onClick={() => {
                              setActive(true);
                              setSelectExpense(expense);
                            }}
                          />
                        ) : (
                          <h1 className="paidStatus">مدفوع</h1>
                        )}
                      </td>
                      <td>{formateDate(expense.createdAt)}</td>
                      <td>{expense.remaining}</td>
                      <td>{expense.paid}</td>
                      <td>{expense.price}</td>
                      <td>{expense.person}</td>
                      <td>{expense.name}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {active && (
            <>
              <div
                className="modal-overlay"
                onClick={() => setActive(false)}
              ></div>
              <div className="pay-section">
                <form className="pay-form" onSubmit={handlePayment}>
                  <h3>دفع المبلغ</h3>
                  <label>{`المبلغ المتبقي ${selectExpense.remaining}`}</label>
                  <input
                    type="number"
                    placeholder="المبلغ"
                    className="pay-input"
                  />
                  <Button type="submit" className="pay-button">
                    دفع
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
        <div className="add-section">
          <form className="add-expenses" onSubmit={handleSubmit}>
            <h1>مصاريف جديدة</h1>
            <input
              className="input-field"
              type="text"
              name="name"
              placeholder="..البند"
            />
            <input
              className="input-field"
              type="text"
              name="person"
              placeholder="..الجهة"
            />
            <input
              className="input-field"
              type="number"
              name="price"
              placeholder="..التكلفة"
            />
            <input
              className="input-field"
              type="number"
              name="paid"
              placeholder="..تم دفع"
            />
            <button className="submitButton" type="submit">
              إضافة
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Expenses;
