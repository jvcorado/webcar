import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";

interface AuthProviderProps {
  children: ReactNode;
}

interface UsersProps {
  uid: string;
  name: string | null;
  email: string | null;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({ name, email, uid }: UsersProps) => void;
  user: UsersProps | null;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UsersProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    //verifica usuario
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      //cancela verificação
      unsub();
    };
  }, []);

  function handleInfoUser({ name, email, uid }: UsersProps) {
    setUser({
      name,
      email,
      uid,
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loadingAuth, handleInfoUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
