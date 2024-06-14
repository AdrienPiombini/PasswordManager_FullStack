import { useState } from "react";

import { authenticationService } from "../../services/authenticationServices";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    user_credential: "",
    user_password: "",
  });

  const onChange = (event: any) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const [error, setError] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const res = await authenticationService.login(credentials);
    if (res == false) {
      setError("An error occured, your connexion failed");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>LOGIN</h3>
        <div className="group">
          <label htmlFor="login"></label>
          <input
            type="text"
            name="user_credential"
            placeholder="user_credentials"
            id=""
            value={credentials.user_credential}
            onChange={onChange}
          />
        </div>

        <div className="group">
          <label htmlFor="login"></label>
          <input
            type="password"
            name="user_password"
            placeholder="user_credentials"
            id=""
            value={credentials.user_password}
            onChange={onChange}
          />
        </div>

        <div className="group">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button>Connexion</button>
        </div>
      </form>
    </div>
  );
}
