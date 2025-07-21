import React from "react";

const Loading = () => (
  <div className="w-full md:w-[90%] m-auto p-2">
    <div className="w-full m-auto pt-2 flex flex-wrap items-center gap-4 animate-pulse">
      <div className="relative aspect-square h-16 md:h-20 lg:h-24 p-1 rounded-full overflow-hidden bg-card shadow" />
      <div>
        <div className="h-6 md:h-8 w-32 bg-card shadow rounded mb-2" />
        <div className="h-4 w-48 bg-card shadow rounded" />
      </div>
      <div className="self-end mb-5">
        <div className="h-6 w-36 bg-card shadow rounded" />
      </div>
    </div>
    <div className="h-10 w-full bg-card shadow rounded mb-4" />
    <div className="h-32 w-full bg-card shadow rounded" />
  </div>
);

export default Loading;
