import { Link, Outlet } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import Header from "../Home/header/Header";
import Center from "./Center";
import printhouse from "../../pic/printhouse.jpg";
import expenses from "../../pic/expenses.jpg";
import education from "../../pic/education.jpg";
import Footer from "../Footer";
function Dashboard() {
  return (
    <div>
      <div className="bg-color">
        <Header />
        <div className="contant flex   m-auto" style={{position:"absolute" , fontWeight:"bolder" , color:"white",justifyContent:"space-around"}}>
          <div style={{ marginTop: " 100px", color:"white",fontSize:"30px" }} className="text">
            {" "}
            السنتر{" "}
          </div>
          <div style={{ marginTop: " 100px", color:"white",fontSize:"30px" ,marginLeft:"40px"}} className="text">
            {" "}
            المطبعة{" "}
          </div>

          <div style={{ color:"white",fontSize:"30px" }} className="contant3 text">
            {" "}
            المصروفات{" "}
          </div>
        </div>

        <div className=" card-container flex m-auto mt-5 text" style={{justifyContent:"space-around"}}>
          <Link className=" text-white " path to="/dashboard:center">
            <div class="card ">
              <div class="bg">
                <img className="education" src={education} alt="" />
              </div>
              <div class="blob"></div>
            </div>
          </Link>

          <Link path to="/dashboard:printhouse" className=" ">
            <div class="card ">
              <div class="bg">
                <img className="printhouse" src={printhouse} alt="" />
              </div>
              <div class="blob"></div>
            </div>
          </Link>
          <Link path to="/dashboard:expenses" className=" ">
            <div class="card ">
              <div class="bg">
                <img className="expenses" src={expenses} alt="" />
              </div>
              <div class="blob"></div>
            </div>
          </Link>
        </div>
     
      </div>
    </div>
  );
}

export default Dashboard;
