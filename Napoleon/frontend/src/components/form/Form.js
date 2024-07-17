import React, { useEffect, useState } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Home/header/Header";
import Footer from "../Footer";

export default function Form() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [grade, setGrade] = useState("الصف");
  const [code, setCode] = useState("");
  const [handelgrade, setHandelGrade] = useState("");
  const [groups, setGroups] = useState([{}]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [payment, setPayment] = useState("");

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
        setGroups(res.data);
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

  const handleCodeChange = (e) => {
    const value = e.target.value;
    const englishOnly = /^[a-zA-Z0-9]*$/;
    if (englishOnly.test(value)) {
      setCode(value);
    }
  };

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2025/admin/addStudent", {
        name: name,
        phone: phone,
        parentPhone: parentPhone,
        grade: grade,
        group: selectedGroup,
        code: code,
        payment: payment,
      })
      .then((t) => {
        console.log(t);
        Swal.fire({
          title: "عملية ناجحة ",
          text: "تم تسجيل الطالب بنجاح ",
          icon: "success",
        });
        setName("");
        setPhone("");
        setParentPhone("");
        setCode("");
        setSelectedGroup("");
        setGrade("الصف");
        setPayment("");
      })
      .catch((err) => {
        console.log(err, "error");
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "يوجد خطأ في تسجيل البيانات",
        });
      });
  };

  return (
    <>
      <div className="background-form">
        <Header />
        <form className="student-form" onSubmit={handleSubmit}>
          <p className="title">تسجيل الطالب </p>
          <div className="flex">
            <label>
              <input
                className="input"
                type="text"
                placeholder=""
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>أسم الطالب</span>
            </label>
          </div>
          <div>
            <label>
              <input
                className="input"
                type="text"
                placeholder=""
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <span>الرقم الشخصي </span>
            </label>
          </div>
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
            />
            <span>رقم ولي الأمر </span>
          </label>
          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              value={code}
              onChange={handleCodeChange}
            />
            <span>الكود</span>
          </label>
          <label>
            <select
              className="m-auto choise text-center"
              value={grade}
              style={{ color: "white" }}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="الصف" disabled>
                الصف
              </option>
              <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
              <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
              <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
            </select>
          </label>

          {/* group  */}

          <label>
            <select
              value={selectedGroup}
              style={{ color: "white" }}
              className="m-auto choise text-center"
              name="group"
              onChange={(e) => handleGroupChange(e.target.value)}
            >
              <option value="" disabled>
                اختر المجموعة
              </option>
              {groups.map((g, ind) => (
                <option key={ind} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <select
              className="m-auto choise text-center"
              style={{ color: "white" }}
              name="payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="" disabled>
                الدفع
              </option>
              <option value="دفع بالحصة">دفع بالحصة</option>
              <option value="دفع بالشهر">دفع بالشهر</option>
              <option value="منحة">منحة</option>
            </select>
          </label>
          <button style={{ borderRadius: "20px" }} className="submit">
            تسجيل
          </button>
          <Link
            to={"/home"}
            className="submit text-decoration-none text-center"
            style={{ borderRadius: "20px" }}
          >
            الرجوع الي الصفحة الرئيسية
          </Link>
        </form>
      </div>
    </>
  );
}
