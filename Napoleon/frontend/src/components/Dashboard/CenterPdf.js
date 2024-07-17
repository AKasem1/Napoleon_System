import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './CenterPdf.css';
import logo from '../../pic/logo.jpg';

const CenterPdf = ({ center, onClose }) => {
  const componentRef = useRef();

  const handleDownloadPdf = async () => {
    console.log('handleDownloadPdf initiated');
    console.log('html2pdf:', html2pdf);

    const element = componentRef.current;
    const opt = {
      margin: 1,
      filename: `${center.name}.pdf`,
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
          <h3 className="pdf-title" style={{ color: "white" }}>حساب السنتر</h3>
          <img src={logo} alt="logo" className="logo" />
          <h1 className='center-title'>{center.name}</h1>
          <div className="center-info">
            <p><strong>رقم التليفون:</strong> {center.phone}</p>
            <p><strong>مبلغ متبقي:</strong> {center.remaining}ج</p>
            <p><strong>مبلغ مدفوع:</strong> {center.paid}ج</p>
          </div>
          <h2 className="money-details-title">تفاصيل الحساب</h2>
          <table className="money-details-table">
            <thead>
              <tr>
                <th>المبلغ الإجمالي المدفوع</th>
                <th>مبلغ السنتر</th>
                <th>المجموعة</th>
                <th>كود الطالب</th>
                <th>اسم الطالب</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {center.money.map((money, moneyIndex) => (
                <React.Fragment key={moneyIndex}>
                  {money.moneyDetails.map((moneyDetail, detailIndex) => (
                    <tr key={detailIndex}>
                      <td>ج{moneyDetail.totalPaid}</td>
                      <td>ج{moneyDetail.centerMoney}</td>
                      <td>{moneyDetail.group}</td>
                      <td>{moneyDetail.studentCode}</td>
                      <td>{moneyDetail.studentName}</td>
                      <td>{new Date(moneyDetail.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </React.Fragment>
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
};

export default CenterPdf;
