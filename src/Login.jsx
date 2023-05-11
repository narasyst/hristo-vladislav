import data from "./users";
import "./index.css";
import { useRef, useState } from "react";
import MainPage from "./MainPage";
export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const name = useRef("");
  const handleSubmission = (e) => {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (name.current == data[i].name) {
        setIsLogin(true);
        return;
      }
    }
    alert("Invalid username, please try again");
  };

  return (
    <div>
      {isLogin ? (
        <MainPage />
      ) : (
        <form
          className="form"
          onChange={(e) => {
            name.current = e.target.value;
          }}
          onSubmit={handleSubmission}
        >
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            ref={name}
          />

          <button className="btn" type="submit">
            submit
          </button>
        </form>
      )}
    </div>
  );
};
