import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const inputDate = new Date(date);
  const diffMs = now.getTime() - inputDate.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;

  const sameYear = inputDate.getFullYear() === now.getFullYear();

  if (sameYear) {
    return inputDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }); // e.g., "Jun 30"
  }

  return inputDate.toISOString().split("T")[0]; // e.g., "2023-06-30"
}
