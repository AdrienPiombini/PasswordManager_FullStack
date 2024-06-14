import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateDataButton from "../../components/CreateDataButton";
import { dashboardService } from "../../services/dashboardService";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await dashboardService.getAll();
        setDashboardData(res.data);
      } catch (err) {
        setError(
          "Une erreur s'est produite lors de la récupération des données."
        );
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <CreateDataButton />
      <h2>Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Email</th>
            <th>Website</th>
            <th>User Secret</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.map((data, index) => (
            <tr key={index}>
              <td>{data.identifiant}</td>
              <td>{data.email}</td>
              <td>{data.website}</td>
              <td>{data.user_secret}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
}
