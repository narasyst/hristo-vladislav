import data from "./users";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { Page } from "./Page";
import { Button, TextField } from "@mui/material";
export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const name = useRef("");
  const password = useRef("");

  const handleSubmission = (e) => {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (
        name.current == data[i].name &&
        password.current == data[i].password
      ) {
        setIsLogin(true);
        return;
      }
    }
    alert("Invalid username or password, please try again");
  };

  return (
    <div>
      {isLogin ? (
        <Page />
      ) : (
        <div className="input-wrapper">
          <form className="form" onSubmit={handleSubmission}>
            <div>
              <TextField
                label="Name"
                variant="standard"
                type="text"
                id="name"
                name="name"
                className="form-input"
                ref={name}
                onChange={(e) => {
                  name.current = e.target.value;
                }}
              />
            </div>
            <div>
              <TextField
                label="Password"
                style={{ marginTop: 30 }}
                variant="standard"
                type="password"
                id="password"
                name="password"
                className="form-input"
                ref={password}
                onChange={(e) => {
                  password.current = e.target.value;
                }}
              />
            </div>

            <Button variant="outlined" type="submit" style={{ marginTop: 30 }}>
              Log in
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
