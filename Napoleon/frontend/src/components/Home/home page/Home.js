import React from "react";
import "./Home.css";
import Header from "../header/Header";
import bg2 from "../../../pic/nap2.png";
import bg from "../../../pic/napleon photo.png";
import bg3 from "../../../pic/temple.png";
import Footer from "../../Footer";


export default function Home() {
  return (
    <>
    <div className="back_ground">
      <Header />
            
      <div className="flex ">
        
        <img src={bg2} className="back_ground2" alt="" />
        <img src={bg} className="back_ground1" alt="" />
        <img src={bg3} className="back_ground3" alt="" />
      </div>
    </div> 
    <Footer />
    </>

   
    );
}
