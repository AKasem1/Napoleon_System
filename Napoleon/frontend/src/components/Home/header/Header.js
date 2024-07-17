import React from "react";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../pic/logo.jpg";
import { Mood } from "../../theme/Theme";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    nav("/login");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand className="napleon" href="/home">
          <img className="logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="nav flex accordion-collapse my-lg-0" navbarScroll>
            <div className="dark-mode">
              <Mood />
            </div>
            <Button
              className={`register-header ${
                location.pathname === "/Quiz" ? "active" : ""
              }`}
            >
              <Link className="link" to="/Quiz">
                الكويزات
              </Link>
            </Button>
            <Button
              className={`register-header ${
                location.pathname === "/startclass" ? "active" : ""
              }`}
            >
              <Link className="link" to="/startclass">
                بدأ حصة
              </Link>
            </Button>
            <Button
              className={`register-header ${
                location.pathname === "/Dashboard" ? "active" : ""
              }`}
            >
              <Link className="link" to="/Dashboard">
                الحسابات
              </Link>
            </Button>
            <Button
              className={`register-header ${
                location.pathname === "/AddGroups" ? "active" : ""
              }`}
            >
              <Link className="link" to="/AddGroups">
                اضافة مجموعة
              </Link>
            </Button>
            <Button
              className={`register-header ${
                location.pathname === "/students1" ? "active" : ""
              }`}
            >
              <Link className="link" to="/students1">
                الطلاب
              </Link>
            </Button>
            <Button
              className={`register-header  ${
                location.pathname === "/form" ? "active" : ""
              }`}
            >
              <Link className="link text-white" to="/form">
                تسجيل
              </Link>
            </Button>
            <Button className="btn btn-danger">
              <Link
              onClick={handleLogout}
               className="link text-white">
                تسجيل خروج
              </Link>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
