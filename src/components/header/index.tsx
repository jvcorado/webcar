import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiUser, FiLogIn, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
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
          <FiUser size={24} color="#000" />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <button className="block w-full text-left px-4 py-2 text-sm text-black hover:opacity-80">
                <RxAvatar
                  className="inline-block mr-2"
                  color="#000000"
                  size={24}
                />{" "}
                {user?.name?.toUpperCase()}
              </button>
              {!(
                location.pathname === "/dashboard" ||
                location.pathname === "/dashboard/new-car"
              ) && (
                <Link
                  to="/dashboard"
                  className="block w-full text-left px-4 py-2 text-sm text-black"
                >
                  <MdDashboard
                    className="inline-block mr-2"
                    color="#000000"
                    size={24}
                  />
                  Dashboard
                </Link>
              )}

              {location.pathname !== "/" && (
                <Link
                  to={"/"}
                  className="block w-full text-left px-4 py-2 text-sm text-black "
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
        <Link to={"/login"} className="border-2 p-3 rounded-full ">
          <FiLogIn size={24} color="#000" />
        </Link>
      )}
    </header>
  );
}
