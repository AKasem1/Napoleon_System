import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../Dashboard/PrintHouse.css";
import Header from "../Home/header/Header";
import Button from "react-bootstrap/esm/Button";
import { FaArrowUp } from "react-icons/fa6";

function PrintHouse() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [receivables, setReceivables] = useState("");
  const [payables, setPayables] = useState("");
  const [data, setData] = useState([]);
  const [grade, setGrade] = useState("");
  const [profit, setProfit] = useState("");
  const [printHouse, setPrintHouse] = useState("");
  const [stock, setStock] = useState("");
  const [printPrice, setPrintPrice] = useState("");
  const [nameStock, setNameStock] = useState("");
  const [book, setBook] = useState([]);
  const [active, setActive] = useState(false);
  const [increasestock, setIncreasestock] = useState();
  const [editbook, setEditbook] = useState();
  const [editprintHouse, setEditprintHouse] = useState();
  const [handelgrade, setHandelGrade] = useState("");

  // Function to submit new print house data
  async function SubmitPrinthouse(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2025/admin/addPrintHouse",
        { name, phone, receivables, payables }
      );

      Swal.fire({
        title: "عملية ناجحة ",
        text: "تم ادخال البيانات",
        icon: "success",
      });
      setName("");
      setPhone("");
      setReceivables("");
      setPayables("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  // Function to fetch print house data
  useEffect(() => {
    axios
      .get("http://localhost:2025/admin/PrintHouses")
      .then((response) => {
        const printHouseData = response.data.printHouses;
        setData(printHouseData);
        // console.log(printHouseData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // add book
  async function Submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2025/admin/addBook", {
        name: nameStock,
        grade,
        printHouse,
        printPrice,
        profit,
        stock,
      });

      Swal.fire({
        title: "عملية ناجحة ",
        text: "تم ادخال البيانات",
        icon: "success",
      });
      setName("");
      setGrade("");
      setPrintHouse("");
      setPrintPrice("");
      setProfit("");
      setStock("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  //get all books
  useEffect(() => {
    axios
      .get("http://localhost:2025/admin/allBooks")
      .then((response) => {
        const book = response.data.books;
        setBook(book);
        console.log("books: ", book);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function increaseStock(e) {
    e.preventDefault();
    const iStock = e.target.stock.value;
    // console.log("Stock1: ", e.target.stock);
    // console.log("Stock2: ", e.target.stock.value);
    // console.log("Stock3: ", e.stock.value);
    console.log("Stock: ", iStock);
    try {
      const res = await axios.patch(
        "http://localhost:2025/admin/increaseStock",
        {
          stock: iStock,
          book: editbook,
          printHouse: editprintHouse,
        }
      );

      Swal.fire({
        title: "عملية ناجحة ",
        text: "تم تحديث بيانات المكتبة",
        icon: "success",
      });

      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (grade !== "الصف") {
      getHandelGrade();
    }
  }, [grade]);

  const getHandelGrade = () => {
    axios
      .get(`http://localhost:2025/admin/getGroup/${grade}`)
      .then((res) => {
        setHandelGrade(res.data);
        if (res.status === 201) {
          // Handle status 201 if needed
        }
      })
      .catch((err) => {
        if (err.response) {
          // Handle error response if needed
        }
      });
  };

  return (
    <div>
      <div className="bg-color">
        <Header />
        <div className="app-container flex ">
          <div className="add-section2">
            <form className="add-expenses" onSubmit={SubmitPrinthouse}>
              <h1>إضافة مكتبة</h1>
              <input
                className="input-field"
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="text"
                placeholder="رقم التليفون"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="text"
                placeholder=" الارباح"
                value={receivables}
                onChange={(e) => setReceivables(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="text"
                placeholder="المستحقات "
                value={payables}
                onChange={(e) => setPayables(e.target.value)}
              />
              <button className="submitButton" type="submit">
                إضافة
              </button>
            </form>
          </div>

          {/* Table to display data */}
          <div className="table-container2 ">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>المكتبة</th>
                  <th>رقم الموبايل</th>
                  <th>الأرباح</th>
                  <th>المدفوعات</th>
                  <th>الصافي</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name} </td>
                      <td>{item.phone}</td>
                      <td>{item.receivables}</td>
                      <td>{item.payables}</td>
                      <td>{item.net}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="app-container2 flex ">
          <div className="add-section3">
            <form className="add-expenses" onSubmit={Submit}>
              <h1>اضافة مذكرة</h1>
              <input
                className="input-field"
                type="text"
                placeholder="الأسم"
                value={nameStock}
                onChange={(e) => setNameStock(e.target.value)}
                required
              />

              <label>
                <select
                  className="m-auto my-1 choise text-center"
                  value={grade} 
                  style={{ color: "white" }}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    الصف
                  </option>
                  <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                  <option value="الصف الثاني الثانوي">
                    الصف الثاني الثانوي
                  </option>
                  <option value="الصف الثالث الثانوي">
                    الصف الثالث الثانوي
                  </option>
                </select>
              </label>

              <select
                value={printHouse}
                className="m-auto choise text-center"
                name="printHouse"
                style={{ color: "white" }}
                onChange={(e) => setPrintHouse(e.target.value)}
              >
                <option value="" disabled>
                  اختر المكتبة
                </option>
                {data &&
                  data.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
              </select>

              <input
                className="input-field"
                type="number"
                placeholder=" ..هامش الربح"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="number"
                placeholder=" ..سعر الطباعة"
                value={printPrice}
                onChange={(e) => setPrintPrice(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="number"
                placeholder="استوك "
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <button className="submitButton" type="submit">
                إضافة
              </button>
            </form>
          </div>

          {/* Table to display data */}
          <div className="table-container2 ">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>الاسم</th>
                  <th>الصف</th>
                  <th>المكتبة</th>
                  <th>سعر الطباعه</th>
                  <th>هامش الربح</th>
                  <th>استوك</th>
                  <th>أضافة</th>
                </tr>
              </thead>
              <tbody>
                {book &&
                  book.map((b) => (
                    <tr key={b._id}>
                      <td>{b.name}</td>
                      <td>{b.grade} </td>
                      <td>{b.printHouseName}</td>
                      <td>{b.printPrice}</td>
                      <td>{b.profit}</td>
                      <td>{b.stock}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="increase-stock"
                          onClick={() => {
                            setActive(true);
                            setEditbook(b.name);
                            setEditprintHouse(b.printHouseName);
                          }}
                          style={{
                            width: "20px",
                            borderRadius: "10px",
                            color: "red",
                            fontWeight: "500px",
                          }}
                        >
                          <FaArrowUp />
                        </button>
                        {active && (
                          <>
                            <div
                              className="modal-overlay-add"
                              onClick={() => setActive(false)}
                            ></div>
                            <div className="pay-section3">
                              <form
                                className="pay-form"
                                onSubmit={increaseStock}
                              >
                                <h3 className="text-white">اضافة استوك</h3>
                                {/* <label>{`اضافة استوك${student.money}`}</label> */}
                                <input
                                  className="pay-input2"
                                  type="number"
                                  name="stock"
                                  placeholder="استوك "
                                  value={increasestock}
                                  onChange={(e) =>
                                    setIncreasestock(e.target.value)
                                  }
                                />

                                <Button type="submit" className="pay-button">
                                  اضافة
                                </Button>
                              </form>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintHouse;
