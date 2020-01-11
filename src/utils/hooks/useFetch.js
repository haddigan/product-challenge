import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = endpoint => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(endpoint);
      setData(data);
    };
    fetch();
  }, [endpoint]);
  return data;
};

export default useFetch;
