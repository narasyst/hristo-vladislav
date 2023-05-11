import { useRef, useState } from "react";
import useFetch from "./useFetch";

const MainPage = () => {
  const input = useRef("");
  const url = useRef("");
  const [isDone, seIsDone] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    url.current = `https://restcountries.com/v2/name/${input.current.toLowerCase()}`;
    seIsDone(true);
  };

  return (
    <div>
      {isDone ? (
        <Country url={url.current} />
      ) : (
        <form
          className="form"
          onChange={(e) => {
            input.current = e.target.value;
          }}
          onSubmit={handleSubmission}
        >
          <label>Country: </label>
          <input type="text" className="form-input" ref={input} />

          <button className="btn" type="submit">
            get
          </button>
        </form>
      )}
    </div>
  );
};
const Country = (props) => {
  const { isLoading, isError, data } = useFetch(props.url);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error!</h2>;
  }
  return <h2>{data[0].capital}</h2>;
};
export default MainPage;
