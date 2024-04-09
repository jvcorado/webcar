import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useEffect } from "react";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido!")
    .min(1, { message: "Email obrigatório!" }),
  password: z.string().min(1, { message: "Senha obrigatória!" }),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("Logado com sucesso");
        console.log(user);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        alert("Email ou senha inválidos");
        console.log("Erro ao fazer login", error);
      });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-5 items-center justify-center h-screen px-5 max-w-[500px]  ">
      <img src={Logo} alt="Web Carros" className="w-[300px]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5"
      >
        <Input
          name="email"
          type="text"
          placeholder="Digite seu email..."
          error={errors.email?.message}
          register={register}
        />
        <Input
          name="password"
          type="password"
          placeholder="*********"
          error={errors.password?.message}
          register={register}
        />
        <Button text="Entrar" />
      </form>

      <Link to={"/register"}>Ainda não possui uma conta: Cadastre-se</Link>
    </div>
  );
}
