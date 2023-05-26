import { useEffect, useState, useRef } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return;
    }
    console.log("useEffect invoked");

    const fetchData = async () => {
      try {
        const resp = await fetch(url);

        if (!resp.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        const response = await resp.json();
        setData(response);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { isLoading, isError, data };
};

export default useFetch;
