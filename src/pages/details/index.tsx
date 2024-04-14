import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import { FaWhatsapp } from "react-icons/fa";
import CardCarLoadDetail from "../../components/cardCarLoadDetail";
interface CarsProps {
  img: ImageProps[];
  name: string;
  year: string;
  km: string;
  price: string | number;
  city: string;
  uid: string;
  id: string;
  owner: string;
  model: string;
  whatsapp: string;
  email: string;
  created: string;
  description: string;
}

interface ImageProps {
  name: string;
  uid: string;
  url: string;
}

export default function Details() {
  const { id } = useParams();
  const [car, setCar] = useState<CarsProps>();
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function loadCarDetail() {
      if (!id) {
        return;
      }

      const carsRef = doc(db, "cars", id);

      getDoc(carsRef).then((snapshot) => {
        setCar({
          id: snapshot.data()?.id,
          name: snapshot.data()?.name,
          model: snapshot.data()?.model,
          year: snapshot.data()?.year,
          km: snapshot.data()?.km,
          city: snapshot.data()?.city,
          price: snapshot.data()?.price,
          img: snapshot.data()?.images,
          uid: snapshot.data()?.uid,
          owner: snapshot.data()?.owner,
          email: snapshot.data()?.email,
          whatsapp: snapshot.data()?.whatsapp,
          created: snapshot.data()?.created,
          description: snapshot.data()?.description,
        });
      });

      setLoad(true);
    }

    loadCarDetail();
  }, [id]);

  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoads) => [...prevImagesLoads, id]);
  }

  return (
    <>
      {!load && <CardCarLoadDetail />}

      {load && car && (
        <main
          key={car?.id}
          className="relative bg-white flex flex-col gap-5 rounded-lg shadow-xl border-2"
        >
          <div
            className="w-full h-72 bg-gray-200"
            style={{
              display: loadImages.includes(car?.id) ? "none" : "block",
            }}
          ></div>
          <img
            src={car?.img.length > 0 ? car?.img[0].url : ""}
            alt={car?.uid}
            className="rounded-t-lg object-cover object-center max-h-96"
            onLoad={() => handleImageLoad(car?.id)}
            style={{
              display: loadImages.includes(car?.id) ? "block" : "none",
            }}
          />

          <div className="p-3 flex flex-col gap-2">
            <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-start">
              <div className="">
                <h1 className="text-2xl text-[#2E2E37] font-bold">
                  {car?.name}
                </h1>
                <h1 className="text-base md:text-lg text-[#81818C] font-normal">
                  {car?.model}
                </h1>
              </div>
              <h1 className=" text-xl md:text-2xl font-semibold text-[#2E2E37]">
                R${car?.price}
              </h1>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col">
                <span className="text-base text-[#81818C] ">Cidade</span>
                <p className=" text-base md:text-lg text-[#2E2E37] font-semibold">
                  {car?.city}
                </p>
              </div>

              <div className="flex flex-col">
                <span className="text-base text-[#81818C] ">Ano</span>
                <p className=" text-base md:text-lg text-[#2E2E37] font-semibold">
                  {car?.year}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-base text-[#81818C] ">KM</span>
                <p className=" text-base md:text-lg text-[#2E2E37] font-semibold">
                  {car?.km}
                </p>
              </div>
            </div>

            <hr />

            <div className="flex flex-col">
              <span className="text-base text-[#81818C] ">
                Sobre esse carro
              </span>
              <p className="text-sm md:text-base leading-6 text-[#2E2E37]">
                {car?.description}
              </p>
            </div>

            <hr />

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-3">
              <p className="text-base md:text-lg text-[#2E2E37] font-semibold">
                {car?.owner}
              </p>
              <a
                className="text-base flex items-center justify-center  gap-1 font-semibold bg-[#25D366] w-full md:w-[200px] p-3 rounded-lg text-[#ffffff]"
                href={`https://wa.me/${car?.whatsapp}?text=Tenho%20interesse%20no%20seu%20carro%20${car?.name}%20modelo%20${car?.model}`}
              >
                Chamar no ZAP
                <FaWhatsapp size={24} color="white" />
              </a>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
