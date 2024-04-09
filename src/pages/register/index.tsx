import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const schema = z.object({
  name: z.string().min(1, { message: "Nome completo obrigatório!" }),
  email: z
    .string()
    .email("Insira um email válido!")
    .min(1, { message: "Email obrigatório!" }),
  password: z
    .string()
    .min(6, { message: "Senha tem que ter pelo menos 6 caracteres!" })
    .min(1, { message: "Senha obrigatória!" }),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { handleInfoUser } = useContext(AuthContext);

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid,
        });

        navigate("/dashboard", { replace: true });
        console.log("Cadastrado com sucesso");
      })
      .catch((error) => {
        alert("Erro ao concluir cadastro");
        console.log("Erro ao cadastrar usuário", error);
      });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-5 items-center justify-center h-screen px-5 max-w-[500px] ">
      <img src={Logo} alt="Web Carros" className="w-[300px]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5"
      >
        <Input
          name="name"
          type="text"
          placeholder="Digite seu nome completo"
          error={errors.name?.message}
          register={register}
        />
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
        <Button text="Cadastrar" />
      </form>
      <Link to={"/login"}>Já possui uma conta? Faça Login</Link>
    </div>
  );
}
