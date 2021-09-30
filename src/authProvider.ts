import { AuthProvider } from "@pankod/refine";
import { useGetIdentity } from "@pankod/refine";

export const TOKEN_KEY = "refine-auth";

export const mockUsers = [{ username: "admin", roles: ["admin"] }, { username: "editor", roles: ["admin"] }]; 
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem(TOKEN_KEY, username);
      return Promise.resolve();
    }
    return Promise.reject(new Error("username: admin, password: admin"));
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
        const parsedUser = JSON.parse(auth);
        return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
        const parsedUser = JSON.parse(auth);
        return Promise.resolve(parsedUser.username);
    }
    return Promise.reject();
  },
};
