import { authenticationService } from "../services/authenticationServices";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    authenticationService.logout();
    navigate("/");
  };
  return <button onClick={logout}>Logout</button>;
}
