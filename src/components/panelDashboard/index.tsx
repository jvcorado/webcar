import { Link } from "react-router-dom";

export default function PanelDashboard() {
  return (
    <header className="bg-[#E11138] w-full rounded-lg p-2 md:p-3 flex items-center gap-3 text-white font-semibold text-base">
      {location.pathname !== "/dashboard" && (
        <Link to="/dashboard">Dashboard</Link>
      )}
      {location.pathname !== "/dashboard/new-car" && (
        <Link to="/dashboard/new-car">Novo carro</Link>
      )}
    </header>
  );
}
