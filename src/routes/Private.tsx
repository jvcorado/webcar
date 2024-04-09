import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ReactNode, useContext } from "react";

interface PrivateProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Private({ children }: PrivateProps): any {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
