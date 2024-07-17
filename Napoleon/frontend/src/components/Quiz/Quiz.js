import React, { useEffect, useState } from "react";
import "../Quiz/Quiz.css";
import Header from "../Home/header/Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Quiz() {
  const [grade, setGrade] = useState("الصف");
  const [groups, setgroups] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [exams, setExams] = useState([{}]);

  const [newExam, setNewExam] = useState({
    examName: "",
    examMark: "",
    examGrade: "",
    examGroup: [],
    examType: "",
    excelFile: null,
  });

  // Loading groups based on grade
  useEffect(() => {
    if (grade !== "الصف") {
      getHandelGrade();
    }
  }, [grade]);

  // get exams
  useEffect(() => {
    const fetchExams = async (selectedGrade, selectedType) => {
      try {
        const response = await fetch(
          `http://localhost:2025/admin/exams?grade=${selectedGrade}&type=${selectedType}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setExams(data.exams);
        console.log("Exams:", data.exams);
      } catch (error) {
        console.error("Error getting exams:", error);
      }
    };

    fetchExams(selectedGrade, selectedType);
    console.log(selectedGrade, selectedType);
  }, [selectedGrade, selectedType]);

  // grade selection
  const getHandelGrade = () => {
    axios
      .get(`http://localhost:2025/admin/getGroup/${grade}`)
      .then((res) => {
        setgroups(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.error(err.response.data.message);
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "excelFile") {
      setNewExam({ ...newExam, excelFile: files[0] });
    } else {
      setNewExam({ ...newExam, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewExam((prevState) => {
      const examGroup = checked
        ? [...prevState.examGroup, value]
        : prevState.examGroup.filter((group) => group !== value);
      return { ...prevState, examGroup };
    });
  };

  // add exam
  const handleAddExam = async (e) => {
    e.preventDefault();

    console.log("New exam Groups:", newExam.examGroup);

    const formData = new FormData();
    formData.append("examName", newExam.examName);
    formData.append("examMark", newExam.examMark);
    formData.append("examGrade", newExam.examGrade);
    formData.append("examGroup", newExam.examGroup);
    formData.append("examType", newExam.examType);
    formData.append("excelFile", newExam.excelFile);

    try {
      const response = await fetch("http://localhost:2025/admin/addExam", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      Swal.fire({
        title: "عملية ناجحة",
        text: "تم إضافة الامتحان بنجاح",
        icon: "success",
      });

      setNewExam({
        examName: "",
        examMark: 0,
        examGrade: "",
        examGroup: [],
        examType: "",
        excelFile: null,
      });

      console.log(data);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-color4">
        <div className="container-quiz">
          {/* Table Section */}
          <div className="table-quiz-container">
            <table className="table-quiz">
              <thead>
                <tr>
                  <th>الصف</th>
                  <th>المجموعة</th>
                  <th>النوع</th>
                  <th>الدرجة الكلية</th>
                  <th>الامتحان</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => (
                  <tr key={index}>
                    <td>{exam.examGrade}</td>
                    <td>
                      {exam.examGroup ? (
                        exam.examGroup.map((group) => group.name).join(", ")
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>{exam.examType}</td>
                    <td>{exam.examMark}</td>
                    <td>{exam.examName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Filter Section */}
          <div className="filter-container">
            <div className="filter-options">
              <label>
                <select
                  className="form-control select"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
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
              <label>
                <select
                  className="form-control select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">النوع</option>
                  <option value="كويز">كويز</option>
                  <option value="امتحان">امتحان</option>
                </select>
              </label>
            </div>
          </div>
          {/* Form Section */}
          <form className="form-quiz" onSubmit={handleAddExam}>
            <p className="title">إضافة امتحان</p>
            <div className="form-group">
              <label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="اسم الامتحان"
                  required
                  name="examName"
                  value={newExam.examName}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                <select
                  className="form-control"
                  name="examType"
                  onChange={handleInputChange}
                  value={newExam.examType}
                >
                  <option value="">النوع</option>
                  <option value="كويز">كويز</option>
                  <option value="امتحان">امتحان</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                <select
                  className="form-control"
                  name="examGrade"
                  onChange={(e) => {
                    setGrade(e.target.value);
                    handleInputChange(e);
                  }}
                  value={newExam.examGrade}
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
            </div>
            <div className="form-group">
              <p className="form-control">المجموعة</p>
              {groups.map((g, ind) => (
                <label key={ind}>
                  <input
                    type="checkbox"
                    style={{ color: "white" }}
                    name="examGroup"
                    value={g.name}
                    checked={newExam.examGroup.includes(g.name)}
                    onChange={handleCheckboxChange}
                  />
                  {g.name}
                </label>
              ))}
            </div>
            <div className="form-group">
              <label style={{ justifyContent: "center" }}>
                <input
                  className="form-control"
                  type="number"
                  placeholder="الدرجة الكلية"
                  required
                  name="examMark"
                  value={newExam.examMark}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group upload">
              <label htmlFor="file-upload" className="custom-file-upload">
                اختر ملف
              </label>
              <input
                id="file-upload"
                type="file"
                name="excelFile"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group m-auto">
              <button className="btn btn-primary-quiz m-1" type="submit">
                إضافة
              </button>
              <Link to={"/home"} className="btn btn-primary m-1">
                الرجوع إلى الصفحة الرئيسية
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Quiz;
