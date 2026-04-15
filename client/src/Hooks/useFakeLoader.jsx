import { useState, useEffect, useRef } from "react";

const useFakeLoader = (time = 1500) => {
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, time);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [time]);

  const resetLoader = () => {
    setLoading(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, time);
  };

  return { loading, resetLoader };
};

export default useFakeLoader;