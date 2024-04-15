import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import CardCar from "../../components/cardCar";
import CardCarLoad from "../../components/cardCarLoad";
import { Swiper, SwiperSlide } from "swiper/react";
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
  email: string;
}

interface ImageProps {
  name: string;
  uid: string;
  url: string;
}

export default function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [load, setLoad] = useState(false);
  const [sliderPerview] = useState<number>();

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));

      getDocs(queryRef).then((snapshot) => {
        const listCars = [] as CarsProps[];

        snapshot.forEach((doc) => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            model: doc.data().model,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            img: doc.data().images,
            uid: doc.data().uid,
            owner: doc.data().owner,
            email: doc.data().email,
          });
        });

        setCars(listCars);
        setLoad(true);
      });
    }

    loadCars();
  }, []);

  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoads) => [...prevImagesLoads, id]);
  }

  return (
    <section className="flex flex-col gap-5 ">
      <div className="w-full flex justify-center gap-5 items-center h-12 md:h-14  md:mt-5 xl:mt-10">
        <input
          type="text"
          placeholder="Digite o nome do carro..."
          className="border-2 p-5 w-9/12 lg:w-7/12  xl:w-6/12 rounded-lg h-full outline-none placeholder:text-lg"
        />
        <button className="w-3/12 lg:w-2/12 xl:w-1/12  bg-[#E11138] text-white rounded-lg  font-semibold text-lg h-[100%]">
          Buscar
        </button>
      </div>

      {!load && (
        <>
          <h1 className="text-center text-xl md:text-3xl 2xl:text-4xl md:my-5 xl:my-10 text-[#2E2E37]"></h1>
          <CardCarLoad />
        </>
      )}

      {load && cars.length === 0 && (
        <h1 className="text-center text-xl md:text-3xl 2xl:text-4xl md:my-5 xl:my-10 text-[#2E2E37] ">
          No momento não temos nenhum carro anunciado
        </h1>
      )}

      {load && cars.length >= 1 && (
        <>
          <h1 className="text-center text-xl md:text-3xl 2xl:text-4xl md:my-5 xl:my-10 text-[#2E2E37]">
            Carros novos e seminovos no Brasil...
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-10">
            {cars.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-white flex flex-col rounded-lg shadow-xl border-2"
                >
                  <Swiper
                    slidesPerView={sliderPerview}
                    navigation
                    pagination={{ clickable: true }}
                  >
                    {item?.img.map((item) => {
                      return (
                        <SwiperSlide key={item.uid} className="">
                          <div
                            className="w-full min-h-52 rounded-t-lg bg-gray-200 animate-pulse"
                            style={{
                              display: loadImages.includes(item?.uid)
                                ? "none"
                                : "block",
                            }}
                          ></div>
                          <img
                            src={item.url}
                            alt={item.name}
                            className="rounded-t-lg  min-h-52 object-center object-cover max-h-52"
                            onLoad={() => handleImageLoad(item?.uid)}
                            style={{
                              display: loadImages.includes(item?.uid)
                                ? "block"
                                : "none",
                            }}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <CardCar
                    name={item.name}
                    city={item.city}
                    km={item.km}
                    model={item.model}
                    price={item.price}
                    year={item.year}
                    key={item.id}
                  />
                  <Link
                    to={`/details/${item.id}`}
                    className="mx-3 mb-3 p-3 rounded-lg text-center bg-[#2E2D37] text-white"
                  >
                    Ver mais
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
