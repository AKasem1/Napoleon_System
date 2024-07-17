import React from "react";
import "../student/Information.css";
export default function Information() {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="popup-close-button" onClick={ " "}>
          X
        </button>
        <h2 className="student-name">{"selectedStudent.name"}</h2>
        <h2 className="student-name">{"selectedStudent.phone"}</h2>
        <h2 className="student-name">{"selectedStudent.address"}</h2>
        {"selectedStudent".reservations.map((reservation, index) => (
          <React.Fragment key={index}>
            {reservation._id === "selectedReservationId" && (
              <React.Fragment>
                <h3 className="student-grade" style={{ fontWeight: "bold" }}>
                  {reservation.grade}
                </h3>
                <div className="student-modules">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      fontSize: "18px",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    <span>المادة</span>
                    <span>عدد النسخ</span>
                  </div>
                  {reservation.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex}>
                      <span>{module}</span>
                      <span>{reservation.copiesNumber[moduleIndex]}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                   " toggleStatus"(
                      "selectedStudent",
                      reservation._id,
                      reservation.status === "استلم" ? "لم يستلم" : "استلم"
                    )
                  }
                >
                  {reservation.status === "استلم" ? "لم يستلم" : "استلم"}
                </button>
                {/* <button type="submit" onClick={() => onStatus(reservation._id)}>استلم</button> */}
                <button
                  type="submit"
                  onClick={() =>
                    "deleteReservation"("selectedStudent", reservation._id)
                  }
                >
                  إلغاء الحجز
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
