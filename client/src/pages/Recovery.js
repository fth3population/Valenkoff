import React from "react";
import imgRecovery from "../assets/img/recovery/recovery.GIF";

const Recovery = () => {
  return (
    <div className="container mx-auto flex-col flex justify-between items-center">
      <h1>404 ooops</h1>
      <img src={imgRecovery} alt="" />
    </div>
  );
};

export default Recovery;
