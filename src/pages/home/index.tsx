import { useNavigate } from "react-router-dom";

const cars = [
  {
    img: "https://www2.mercedes-benz.com.br/content/brazil/pt_BR/passengercars/models/suv/c167-fl-23-1/overview/_jcr_content/root/responsivegrid/highlight/slider/image_374337238.component.damq1.3396175832338.jpg/040U.jpg",
    car: " GLE Coupé",
    fabrication: "2023/2024",
    km: "50.000",
    price: "R$200.000",
    location: "São Paulo",
  },
  {
    img: "https://www2.mercedes-benz.com.br/content/brazil/pt_BR/passengercars/models/suv/c167-fl-23-1/overview/_jcr_content/root/responsivegrid/highlight/slider/image_374337238.component.damq1.3396175832338.jpg/040U.jpg",
    car: " GLE Coupé",
    fabrication: "2023/2024",
    km: "50.000",
    price: "R$200.000",
    location: "São Paulo",
  },
  {
    img: "https://www2.mercedes-benz.com.br/content/brazil/pt_BR/passengercars/models/suv/c167-fl-23-1/overview/_jcr_content/root/responsivegrid/highlight/slider/image_374337238.component.damq1.3396175832338.jpg/040U.jpg",
    car: " GLE Coupé",
    fabrication: "2023/2024",
    km: "50.000",
    price: "R$200.000",
    location: "São Paulo",
  },
  {
    img: "https://www2.mercedes-benz.com.br/content/brazil/pt_BR/passengercars/models/suv/c167-fl-23-1/overview/_jcr_content/root/responsivegrid/highlight/slider/image_374337238.component.damq1.3396175832338.jpg/040U.jpg",
    car: " GLE Coupé",
    fabrication: "2023/2024",
    km: "50.000",
    price: "R$200.000",
    location: "São Paulo",
  },
  {
    img: "https://www2.mercedes-benz.com.br/content/brazil/pt_BR/passengercars/models/suv/c167-fl-23-1/overview/_jcr_content/root/responsivegrid/highlight/slider/image_374337238.component.damq1.3396175832338.jpg/040U.jpg",
    car: " GLE Coupé",
    fabrication: "2023/2024",
    km: "50.000",
    price: "R$200.000",
    location: "São Paulo",
  },
  {
    img: "https://www2.mercedes-benz.com.br/content/brazil/pt_BR/passengercars/models/suv/c167-fl-23-1/overview/_jcr_content/root/responsivegrid/highlight/slider/image_374337238.component.damq1.3396175832338.jpg/040U.jpg",
    car: " GLE Coupé",
    fabrication: "2023/2024",
    km: "50.000",
    price: "R$200.000",
    location: "São Paulo",
  },
  {
    img: "https://www2.mercedes-benz.com.br/content/brazil/pt_BR/passengercars/models/suv/c167-fl-23-1/overview/_jcr_content/root/responsivegrid/highlight/slider/image_374337238.component.damq1.3396175832338.jpg/040U.jpg",
    car: " GLE Coupé",
    fabrication: "2023/2024",
    km: "50.000",
    price: "R$200.000",
    location: "São Paulo",
  },
];

export default function Home() {
  const navigate = useNavigate();

  function handleDetailsCar(id: number) {
    navigate(`/details/${id}`);
  }

  return (
    <section className="flex flex-col gap-5 ">
      <div className="w-full flex justify-center gap-5 items-center h-14  md:mt-5 xl:mt-10">
        <input
          type="text"
          placeholder="Digite o nome do carro..."
          className="border-2 p-5 w-9/12 lg:w-6/12  rounded-lg h-full outline-none placeholder:text-lg"
        />
        <button className="w-3/12 lg:w-1/12  bg-[#E11138] text-white rounded-lg  font-semibold text-lg h-[100%]">
          Buscar
        </button>
      </div>

      <h1 className="text-center text-xl md:text-3xl 2xl:text-4xl md:my-5 xl:my-10 ">
        Carros novos e seminovos no Brasil...
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-10">
        {cars.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white flex flex-col  rounded-lg shadow-xl border-2"
            >
              <img src={item.img} alt={item.car} className="rounded-t-lg" />
              <div className="p-3 flex flex-col gap-2">
                <h1>{item.car}</h1>
                <div className="flex gap-3">
                  <p>{item.fabrication}</p>
                  <p>{item.km}KM</p>
                </div>
                <p>{item.price}</p>
                <hr />
                <p>{item.location}</p>
                <button
                  onClick={() => handleDetailsCar(index)}
                  className="p-3 bg-green-700 rounded-lg text-white text-base font-semibold"
                >
                  Detalhes
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
