import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export default function Input({
  type,
  placeholder,
  register,
  rules,
  error,
  name,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="p-3 w-full border-2 outline-none rounded-lg"
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-600 font-semibold mt-1">{error}</p>}
    </div>
  );
}
