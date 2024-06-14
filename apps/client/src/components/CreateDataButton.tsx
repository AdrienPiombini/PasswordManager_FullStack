import { useNavigate } from "react-router-dom";

export default function CreateDataButton() {
  const navigate = useNavigate();
  const createData = () => {
    navigate("createData");
  };
  return <button onClick={createData}>createData</button>;
}
