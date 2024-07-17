import React, { useEffect, useState } from "react";
import "./AddGroups.css";
import Header from "./Home/header/Header";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, deleteGroup, setGroup } from "../features/group/groupSlice";

const AddGroups = () => {
  const [isEdit, setEdit] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [centers, setCenters] = useState([]);
  const [newGroup, setNewGroup] = useState({
    name: "",
    grade: "",
    type: "",
    center: "",
    maxCount: "",
    payment: "",
    teacherPricePerClass: "",
    centerPricePerClass: "",
  });

  const [active, setActive] = useState(false);
  const [editname, seteditname] = useState("");
  const [editcenter, seteditcenter] = useState("");
  const [editmaxcount, seteditmaxcount] = useState();
  const [editedGrade, seteditedGrade] = useState("");
  const [edittype, setedittype] = useState("");
  const [editpayment, seteditpayment] = useState("");

  const groups = useSelector((state) => state.group.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:2025/admin/groups")
      .then((res) => res.json())
      .then((data) => {
        console.log("Groups: ", data);
        dispatch(setGroups(data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:2025/admin/centers")
      .then((res) => res.json())
      .then((data) => {
        console.log("Centers: ", data);
        setCenters(data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({
      ...newGroup,
      [name]: value,
    });
  };

  //button
  const handle_click = (group) => {
    setSelectedGroup(group);
    setActive(!active);
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    try {
      console.log("Adding new group: ", newGroup);
      const response = fetch("http://localhost:2025/admin/addGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroup),
      });
      console.log("Response: ", response);
      dispatch(setGroup(newGroup));
      setNewGroup({
        name: "",
        grade: "",
        type: "",
        center: "",
        maxCount: "",
        payment: "",
        teacherPricePerClass: "",
        centerPricePerClass: "",
      });
      Swal.fire({
        title: "عملية ناجحة ",
        text: "تم إضافة المجموعة بنجاح ",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يوجد خطأ في تسجيل البيانات",
      });
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    // console.log(
    //   "name, grade, type, center, maxCount, payment",
    //   editname,
    //   editedGrade,
    //   edittype,
    //   editcenter,
    //   editmaxcount,
    //   editpayment
    // );

    try {
      const response = await fetch(
        `http://localhost:2025/admin/editgroup/${selectedGroup._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editname,
            grade: editedGrade,
            type: edittype,
            center: editcenter,
            maxCount: editmaxcount,
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
      // window.location.reload();
      seteditpayment("");
      seteditedGrade("");
      seteditcenter("");
      seteditname("");
      seteditmaxcount();
      setedittype("");
      setEdit(false);
      setActive(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يوجد خطأ في تسجيل البيانات",
      });
      // console.error("Error fetching students:", error);
    }
  };

  //   const getEditGroups = async (value) => {
  //     axios
  //       .get(`http://localhost:2025/admin/getGroup/${value}`)
  //       .then((res) => {
  //         seteditedGrade(value);
  //         setGroupss(res.data);
  //         if (res.status === 201) {
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.response) {
  //           console.error(err);
  //         }
  //       });
  //   };

  // const handleDelete = async (code) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         fetch(`http://localhost:2025/admin/deleteStudent/${code}`, {
  //           method: "DELETE",
  //           headers: { "Content-Type": "application/json" },
  //         })
  //           .then((response) => {
  //             if (response.ok) {
  //               Swal.fire({
  //                 title: "Deleted!",
  //                 text: "Your file has been deleted.",
  //                 icon: "success",
  //               });
  //             } else {
  //               Swal.fire({
  //                 icon: "error",
  //                 title: "خطأ",
  //                 text: "يوجد خطأ في حذف البيانات",
  //               });
  //               console.log(response);
  //             }
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       }
  //     });
  //   };

  return (
    <>
      <Header />
      <div className="add-groups-container">
        <div className="left-section">
          <h1 className="group-header">المجموعات</h1>
          {groups.length > 0 && (
            <table className="groups-table">
              <thead>
                <tr className="text-center">
                  {/* <th className="table-header">حذف</th> */}
                  <th className="table-header">تعديل</th>
                  <th className="table-header">نوع الدفع</th>
                  <th className="table-header">أقصى عدد طلاب</th>
                  <th className="table-header">السنتر</th>
                  <th className="table-header">النوع</th>
                  <th className="table-header">المرحلة</th>
                  <th className="table-header">الاسم</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr key={group._id} className="table-row text-center">
                    {/* <td>
                      <Button
                        style={{
                          width: "80px",
                        }}
                        className="btn-danger"
                        //   onClick={() => handleDelete(student.code)}
                      >
                        حذف
                      </Button>
                    </td> */}

                    <td>
                      <Button
                        style={{
                          width: "80px",
                        }}
                        className="btn-information"
                        onClick={() => handle_click(group)}
                      >
                        تعديل{" "}
                      </Button>
                    </td>
                    <td className="table-cell" data-label="نوع الدفع">
                      {group.payment}
                    </td>
                    <td className="table-cell" data-label="أقصى عدد طلاب">
                      {group.maxCount}
                    </td>
                    <td className="table-cell" data-label="السنتر">
                      {group.center}
                    </td>
                    <td className="table-cell" data-label="النوع">
                      {group.type}
                    </td>
                    <td className="table-cell" data-label="المرحلة">
                      {group.grade}
                    </td>
                    <td className="table-cell" data-label="الاسم">
                      {group.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="right-section">
          <h2 className=" group-header2">إضافة مجموعة جديدة</h2>
          <form className="form2" onSubmit={handleAddGroup}>
            <input
              type="text"
              name="name"
              value={newGroup.name}
              onChange={handleInputChange}
              required
              placeholder="الاسم"
            />
            <select
              name="grade"
              value={newGroup.grade}
              onChange={handleInputChange}
              required
              placeholder="المرحلة"
            >
              <option value="" disabled>
                المرحلة
              </option>
              <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
              <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
              <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
            </select>
            <select
              name="type"
              value={newGroup.type}
              onChange={handleInputChange}
              required
              placeholder="النوع"
            >
              <option value="" disabled>
                اختر النوع
              </option>
              <option value="دابل">دابل</option>
              <option value="عادي">عادي</option>
            </select>
            <select
              name="center"
              value={newGroup.center}
              onChange={handleInputChange}
              required
              placeholder="السنتر"
            >
              <option value="" disabled>
                اختر السنتر
              </option>
              {centers.map((center) => (
                <option key={center._id} value={center.name}>
                  {center.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="maxCount"
              value={newGroup.maxCount}
              onChange={handleInputChange}
              required
              placeholder="أقصى عدد طلاب"
            />

            <select
              name="payment"
              value={newGroup.payment}
              onChange={handleInputChange}
              required
              placeholder="نوع الدفع"
            >
              <option value="" disabled>
                اختر نوع الدفع
              </option>
              <option value="دفع بالحصة">دفع بالحصة</option>
              <option value="دفع بالشهر">دفع بالشهر</option>
            </select>
            <input
              type="number"
              name="teacherPricePerClass"
              value={newGroup.teacherPricePerClass}
              onChange={handleInputChange}
              required
              placeholder="نسبة المسيو"
            />
            <input
              type="number"
              name="centerPricePerClass"
              value={newGroup.centerPricePerClass}
              onChange={handleInputChange}
              required
              placeholder="نسبة السنتر"
            />
            <button type="submit">إضافة</button>
          </form>
        </div>
      </div>
      {/* pop up  */}
      {!isEdit && (
        <div
          className="popup_user_info  bg-info"
          style={{ borderRadius: "70px", width: "500px" }}
          id={active ? "active" : ""}
        >
          <h2 style={{ marginTop: "20px", fontWeight: "bold" }}>
            معلومات الطالب
          </h2>
          {selectedGroup && (
            <div
              className="pop_up"
              style={{ fontWeight: "bold", marginTop: "-20px" }}
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
                  النوع
                </label>
                <input
                  className="input2"
                  style={{
                    width: "350px",
                    margin: "auto",
                    borderRadius: "70px",
                  }}
                  type="text"
                  value={edittype}
                  onChange={(e) => setedittype(e.target.value)}
                />
                <label style={{ color: "white", fontWeight: "bold" }}>
                  الحد الأقصى للطلاب
                </label>
                <input
                  className="input2"
                  style={{
                    width: "350px",
                    margin: "auto",
                    borderRadius: "70px",
                  }}
                  type="text"
                  value={editmaxcount}
                  onChange={(e) => seteditmaxcount(e.target.value)}
                />
                <label style={{ color: "white", fontWeight: "bold" }}>
                  السنتر
                </label>
                <input
                  className="input2"
                  style={{
                    width: "350px",
                    margin: "auto",
                    borderRadius: "70px",
                    color: "white",
                  }}
                  type="text"
                  value={editcenter}
                  onChange={(e) => seteditcenter(e.target.value)}
                />
                <label>
                  <select
                    className="m-auto choise text-center"
                    style={{
                      width: "350px",
                      margin: "auto",
                      borderRadius: "70px",
                      color: "white",
                    }}
                    value={editedGrade}
                    onChange={(e) => seteditedGrade(e.target.value)}
                  >
                    <option
                      value="المرحلة"
                      style={{
                        width: "350px",
                        margin: "auto",
                        borderRadius: "70px",
                        color: "white",
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
                    value={editpayment}
                    className="m-auto choise text-center"
                    style={{
                      width: "350px",
                      margin: "auto",
                      borderRadius: "70px",
                      color: "white",
                    }}
                    name="payment"
                    onChange={(e) => seteditpayment(e.target.value)}
                  >
                    <option value={selectedGroup.payment} disabled>
                      {selectedGroup.payment}
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
      <div className="mt-4"></div>
    </>
  );
};

export default AddGroups;
