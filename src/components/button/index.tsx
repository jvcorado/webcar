interface ButtonProps {
  onClick?: () => void;
  text: string;
  bg?: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`p-3 w-full text-lg font-semibold outline-none rounded-lg bg-[#2E2D37] text-white hover:opacity-80 transition-all`}
      >
        {text}
      </button>
    </>
  );
}
