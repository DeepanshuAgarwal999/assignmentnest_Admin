import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import cookie from "cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookie = (name: string, value: any, days: number = 7) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = cookie.serialize(name, value, {
    expires,
    path: "/",
    httpOnly: false, // Cookie should not be accessible via JavaScript
    // secure: process.env.NODE_ENV === "production", // Cookie should only be sent over HTTPS in production
    sameSite: "lax", // Prevent CSRF attacks
  });
};
const isBrowser = typeof window !== "undefined";
export const getCookie = (name: string) => {
  if (isBrowser) {
    // Client-side: use document.cookie
    const cookies = cookie.parse(document.cookie || "");
    return cookies[name];
  } else {
    // Server-side: use server-side cookie handling (if needed)
    return null;
  }
};

export const removeCookie = (name: string) => {
  document.cookie = cookie.serialize(name, "", {
    maxAge: -1,
    path: "/",
  });
};

export const generateColor = (length: number): string => {
  const colors: string[] = [
    "#A3E4D7",
    "#9B59B6",
    "#F1C40F",
    "#2ECC71",
    "#E67E22",
    "#1ABC9C",
    "#34495E",
    "#16A085",
    "#E74C3C",
    "#2980B9",
    "#3498DB",
  ];

  return colors[length % 10];
};

export function formatDate(timestamp: number | string): string {
  const date = new Date(timestamp);

  // Extract day, month, and year
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Format to d/m/yyyy
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
export function formatDateEpoch(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  // Extract day, month, and year
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Format to d/m/yyyy
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
