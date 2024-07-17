import React, { useState, useEffect } from "react";
import "./Students1.css";
import "./editForm.css";
import Header from "../Home/header/Header";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import GeneratePdf from "./GeneratePdf";
import { useDispatch, useSelector } from "react-redux";
import {
  setStudents,
  deleteStudent,
} from "../../features/student/studentSlice";

export default function Students1() {
  const [searchQuery, setSearchQuery] = useState("");
  const [grade, setGrade] = useState("الصف");
  const [groups, setgroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const nav = useNavigate();
  const [editname, seteditname] = useState("");
  const [editphone, seteditphone] = useState("");
  const [editparentPhone, seteditparentPhone] = useState("");
  const [editedGrade, seteditedGrade] = useState("");
  const [editCode, seteditcode] = useState("");
  const [editGroup, seteditgroup] = useState("");
  const [editpayment, seteditayment] = useState("");
  const [groupss, setGroupss] = useState([]);
  const [pdfStudent, setPdfStudent] = useState(null);

  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);

  const handle_click = (student) => {
    setSelectedStudent(student);
    setActive(!active);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (grade !== "الصف") {
      gethandelgrade();
    }
  }, [grade]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const value = searchQuery; // Correctly capture the search input value
    try {
      const response = await fetch(
        `http://localhost:2025/admin/search?query=${value}`
      );
      const data = await response.json();
      dispatch(setStudents(data.results));
    } catch (error) {
      console.error("Error in fetching search results:", error);
    }
  };

  const getEditGroups = async (value) => {
    axios
      .get(`http://localhost:2025/admin/getGroup/${value}`)
      .then((res) => {
        seteditedGrade(value);
        setGroupss(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //delete

  const handleDelete = async (code) => {
    Swal.fire({
      title: "هل أنت متأكد من حذف الطالب؟",
      text: "!لن تستطيع إستعادة البيانات بعد الحذف",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "حذف!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:2025/admin/deleteStudent/${code}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "تم الحذف!",
                text: "تم حذف الطالب بنجاح",
                icon: "success",
              });
              dispatch(deleteStudent(code));
            } else {
              Swal.fire({
                icon: "error",
                title: "خطأ",
                text: "يوجد خطأ في حذف البيانات",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:2025/admin/editStudent/${selectedStudent._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: editCode,
            name: editname,
            phone: editphone,
            parentPhone: editparentPhone,
            grade: editedGrade,
            group: editGroup,
            payment: editpayment,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      Swal.fire({
        title: "عملية ناجحة ",
        text: "تم تعديل الطالب بنجاح ",
        icon: "success",
      });
      nav("/students1");
      window.location.reload();
      seteditayment("");
      seteditgroup("");
      seteditname("");
      seteditphone("");
      seteditparentPhone("");
      seteditedGrade("");
      seteditcode("");
      setIsEdit(false);
      setActive(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يوجد خطأ في تسجيل البيانات",
      });
      console.error("Error fetching students:", error);
    }
  };

  const gethandelgrade = () => {
    axios
      .get(`http://localhost:2025/admin/getGroup/${grade}`)
      .then((res) => {
        setgroups(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2025/admin/getStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade, group: selectedGroup }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setStudents(data));
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <>
      {/* {loading ? (
        <Preloader logo={logo} />
      ) : ( */}
      <>
        <Header />
        {/*  */}
        <div className="students-page">
          <form onSubmit={handleSearch}>
            <div className="search0">
              <input
                type="text-search"
                placeholder="Search 'كود الطالب'"
                className="input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <div className="left-section">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th>PDF</th>
                    <th>حذف</th>
                    <th>المعلومات</th>
                    <th>المجموعة</th>
                    <th>الصف</th>
                    <th>رقم موبايل الوالد</th>
                    <th>رقم الموبايل</th>
                    <th>أسم الطالب</th>
                    <th>الكود</th>
                  </tr>
                </thead>
                <tbody>
                  {students &&
                    students.map((student, index) => (
                      <tr key={index}>
                        <td>
                          <Button
                            className="btn btn-success"
                            onClick={() => setPdfStudent(student)}
                          >
                            تحميل
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn-danger"
                            onClick={() => handleDelete(student.code)}
                          >
                            حذف الطالب
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn-information"
                            onClick={() => handle_click(student)}
                          >
                            معلومات الطالب
                          </Button>
                        </td>
                        <td>
                          {student.group ? student.group.name : "No Group"}
                        </td>
                        <td>{student.grade}</td>
                        <td>{"0" + student.parentPhone}</td>
                        <td>{"0" + student.phone}</td>
                        <td>{student.name}</td>
                        <td>{student.code}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* right section */}
          <div className="right-section-students1">
            <form className="form" onSubmit={Submit}>
              <p className="title-students">بيانات الطلاب</p>
              <label>
                <select
                  className="select"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="الصف" disabled>
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
              <label>
                <select
                  className="select"
                  value={selectedGroup}
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
              <button className="submit" style={{ marginBottom: "20px" }}>
                بحث
              </button>
              <Link to={"/home"} className="submit">
                الرجوع الي الصفحة الرئيسية
              </Link>
            </form>
          </div>
        </div>
      </>
      {/* )} */}

      {/* pop up  */}
      {!isEdit && (
        <div className="popup_user_info " id={active ? "active" : ""}>
          <span>
            <h2 style={{ marginTop: "20px", fontWeight: "bold" }}>
              {" "}
              معلومات الطالب{" "}
            </h2>{" "}
          </span>
          {selectedStudent && (
            <div className="pop_up">
              <div
                className="border"
                style={{ padding: "10px", borderRadius: "70px" }}
              >
                {selectedStudent.group
                  ? selectedStudent.group.name
                  : "No Group"}
              </div>
              <div
                className="border"
                style={{ padding: "10px", borderRadius: "70px" }}
              >
                {selectedStudent.name}
                <span className="p-1"> : الأسم</span>
              </div>
              <div
                className="border"
                style={{ padding: "10px", borderRadius: "70px" }}
              >
                {selectedStudent.code}
                <span className="p-1"> : الكود</span>
              </div>
              <div
                className="border"
                style={{ padding: "10px", borderRadius: "70px" }}
              >
                <span className="p-1"> الصف</span> :{selectedStudent.grade}
              </div>
              <div
                className="border"
                style={{ padding: "10px", borderRadius: "70px" }}
              >
                {"0" + selectedStudent.parentPhone}
                <span className="p-1"> : رقم تليفون الأب </span>
              </div>
              <div
                className="border"
                style={{ padding: "10px", borderRadius: "70px" }}
              >
                {"0" + selectedStudent.phone}
                <span className="p-1"> : رقم التليفون </span>
              </div>
              <div>
                <button
                  className="btn btn-danger w-25 h-25 m-4"
                  onClick={() => handle_click(null)}
                >
                  اخفاء
                </button>
                <button
                  className="btn btn-primary w-25 h-25 m-4"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  تعديل
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {isEdit && (
        <div className="popup_user_info2 " id={active ? "active" : ""}>
          <h2 className="text2">معلومات الطالب</h2>
          {selectedStudent && (
            <div
              className="pop_up"
              style={{
                fontWeight: "bold",
                marginTop: "0px",
                gap: "-10px",
                color: "white",
              }}
            >
              <form onSubmit={handleEdit}>
                <label
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  الاسم
                </label>
                <input
                  className="input2"
                  style={{
                    width: "350px",
                    margin: "auto",
                    borderRadius: "70px",
                  }}
                  type="text"
                  value={editname}
                  onChange={(e) => seteditname(e.target.value)}
                />
                <label style={{ color: "white", fontWeight: "bold" }}>
                  الكود
                </label>
                <input
                  className="input2"
                  style={{
                    width: "350px",
                    margin: "auto",
                    borderRadius: "70px",
                  }}
                  type="text"
                  value={editCode}
                  onChange={(e) => seteditcode(e.target.value)}
                />
                <label style={{ color: "white", fontWeight: "bold" }}>
                  رقم التليفون
                </label>
                <input
                  className="input2"
                  style={{
                    width: "350px",
                    margin: "auto",
                    borderRadius: "70px",
                  }}
                  type="text"
                  value={editphone}
                  onChange={(e) => seteditphone(e.target.value)}
                />
                <label style={{ color: "white", fontWeight: "bold" }}>
                  رقم تليفون ولي الأمر
                </label>
                <input
                  className="input2"
                  style={{
                    width: "350px",
                    margin: "auto",
                    borderRadius: "70px",
                  }}
                  type="text"
                  value={editparentPhone}
                  onChange={(e) => seteditparentPhone(e.target.value)}
                />
                <label>
                  <select
                    className="m-auto choise text-center"
                    style={{
                      width: "350px",
                      margin: "auto",
                      borderRadius: "70px",
                    }}
                    value={editedGrade}
                    onChange={(e) => getEditGroups(e.target.value)}
                  >
                    <option
                      value="المرحلة"
                      style={{
                        width: "350px",
                        margin: "auto",
                        borderRadius: "70px",
                      }}
                    >
                      اختر المرحلة
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
                    value={editGroup}
                    className="m-auto choise text-center"
                    style={{
                      width: "350px",
                      margin: "auto",
                      borderRadius: "70px",
                    }}
                    name="group"
                    onChange={(e) => seteditgroup(e.target.value)}
                  >
                    <option value="" disabled>
                      اختر المجموعة
                    </option>
                    {groupss.map((g, ind) => (
                      <option key={ind} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <select
                    value={editpayment}
                    className="m-auto choise text-center"
                    style={{
                      width: "350px",
                      margin: "auto",
                      borderRadius: "70px",
                    }}
                    name="payment"
                    onChange={(e) => seteditayment(e.target.value)}
                  >
                    <option value={selectedStudent.payment} disabled>
                      {selectedStudent.payment}
                    </option>
                    <option value="دفع بالحصة">دفع بالحصة</option>
                    <option value="دفع بالشهر">دفع بالشهر</option>
                  </select>
                </label>
                <div>
                  <button
                    className="btn btn-primary w-25 h-25"
                    style={{ marginTop: "10px" }}
                    type="submit"
                  >
                    حفظ
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
      {pdfStudent && (
        <GeneratePdf student={pdfStudent} onClose={() => setPdfStudent(null)} />
      )}
    </>
  );
}
