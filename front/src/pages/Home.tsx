import { useEffect, useState } from "react";
import { GET_ALL_USERS, SIGNUP } from "../graphql/user.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegHeart, FaRegStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import { partners } from "../utils/data";
import { useProfile } from "../utils/useProfile";

type Department = {
  nom: string;
  code: string;
  codeRegion?: string;
  codeDepartement?: string;
  codesPostaux?: string[];
};

const Home = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, roles, isAdmin, loading } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<Department[]>([]);
  const [filterByDep, setFilterByDep] = useState<string>("");
  const [filterByCity, setFilterByCity] = useState<string>("");

  useEffect(() => {
    if (roles?.includes("admin")) {
      navigate("/admin");
    }
  }, [user]);

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    getCities();
  }, [filterByCity, filterByDep]);

  const getDepartments = async () => {
    const request = await axios.get("https://geo.api.gouv.fr/departements");
    if (request.data.length > 0) {
      setDepartments(request.data);
    }
  };

  const getCities = async () => {
    if (filterByDep !== "") {
      const request = await axios.get(
        `https://geo.api.gouv.fr/departements/${filterByDep}/communes`
      );
      setCities(request.data);
    }
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };
  if (loading) return <></>;

  return (
    <div>
      <NavBar />
      <div className="h-96 bg-fuchsia-100">
        <img
          src="/images/discount-tag.png"
          alt="réduction shopping"
          className="h-full object-cover"
        />
      </div>
      <div className="my-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <select
              {...register("department")}
              onChange={(e) => setFilterByDep(e.target.value)}
            >
              <option value="">Département</option>
              {departments.map((dep) => {
                return (
                  <option key={dep.code} value={dep.code}>
                    {dep.code}-{dep.nom}
                  </option>
                );
              })}
            </select>
            <select
              {...register("city")}
              onChange={(e) => setFilterByCity(e.target.value)}
              disabled={filterByDep !== "" ? false : true}
            >
              <option value="">
                {filterByDep !== ""
                  ? "Ville"
                  : "Veuillez choisir un département"}
              </option>
              {cities.map((city: any) => {
                return (
                  <option key={city.code} value={city.code}>
                    {city.codesPostaux[0]}-{city.nom}
                  </option>
                );
              })}
            </select>
            <select {...register("category")}>
              <option value="">Catégorie</option>
            </select>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap">
        {partners?.map((partner, index) => {
          return (
            <div key={`partner-${index}`} className="w-1/4 px-2">
              <div className="relative mb-4 border rounded-lg shadow-lg">
                <div className="text-center">{partner.category}</div>
                <div>
                  <img src={partner.src} alt={partner.name} />
                </div>
                <div>{partner.department}</div>
                <div>{partner.city}</div>
                <div>{partner.name}</div>
                <div>{partner.offer}</div>
                <div className="absolute top-1 right-1">
                  <FaRegHeart size={20} color={"orange"} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
