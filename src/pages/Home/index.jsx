import React from "react";
import { useEffect } from "react";
import useLayoutResize from "../../hooks/useLayoutResize";

export default function Home() {
  const [size] = useLayoutResize();

  useEffect(() => {
    console.log(size);
  }, [size.width]);
  return (
    <div
      id="layout"
      style={{ width: "100%", height: "100vh", background: "pink" }}
    >
      hihi, {size.width}, {size.height}
    </div>
  );
}
