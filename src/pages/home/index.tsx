import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConnection";

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
  const navigate = useNavigate();

  const [cars, setCars] = useState<CarsProps[]>([]);

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
      });
    }

    loadCars();
  }, []);

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
              <img
                src={item.img.length > 0 ? item.img[0].url : ""}
                alt={item.uid}
                className="rounded-t-lg"
              />
              <div className="p-3 flex flex-col gap-2">
                <h1>{item.name}</h1>
                <h1>{item.model}</h1>
                <div className="flex gap-3">
                  <p>{item.year}</p>
                  <p>{item.km}KM</p>
                </div>
                <p>{item.price}</p>
                <hr />
                <p>{item.city}</p>
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
