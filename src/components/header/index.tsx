import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiUser, FiLogIn, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { MdDashboard } from "react-icons/md";
import { FaHome, FaRegRegistered } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

export default function Header() {
  const { signed, loadingAuth, user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="sticky z-50 top-0 px-5 lg:px-10 h-[100px] w-full bg-white flex items-center justify-between border border-b-2">
      <Link to={"/"}>
        <img src={Logo} alt="Web Carros" />
      </Link>

      {!loadingAuth && signed && (
        <div
          className="relative border-2 p-3 rounded-full cursor-pointer "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiUser size={24} color="#2E2E37" />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg">
              <p className="block w-full font-semibold text-left px-4 py-2 text-sm text-[#2E2E37]">
                <RxAvatar
                  className="inline-block mr-2"
                  color="#2E2E37"
                  size={24}
                />{" "}
                {user?.name?.toUpperCase()}
              </p>
              {!(
                location.pathname === "/dashboard" ||
                location.pathname === "/dashboard/new-car"
              ) && (
                <Link
                  to="/dashboard"
                  className="block w-full text-left px-4 py-2 text-sm text-[#2E2E37]"
                >
                  <MdDashboard
                    className="inline-block mr-2"
                    color="#2E2E37"
                    size={24}
                  />
                  Dashboard
                </Link>
              )}

              {location.pathname !== "/" && (
                <Link
                  to={"/"}
                  className="block w-full text-left px-4 py-2 text-sm text-[#2E2E37] "
                >
                  <FaHome
                    className="inline-block mr-2"
                    color="#000000"
                    size={24}
                  />{" "}
                  Home
                </Link>
              )}

              <button
                className="block w-full text-left px-4 py-2 text-sm text-black "
                onClick={() => handleLogout()}
              >
                <FiLogOut
                  className="inline-block mr-2"
                  color="#E11138"
                  size={24}
                />
                Sair da conta
              </button>
            </div>
          )}
        </div>
      )}

      {!loadingAuth && !signed && (
        <div
          className="relative cursor-pointer "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="flex gap-1 items-center">
            <RxAvatar size={30} color="#2E2E37" /> entrar
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg">
              <Link
                to={"/login"}
                className=" flex items-center gap-1  w-full text-left px-4 py-2 text-sm text-[#2E2E37]"
              >
                <FiLogIn size={24} color="#2E2E37" />
                Login
              </Link>
              <Link
                to={"/register"}
                className=" flex items-center gap-1  w-full text-left px-4 py-2 text-sm text-[#2E2E37]"
              >
                <FaRegRegistered size={24} color="#2E2E37" />
                Criar conta
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
