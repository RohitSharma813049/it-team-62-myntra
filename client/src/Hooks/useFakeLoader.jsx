// hooks/useFakeLoader.js
import { useState, useEffect } from "react";

const useFakeLoader = (time = 1500) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), time);
    return () => clearTimeout(timer);
  }, [time]);

  return loading;
};

export default useFakeLoader;