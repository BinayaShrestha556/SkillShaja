import React from "react";

const Loading = () => (
  <div className="w-full md:w-[90%] m-auto pt-2 px-1">
    <div className="text-xl font-semibold mb-4 animate-pulse">
      Popular Courses
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-2xl shadow p-4 flex flex-col gap-2 animate-pulse"
        >
          <div className="h-32 w-full bg-muted rounded-xl mb-2" />
          <div className="h-5 w-2/3 bg-muted rounded mb-1" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>
      ))}
    </div>
    <div className="text-xl font-semibold mb-4 animate-pulse">For You</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-2xl shadow p-4 flex flex-col gap-2 animate-pulse"
        >
          <div className="h-32 w-full bg-muted rounded-xl mb-2" />
          <div className="h-5 w-2/3 bg-muted rounded mb-1" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>
      ))}
    </div>
  </div>
);

export default Loading;
