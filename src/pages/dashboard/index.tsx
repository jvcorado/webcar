import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PanelDashboard from "../../components/panelDashboard";
import { db, storage } from "../../services/firebaseConnection";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FiTrash2 } from "react-icons/fi";
import { deleteObject, ref } from "firebase/storage";
import CardCar from "../../components/cardCar";
import CardCarLoad from "../../components/cardCarLoad";
import New from "./new";

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

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    function loadCarsDash() {
      if (!user?.uid) {
        return;
      }

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

      getDocs(queryRef)
        .then((snapshot) => {
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
          console.log(listCars);
        })
        .catch((error) => {
          console.error("Error fetching cars:", error);
        });
    }

    loadCarsDash();
  }, [user]);

  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoads) => [...prevImagesLoads, id]);
  }

  async function handleCarRemove(car: CarsProps) {
    if (window.confirm("Deseja excluir anúncio?")) {
      const ItemCar = car;

      const carDocRef = doc(db, "cars", ItemCar.id);
      await deleteDoc(carDocRef);

      ItemCar.img.map(async (images) => {
        const imagePath = `images/${images.uid}/${images.name}`;
        const imageRef = ref(storage, imagePath);

        try {
          await deleteObject(imageRef);
          setCars(cars.filter((item) => item.id !== ItemCar.id));
        } catch (error) {
          console.log("Erro ao remover imagem", error);
        }
      });
    }
  }

  return (
    <div className="flex flex-col gap-5 ">
      {!load && <CardCarLoad />}

      {load && cars.length === 0 && <New />}

      {load && cars.length >= 1 && (
        <>
          <PanelDashboard />

          <p className="text-lg  md:text-3xl leading-10">Seus anúncios:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-10">
            {cars.map((item) => {
              return (
                <div
                  key={item.id}
                  className="relative bg-white flex flex-col  rounded-lg shadow-xl border-2"
                >
                  <div
                    className="w-full min-h-52 rounded-t-lg bg-gray-200 animate-pulse"
                    style={{
                      display: loadImages.includes(item.id) ? "none" : "block",
                    }}
                  ></div>
                  <img
                    src={item.img.length > 0 ? item.img[0].url : ""}
                    alt={item.uid}
                    className="rounded-t-lg  min-h-52 object-center object-cover max-h-52 "
                    onLoad={() => handleImageLoad(item.id)}
                    style={{
                      display: loadImages.includes(item.id) ? "block" : "none",
                    }}
                  />

                  <button
                    onClick={() => handleCarRemove(item)}
                    className="absolute  mx-auto flex items-center justify-center w-full h-full rounded-full opacity-0 hover:opacity-100 transition-all"
                  >
                    <FiTrash2
                      size={50}
                      color="red"
                      className="bg-white p-3 rounded-full shadow-2xl"
                    />
                  </button>

                  <CardCar
                    name={item.name}
                    city={item.city}
                    km={item.km}
                    model={item.model}
                    price={item.price}
                    year={item.year}
                    key={item.id}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
