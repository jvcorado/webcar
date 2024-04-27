import { z } from "zod";
import Input from "../../../components/input";
import PanelDashboard from "../../../components/panelDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import Button from "../../../components/button";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { v4 as uuidV4 } from "uuid";
import { db, storage } from "../../../services/firebaseConnection";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { MdDelete } from "react-icons/md";
import { addDoc, collection } from "firebase/firestore";

const schema = z.object({
  name: z.string().toUpperCase().min(1, { message: "Nome obrigatório!" }),
  model: z.string().min(1, { message: "Modelo obrigatório!" }),
  marca: z.string().toUpperCase().min(1, { message: "Marca obrigatório!" }),
  year: z.string().min(4, { message: "Ano obrigatório!" }),
  km: z.string().min(4, { message: "KM rodados obrigatório!" }),
  price: z.string().min(1, { message: "Preço obrigatório!" }),
  city: z.string().min(1, { message: "Cidade obrigatória!" }),
  whatsapp: z
    .string()
    .min(1, { message: "WhatsApp obrigatório!" })
    .refine((value) => /^(\d{10,12})$/.test(value), {
      message: "Número de telefone inválido",
    }),
  description: z.string().min(1, { message: "Descrição obrigatória!" }),
});

type FormData = z.infer<typeof schema>;

interface Filters {
  name: string;
  value: string;
}

const data: Filters[] = [
  { name: "Audi", value: "Audi" },
  { name: "BMW", value: "BMW" },
  { name: "Chevrolet", value: "Chevrolet" },
  { name: "Ford", value: "Ford" },
  { name: "Fiat", value: "Fiat" },
  { name: "Honda", value: "Honda" },
  { name: "Hyundai", value: "Hyundai" },
  { name: "Jaguar", value: "Jaguar" },
  { name: "Kia", value: "Kia" },
  { name: "Mercedes-Benz", value: "Mercedes-Benz" },
  { name: "Nissan", value: "Nissan" },
  { name: "Toyota", value: "Toyota" },
  { name: "Volkswagen", value: "Volkswagen" },
];

interface ImageProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export default function New() {
  const { user } = useContext(AuthContext);
  const [carImages, setCarImages] = useState<ImageProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        alert("Envie uma imagem jpeg ou png");
        return;
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const itemImage = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        };

        setCarImages((images) => [...images, itemImage]);

        console.log("URL DA FOTO: ", downloadUrl);
      });
    });
  }

  async function handleDeleteImage(item: ImageProps) {
    const imagePath = `images/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImages(carImages.filter((car) => car.url !== item.url));
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  }

  function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      alert("Envie alguma imagem dessa carro");
      return;
    }

    const carListImage = carImages.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });

    addDoc(collection(db, "cars"), {
      name: data.name,
      model: data.model,
      marca: data.marca,
      year: data.year,
      price: data.price,
      km: data.km,
      city: data.city,
      description: data.description,
      whatsapp: data.whatsapp,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      email: user?.email,
      images: carListImage,
    })
      .then(() => {
        reset();
        setCarImages([]);
        alert("Cadastrado com sucesso");
      })
      .catch((error) => {
        alert("Erro ao cadastrar carro");
        console.log("Erro ao cadastrar carro", error);
      });

    console.log(data);
  }

  return (
    <div className="flex flex-col gap-5 ">
      <PanelDashboard />

      <div className="flex flex-col-reverse lg:flex-row  gap-5">
        <button className="relative  border-2 p-10 cursor-pointer w-full md:w-48 flex items-center justify-center rounded-lg">
          <div className="absolute cursor-pointer ">
            <FiUpload size={35} />
          </div>

          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </button>

        {/* DESKTOP */}
        {carImages.map((item) => (
          <div
            key={item.uid}
            className="hidden md:flex relative items-center justify-center rounded-lg"
          >
            <img
              src={item.previewUrl}
              alt={item.name}
              className="w-full  object-cover rounded-lg h-52 md:h-32"
            />
            <button
              onClick={() => handleDeleteImage(item)}
              className="absolute opacity-0 hover:opacity-100 w-full h-full flex items-center justify-center transition-all"
            >
              <MdDelete
                size={50}
                color="red"
                className="shadow-2xl bg-white p-3 rounded-full"
              />
            </button>
          </div>
        ))}

        {/* MOBILE */}
        <div className="overflow-x-auto md:hidden flex gap-3 w-full max-w-[100%] ">
          {carImages.map((item) => (
            <div
              key={item.uid}
              className=" relative min-w-full flex items-center justify-center rounded-lg"
            >
              <img
                src={item.previewUrl}
                alt={item.name}
                className="w-full  object-cover rounded-lg h-52 md:h-32"
              />
              <button
                onClick={() => handleDeleteImage(item)}
                className="absolute opacity-0 hover:opacity-100 w-full h-full flex items-center justify-center transition-all"
              >
                <MdDelete
                  size={50}
                  color="red"
                  className="shadow-2xl bg-white p-3 rounded-full"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-5 ">
        <div>
          <label>Nome do Carro</label>
          <Input
            name="name"
            placeholder="Ex: Onix 1.0..."
            type="text"
            error={errors.name?.message}
            register={register}
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <div className="flex-1">
            <label>Modelo</label>
            <Input
              name="model"
              placeholder="Ex: Flex Manual Completo"
              type="text"
              error={errors.model?.message}
              register={register}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="marca">Marca</label>
            <select
              required
              id="marca"
              className="p-3 w-full border-2 outline-none rounded-lg"
              {...register("marca")}
            >
              <option value="">Selecione uma marca</option>
              {data.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.marca && (
              <p className="text-red-600 font-semibold mt-1">
                {errors.marca?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex-1">
            <label>Ano</label>
            <Input
              name="year"
              placeholder="Ex: 2014/2015"
              type="text"
              error={errors.year?.message}
              register={register}
            />
          </div>
          <div className="flex-1">
            <label>Km</label>
            <Input
              name="km"
              placeholder="Ex: 50.000"
              type="text"
              error={errors.km?.message}
              register={register}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <div className="flex-1">
            <label>Preço do carro</label>
            <Input
              name="price"
              placeholder="Ex: 70.000"
              type="text"
              error={errors.price?.message}
              register={register}
            />
          </div>
          <div className="flex-1">
            <label>Cidade</label>
            <Input
              name="city"
              placeholder="Ex: São Paulo - SP"
              type="text"
              error={errors.city?.message}
              register={register}
            />
          </div>
          <div className="flex-1">
            <label>WhatsApp/Telefone</label>
            <Input
              name="whatsapp"
              placeholder="Ex: 1199999999"
              type="number"
              error={errors.whatsapp?.message}
              register={register}
            />
          </div>
        </div>

        <div>
          <label>Descrição</label>
          <textarea
            className="p-3 w-full border-2 outline-none rounded-lg"
            {...register("description")}
            name="description"
            id="description"
            placeholder="Descrição sobre o veículo"
          />
          {errors.description && (
            <p className="text-red-600 font-semibold mt-1">
              {errors.description?.message}
            </p>
          )}
        </div>

        <Button text="Cadastrar carro"></Button>
      </form>
    </div>
  );
}
