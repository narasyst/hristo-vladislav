import React from "react";
import { useReducer, useRef, useState } from "react";
import { GET_CAPITAL, GET_SUBREGION } from "./useReducer/actions";
import reducer from "./useReducer/reducer";
import useFetch from "./useFetch";
import { TextField, Button } from "@mui/material";

export const Page = () => {
  const input = useRef("");
  const url = useRef("");

  const [isDone, setIsDone] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    url.current = `https://restcountries.com/v2/name/${input.current.toLowerCase()}`;
    setIsDone(true);
  };

  return (
    <div>
      {isDone ? (
        <Country url={url.current} />
      ) : (
        <div className="input-container">
          <form className="form" ref={input} onSubmit={handleSubmission}>
            <TextField
              label="Country"
              style={{ marginTop: 30 }}
              variant="standard"
              id="country"
              name="country"
              className="form-input"
              ref={input}
              onChange={(e) => {
                input.current = e.target.value;
              }}
            />
            <Button variant="contained" type="submit" style={{ marginTop: 30 }}>
              get
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
const Country = (props) => {
  const { isError, isLoading, data } = useFetch(props.url);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Is error</h2>;
  }

  return <Info data={data[0]} />;
};

const Info = (props) => {
  const defaultState = {
    capital: null,
    subregion: null,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const getCapital = () => {
    dispatch({ type: GET_CAPITAL, payload: props.data });
  };

  const getSubregion = () => {
    dispatch({ type: GET_SUBREGION, payload: props.data });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginTop: "2rem",
          marginRight: "2rem",
        }}
        onClick={getCapital}
      >
        {state.capital || "get capital"}
      </Button>

      <Button
        variant="contained"
        style={{ marginTop: "2rem" }}
        onClick={getSubregion}
      >
        {state.subregion || "get subregion"}
      </Button>
    </div>
  );
};
