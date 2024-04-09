import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PanelDashboard from "../../components/panelDashboard";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className=" flex flex-col gap-5 ">
      <PanelDashboard />
      <h1>Seja Bem Vindo {user?.name}</h1>
    </div>
  );
}
