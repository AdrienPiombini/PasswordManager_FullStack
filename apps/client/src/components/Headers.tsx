import { authenticationService } from "../services/authenticationServices";
import Logout from "./LogoutButton";

export default function Header() {
  const isLogged = authenticationService.isLogged();

  return (
    <div className="container">
      <h1>HEADER</h1>
      {isLogged && <Logout />}
    </div>
  );
}
