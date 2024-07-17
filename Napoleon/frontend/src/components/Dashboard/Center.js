import React, { useEffect, useState } from "react";
import "../Dashboard/Center.css";
import Header from "../Home/header/Header";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CenterPdf from "./CenterPdf";

function Center() {
  const [centers, setCenters] = useState([{}]);
  const [selectedCenter, setSelectedCenter] = useState({});
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [pdfCenter, setPdfCenter] = useState(null);

  async function Submitcenter(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2025/admin/addCenter",
        { name, phone }
      );
      console.log("Center added successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error adding center:", error);
    }
  }

  let centerId = 1;

  useEffect(() => {
    axios
      .get("http://localhost:2025/admin/centers")
      .then((response) => {
        setCenters(response.data);
      })
      .catch((error) => {
        console.error("Error getting centers:", error);
      });
  }, [centers]);

  const getCenter = async (name) => {
    try {
      const response = await fetch(
        `http://localhost:2025/admin/center/${name}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("response: ", data);
      setSelectedCenter(data);
    } catch (error) {
      console.error("Error getting center:", error);
    }
  };
  return (
    <div>
      <div className="bg-color2">
        <Header />
        <div className="app-container flex ">
          <div className="add-section2">
            <form className="add-expenses" onSubmit={Submitcenter}>
              <h1>اضافه سنتر</h1>
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
              {/* <input
                className="input-field"
                type="text"
                placeholder=" المستحقات"
                // value={receivables}
                // onChange={(e) => setReceivables(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="text"
                placeholder="النسبة "
                // value={payables}
                // onChange={(e) => setPayables(e.target.value)}
              /> */}
              <button className="submitButton" type="submit">
                إضافة
              </button>
            </form>
          </div>
          <div className="center-section">
            <div className="center-list">
              <select
                className="select"
                value={selectedCenter.name}
                onChange={(e) => getCenter(e.target.value)}
              >
                <option value="">اختر السنتر</option>
                {centers &&
                  centers.map((center) => (
                    <option key={center.id} value={center.name}>
                      {center.name}
                    </option>
                  ))}
              </select>
              <div className="center-info">
                <table className="center-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>المتبقي</th>
                      <th>المدفوع</th>
                      <th>إجمالي مستحقات اليوم</th>
                      <th>اليوم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCenter &&
                      selectedCenter.money &&
                      selectedCenter.money.map((money) => (
                        <tr key={money._id}>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => setPdfCenter(selectedCenter)}
                            >
                              تفاصيل
                            </button>
                          </td>
                          <td>{money.remaining}</td>
                          <td>{money.paid}</td>
                          <td>{money.amount}</td>
                          <td>{new Date(money.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    <tr>
                      <td>الإجمالي</td>
                      <td>{selectedCenter.remaining}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pdfCenter && (
        <CenterPdf center={pdfCenter} onClose={() => setPdfCenter(null)} />
      )}
    </div>
  );
}

export default Center;
