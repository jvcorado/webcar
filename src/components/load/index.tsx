const Spinner = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      <h1 className="text-center text-xl md:text-3xl 2xl:text-4xl md:my-5 xl:my-10 text-[#2E2E37]">
        CARREGANDO...
      </h1>
    </div>
  );
};

export default Spinner;
