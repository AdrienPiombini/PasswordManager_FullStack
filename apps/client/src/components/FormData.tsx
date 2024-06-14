import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../services/dashboardService";

const FormData = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifiant: "",
    email: "",
    website: "",
    user_secret: "",
  });

  const [error, setError] = useState("");

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.identifiant) {
      setError("L'identifiant est requis.");
      return;
    }

    const res = dashboardService.save(formData);
    if (!res) {
      setError("Une erreur est survenue lors de la soumission du formulaire.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          name="identifiant"
          placeholder="identifiant"
          value={formData.identifiant}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="website"
          placeholder="website"
          value={formData.website}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="user_secret"
          placeholder="user secret"
          value={formData.user_secret}
          onChange={onChange}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Soumettre</button>
    </form>
  );
};

export default FormData;
