import { useEffect, useState } from "react";
import layoutResponsiveObserve from "../utils/layoutObserve";

const useLayoutResize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const token = layoutResponsiveObserve.subscribe((size) => {
      console.log(" 执行了", size);
      setSize(size);
    });
    return () => {
      layoutResponsiveObserve.unSubscribe(token);
    };
  }, []);

  return [size];
};
export default useLayoutResize;
