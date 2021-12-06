import React, { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import store from "../store";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // const handleSignup = () => {
  //   fetch(`/api/signup?username=${username}&passwordUser=${password}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setUserLoggedIn(data.userExists));
  // };

  const handleUserFetch = (data) => {
    setUserLoggedIn(data.userExists);
    store.dispatch({
      type: "ADD_USER_ID",
      payload: data.userID,
    });
  };

  const handleLogin = (username, password) => {
    fetch(`/api/login?username=${username}&passwordUser=${password}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => handleUserFetch(data));
  };

  return (
    <>
      {!userLoggedIn && (
        <>
          <img
            style={{ marginTop: "3px", height: "4em", width: "4em" }}
            src="pinkFairyArmidallo.png"
            alt="Badass Armored PFA"
          />
          <h2 style={{ marginTop: "3px", marginLeft: "10px" }}>Login</h2>
          <input
            style={{ marginTop: "3px", marginLeft: "10px" }}
            className="form-group"
            placeholder="Username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <br></br>

          <input
            style={{ marginTop: "3px", marginLeft: "10px" }}
            className="form-group shadow-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button
            style={{
              borderRadius: "18px",
              height: "20px",
              width: "50px",
              fontSize: "10px",
            }}
          >
            Reveal
          </button>

          <PasswordStrengthMeter password={password} />

          <button
            style={{
              marginTop: "3px",
              marginLeft: "30px",
              backgroundColor: "blue",
              color: "white",
              borderRadius: "4px",
            }}
            onClick={() => handleLogin(username, password)}
          >
            {" "}
            Log in
          </button>
          <button
            style={{
              marginTop: "3px",
              marginLeft: "10px",
              borderRadius: "4px",
            }}
            disabled 
            // onClick={() => handleSignup(username, password)}
          >
            Sign up
          </button>
        </>
      )}

      {userLoggedIn && <Dashboard />}
    </>
  );
};

export default Login;