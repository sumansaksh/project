import { Circles } from "react-loader-spinner";
import "./loader.css";
import React from "react";

const Loader = () => {
  return (
    <div className="loader_main_div">
      <Circles
        height="80"
        width="80"
        radius="9"
        color="#790252"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Loader;
