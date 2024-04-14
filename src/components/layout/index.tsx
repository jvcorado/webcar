import Header from "../header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="px-5 lg:px-10 container mx-auto py-5 flex flex-col gap-5  min-h-[calc(100vh-100px)]">
        <Outlet />
      </div>
    </>
  );
}
