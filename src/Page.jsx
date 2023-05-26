import React, { useCallback, useEffect } from "react";
import { useReducer, useRef, useState } from "react";
import { GET_CAPITAL, GET_SUBREGION } from "./useReducer/actions";
import reducer from "./useReducer/reducer";
import useFetch from "./useFetch";
import { TextField, Button } from "@mui/material";
import "./index.css";

export const Page = () => {
  console.log("page rendered");
  const ref = useRef({ input: "", url: "" });

  const [isDone, setIsDone] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    ref.current.url = `https://restcountries.com/v2/name/${ref.current.input.toLowerCase()}`;

    setIsDone(true);

    console.log("state updated");
  };

  const Country = ({ url }) => {
    const { isLoading, isError, data } = useFetch(url);
    console.log("country rendered");

    if (isLoading) {
      return <h2>Loading...</h2>;
    }
    if (isError) {
      return <h2>Error!</h2>;
    }

    return <Info data={data[0]} />;
  };

  return (
    <div>
      {isDone ? (
        <>
          <Country url={ref.current.url} />
        </>
      ) : (
        <div className="input-container">
          <form className="form" onSubmit={handleSubmission}>
            <TextField
              label="Country"
              style={{ marginTop: 30 }}
              variant="standard"
              id="country"
              name="country"
              className="form-input"
              onChange={(e) => {
                ref.current.input = e.target.value;
              }}
            />

            <Button
              className="btn"
              variant="contained"
              type="submit"
              style={{ marginTop: 30 }}
            >
              get
            </Button>
          </form>
        </div>
      )}
    </div>
  );
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
    <>
      <div className="info-container">
        <Button className="btn" variant="contained" onClick={getCapital}>
          get capital
        </Button>
        <h2 className="info">{state.capital}</h2>
      </div>
      <div className="info-container">
        <Button className="btn" variant="contained" onClick={getSubregion}>
          {state.subregion || "get subregion"}
        </Button>
        <h2 className="info">{state.subregion}</h2>
      </div>
    </>
  );
};
