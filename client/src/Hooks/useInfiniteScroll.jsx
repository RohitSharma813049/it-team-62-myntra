import { useEffect } from "react";

const useInfiniteScroll = (callback, offset = 200) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.body.offsetHeight - offset;

      if (scrollPosition >= bottom) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback, offset]);
};

export default useInfiniteScroll;