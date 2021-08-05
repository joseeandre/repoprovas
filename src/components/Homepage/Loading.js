import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div align="center">
      <Loader
        color="#FFFFFF"
        type="ThreeDots"
        height={40}
        width={80}
      />
    </div>
  );
};

export default Loading;