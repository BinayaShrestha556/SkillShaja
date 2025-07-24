"use client";
const CommentLoading = () => (
  <div className="w-full">
    <div className="flex"></div>
    <div className="flex flex-col w-full gap-4 mt-4 text-black">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex gap-3 items-start animate-pulse bg-muted/60 rounded-xl p-3"
        >
          <div className="w-10 h-10 rounded-full bg-muted" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-1/4 bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CommentLoading;
