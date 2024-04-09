import { Link } from "react-router-dom";

export default function PanelDashboard() {
  return (
    <header className="bg-[#E11138] w-full rounded-lg p-3 flex items-center gap-3 text-white font-semibold text-base ">
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/dashboard/new-car"}>Novo carro</Link>
    </header>
  );
}
