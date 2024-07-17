import React, { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../features/auth/authSlice';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        nav("/home");
      })
      .catch((err) => {
        console.error('Login failed: ', err);
      });
  };

  return (
    <div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              placeholder=""
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              placeholder=""
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <center>
            <button className="button1" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </center>
          {error && <p className="error mx-5 danger">{error}</p>}
        </form>
      </div>
    </div>
  );
}
