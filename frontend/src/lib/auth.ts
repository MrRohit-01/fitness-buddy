// src/lib/auth.ts
export const isAuthenticated = () => {
    return localStorage.getItem("auth") === "true"
  }
  