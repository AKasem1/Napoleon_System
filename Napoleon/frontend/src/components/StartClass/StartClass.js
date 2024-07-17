import React, { useEffect, useState } from "react";
import "../StartClass/StartClass.css";
import axios from "axios";
import Header from "../Home/header/Header";
import Preloader from "../preloader";
import logo from "../../pic/logo.jpg";
import Swal from "sweetalert2";
import errorSound from "../../sound/error.mp3";
import registeredWithMoneySound from "../../sound/moneyError.mp3";
import registeredWithoutMoneySound from "../../sound/correct.mp3";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import Button from "react-bootstrap/esm/Button";
import {
  updateStudentMoney,
  setStudent,
} from "../../features/student/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroups,
  setSelectedGrade,
  setSelectedGroup,
  setClassStarted,
  resetState,
} from "../../features/group/groupSlice";

function StartClass() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [active, setActive] = useState(false);
  const [month, setMonth] = useState();
  const [class1, setClass1] = useState();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student);
  const { groups, selectedGrade, selectedGroup, classStarted } = useSelector(
    (state) => state.group
  );

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const getHandelGrade = async (value) => {
    try {
      dispatch(setSelectedGrade(value));
      const response = await fetch(
        `http://localhost:2025/admin/getGroup/${value}`
      );
      const data = await response.json();
      dispatch(setGroups(data));
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error in fetching groups by grade:", error);
    }
  };

  const handleGroupChange = (value) => {
    dispatch(setSelectedGroup(value));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2025/admin/studentAttendance",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: searchQuery, group: selectedGroup }),
        }
      );
      const data = await response.json();
      if (data.error === "هذا الطالب غير مسجل") {
        Swal.fire({
          title: "غير مسجل",
          text: "هذا الطالب غير مسجل",
          icon: "error",
        });
      }
      setSearchQuery(searchQuery);
      if (data.student) {
        if (data.student.status && data.student.money !== undefined) {
          if (data.student.status !== "مسجل") {
            playSound(errorSound);
          } else if (data.student.money > 0) {
            dispatch(setStudent(data.student));
            playSound(registeredWithMoneySound);
          } else if (data.student.money === 0) {
            dispatch(setStudent(data.student));
            playSound(registeredWithoutMoneySound);
          }
        }
      }
      if (data.error) {
        playSound(errorSound);
      }
      if (response.ok) {
        setTimeout(() => {
          setSearchQuery("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error in fetching search results:", error.message);
    }
  };

  async function handleFirstButtonClick(e) {
    e.preventDefault();
    try {
      const res = await axios.patch("http://localhost:2025/admin/startClass", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        group: selectedGroup,
      });
      const data = res.data;
      setClass1(data.class.sort);
      setMonth(data.class.month);
      // console.log(data)
      Swal.fire({
        title: "عملية ناجحة ",
        text: "تم بدأ الحصة",
        icon: "success",
      });
      setShowPayment(true);
      dispatch(setClassStarted(true));
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const endClass = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("http://localhost:2025/admin/endClass", {
        group: selectedGroup,
      });

      Swal.fire({
        title: "عملية ناجحة ",
        text: "تم انهاء الحصة",
        icon: "success",
      });
      dispatch(setClassStarted(false));
      dispatch(resetState());
      dispatch(setStudent(null));
      dispatch(setSelectedGrade(null));
      dispatch(setSelectedGroup(null));
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const paid = e.target.paid.value;
    const id = student._id;
    try {
      const response = await axios.patch(
        `http://localhost:2025/admin/payStudent/${id}`,
        { paymentPrice: paid }
      );
      if (response.status === 200) {
        const updatedMoney = student.money - paid;
        dispatch(updateStudentMoney(updatedMoney));
        setActive(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-color3">
      {loading ? (
        <Preloader logo={logo} />
      ) : (
        <div>
          <Header />
          <div className="container2">
            {classStarted && (
              <div className="search-contanier">
                <form onSubmit={handleSearch}>
                  <div className="search10">
                    <input
                      type="text-search"
                      placeholder="Search 'كود الطالب'"
                      className="input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
                <div className="search-result m-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>حالة الدفع</th>
                        <th>مبلغ متبقي</th>
                        <th>الشهر </th>
                        <th>الحصة</th>
                        <th>حالة الطالب</th>
                        <th>كود الطالب</th>
                        <th>اسم الطالب</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {student && student.money > 0 ? (
                            <PiCurrencyCircleDollarFill
                              className="payButton"
                              onClick={() => {
                                setActive(true);
                              }}
                            />
                          ) : (
                            showPayment && <h3 className="paidStatus">مدفوع</h3>
                          )}
                        </td>
                        <td>{student ? student.money : ""}</td>
                        <td>{month}</td>
                        <td>{class1}</td>
                        <td>{student ? student.status : ""}</td>
                        <td>{student ? student.code : ""}</td>
                        <td>{student ? student.name : ""}</td>
                      </tr>
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
                          <label>{`المبلغ المتبقي ${student.money}`}</label>
                          <input
                            name="paid"
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
              </div>
            )}
            <div className="right-section3">
              <form className="class-form">
                <p className="title">الحصص </p>
                <label>
                  <select
                    className="select-class"
                    value={selectedGrade}
                    onChange={(e) => getHandelGrade(e.target.value)}
                    required
                  >
                    <option value="الصف" required>
                      الصف
                    </option>
                    <option value="الصف الأول الثانوي">
                      الصف الأول الثانوي
                    </option>
                    <option value="الصف الثاني الثانوي">
                      الصف الثاني الثانوي
                    </option>
                    <option value="الصف الثالث الثانوي">
                      الصف الثالث الثانوي
                    </option>
                  </select>
                </label>
                <label>
                  <select
                    className="select-class"
                    value={selectedGroup}
                    name="group"
                    onChange={(e) => handleGroupChange(e.target.value)}
                    required
                  >
                    <option value="">اختر المجموعة</option>
                    {groups.map((g, ind) => (
                      <option key={ind} value={g.name} required>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={handleFirstButtonClick} className="submit">
                  بدأ حصة
                </button>
                {classStarted && (
                  <form className="form">
                    <button
                      type="submit"
                      className="submit"
                      style={{ backgroundColor: "red" }}
                      onClick={endClass}
                    >
                      انهاء الحصة
                    </button>
                  </form>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartClass;
