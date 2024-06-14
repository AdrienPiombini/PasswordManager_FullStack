import Axios from "./callerService";

const login = (credentials: any) => {
  return Axios.post("/login", credentials)
    .then((res) => {
      const token = res.data.body.accessToken;
      saveToken(token);
      return true;
    })
    .catch(() => false);
};

const register = async (credentials: any): Promise<boolean> => {
  return Axios.post("/register", credentials)
    .then((res) => {
      const token = res.data.body.accessToken;
      saveToken(token);
      return true;
    })
    .catch(() => false);
};

const saveToken = (token: any) => {
  localStorage.setItem("token", token);
};

const logout = () => {
  localStorage.removeItem("token");
};

const isLogged = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const getToken = () => {
  return localStorage.getItem("token");
};
export const authenticationService = {
  saveToken,
  logout,
  isLogged,
  login,
  getToken,
  register,
};
