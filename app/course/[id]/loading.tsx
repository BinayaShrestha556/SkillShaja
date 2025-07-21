import React from "react";

const Loading = () => (
  <div className="w-[calc(100%-1.75rem)] md:w-[90%] m-auto mt-10">
    <div className="w-full md:w-[80%] m-auto flex flex-col lg:flex-row gap-10 justify-end rounded-3xl">
      <div className="relative w-full lg:w-[60%] aspect-[16/11] rounded-2xl bg-card shadow animate-pulse" />
      <div className="flex-1 gap-3 text-card-foreground p-8 rounded-3xl shadow bg-card flex flex-col animate-pulse">
        <div className="h-10 w-2/3 bg-muted rounded mb-4" />
        <div className="h-5 w-full bg-muted rounded mb-2" />
        <div className="h-5 w-1/2 bg-muted rounded mb-2" />
        <div className="flex gap-2 items-center mt-4">
          <div className="relative rounded-xl border p-1 bg-muted w-[35px] h-[35px]" />
          <div className="h-5 w-24 bg-muted rounded" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="h-10 w-full bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>
      </div>
    </div>
    <div className="md:w-[80%] m-auto bg-white rounded-3xl p-5 shadow mt-10 animate-pulse">
      <div className="h-7 w-32 bg-muted rounded mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);
export default Loading;
