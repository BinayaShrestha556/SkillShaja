import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
      <div className="lg:w-[55%] md:w-[65%] w-full m-auto bg-card rounded-3xl p-3 animate-pulse">
        <div className="w-full h-[320px] bg-muted rounded-3xl mb-4" />
        <div className="h-8 bg-muted rounded mb-2 w-1/2" />
        <div className="h-6 bg-muted rounded mb-2 w-1/3" />
      </div>
      <div className="lg:w-[70%] w-[calc(100%-12px)] m-auto px-2 rounded-3xl shadow bg-card mt-10 animate-pulse">
        <div className="h-16 bg-muted rounded mb-2" />
        <div className="h-16 bg-muted rounded mb-2" />
        <div className="h-16 bg-muted rounded mb-2" />
      </div>
      <div className="lg:w-[70%] w-[calc(100%-12px)] m-auto p-3 rounded-3xl shadow bg-card mt-10 animate-pulse">
        <div className="h-10 bg-muted rounded mb-2" />
        <div className="h-10 bg-muted rounded mb-2" />
      </div>
    </div>
  );
};

export default Loading;
