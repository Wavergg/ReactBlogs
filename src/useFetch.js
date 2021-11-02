import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(async (res) => {
        if (!res.ok) {
          setIsPending(false);
          throw Error("Failed to fetch data from blogs API");
        }
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setData(data);
        setError(null);
        setIsPending(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
