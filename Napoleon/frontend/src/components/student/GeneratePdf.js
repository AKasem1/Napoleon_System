import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './GeneratePdf.css';
import logo from '../../pic/logo.jpg'

const GeneratePdf = ({ student, onClose }) => {
  const componentRef = useRef();

  const handleDownloadPdf = async () => {
    console.log('handleDownloadPdf initiated');
    console.log('html2pdf:', html2pdf);

    const element = componentRef.current;
    const opt = {
      margin: 1,
      filename: `${student.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    console.log('Options:', opt);
    console.log('Element:', element);

    try {
      const pdfPromise = html2pdf().set(opt).from(element).save();
      console.log('PDF Promise:', pdfPromise);

      await pdfPromise;
      console.log('handleDownloadPdf completed');
      onClose();
    } catch (e) {
      console.log('Error:', e);
    }
  };


  return (
    <div className="pdf-popup-backdrop">
      <div className="pdf-popup-content">
        <div ref={componentRef} className="pdf-content">
        <h3 className="pdf-title" style={{color:"white"}}>Student Information</h3>
            <img src={logo} alt="logo" className="logo" />
          <h1 className='student-title'>{student.name}</h1>
          <div className="student-info">
            <p><strong>رقم التليفون:</strong> {student.phone}</p>
            <p><strong>رقم تليفون ولي الأمر:</strong> {student.parentPhone}</p>
            <p><strong>الصف:</strong> {student.grade}</p>
            <p><strong>حالة الدفع:</strong> {student.paymentStatus}</p>
            <p><strong>مبلغ متبقي على الطالب:</strong> {student.money}ج</p>
            <p><strong>عدد مرات الغياب:</strong> {student.absence? student.absence : 0}</p>
          </div>
          <h2 className="exams-title">Exams</h2>
          <table className="exams-table">
            <thead>
              <tr>
                <th>نوع الاختبار</th>
                <th>الدرجة الكلية</th>
                <th>درجة الطالب</th>
                <th>التاريخ</th>
                <th>الاسم</th>
              </tr>
            </thead>
            <tbody>
              {student.exams.map((exam, index) => (
                <tr key={index}>
                  <td>{exam.examType}</td>
                  <td>{exam.examMark}</td>
                  <td>{exam.studentMark}</td>
                  <td>{new Date(exam.examDate).toLocaleDateString()}</td>  
                  <td>{exam.examName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="pdf-download-btn" onClick={handleDownloadPdf}>
          Download PDF
        </button>
        </div>
      </div>
  );
}

export default GeneratePdf;