interface cardProps {
  name: string;
  year: string;
  km: string;
  price: string | number;
  city: string;
  uid?: string;
  id?: string;
  owner?: string;
  model: string;
  whatsapp?: string;
  email?: string;
  created?: string;
  description?: string;
}

export default function CardCar({
  name,
  year,
  km,
  price,
  city,
  model,
}: cardProps) {
  return (
    <>
      <div className="p-3 flex flex-col h-full justify-between gap-2 ">
        <h1 className="text-[#2E2E37] text-base uppercase">{name}</h1>
        <p className="text-[#81818C] text-sm uppercase">{model}</p>
        <h1 className="text-[#2E2E37] font-semibold">R${price}</h1>
        <div className="flex justify-between items-center gap-3">
          <p className="text-[#81818C] text-sm">{year}</p>
          <p className="text-[#81818C] text-sm">{km} Km</p>
        </div>
        <hr />
        <p className="text-[#81818C] text-sm">{city}</p>
      </div>
    </>
  );
}
