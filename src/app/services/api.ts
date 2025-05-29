"use client";

import axios from "axios";
import { config } from "../config";

function getApi() {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return null;
  }
  const token = localStorage.getItem(config.token_name ?? "") || "4575387";

  // if (!token) {
  //   throw new Error("Token not found in local storage");
  // }
  const api = axios.create({
    baseURL: config.api_base_url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
}

export { getApi };
