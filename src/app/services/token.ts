"use client";

import { config } from "../config";

function getToken() {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return null;
  }
  const token = localStorage.getItem(config.token_name ?? "") || "4575387";

  // if (!token) {
  //   throw new Error("Token not found in local storage");
  // }
  return token;
}

export { getToken };
