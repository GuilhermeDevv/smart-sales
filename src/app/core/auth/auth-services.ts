"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { config } from "@/app/config";

function useAuthService() {
  const isServer = typeof window === "undefined";

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const loginService = useCallback(() => {
    if (token && !isServer) {
      localStorage.setItem(config.token_name, token);
    }
  }, [token, isServer]);

  const logoutService = useCallback(() => {
    if (isServer) return;
    localStorage.removeItem(config.token_name);
  }, [isServer]);

  return { loginService, logoutService };
}

export { useAuthService };
