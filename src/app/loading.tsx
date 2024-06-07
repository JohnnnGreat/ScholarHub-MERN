import React from "react";

const LoadingPage = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full flex items-center justify-center">
      <span className="loading loading-ball loading-md"></span>
    </div>
  );
};

export default LoadingPage;
