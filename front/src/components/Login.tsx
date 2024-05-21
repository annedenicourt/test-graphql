import { useEffect, useState } from "react";
import { LOGIN } from "../graphql/user.graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setView }) => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loginMutation] = useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log("succes", data);
      reset();
      Cookies.set("accessToken", data?.login.accessToken, {
        expires: 1 / 24, //expires in 1 hour
        secure: true,
      });

      toast("Connexion réussie !", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      navigate("/");
    },
    onError: ({ message }) => {
      console.log(message);
      toast(message);
    },
  });

  useEffect(() => {}, []);

  const onSubmit = (values: any) => {
    console.log(values);
    loginMutation({
      variables: {
        userInput: values,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8 text-3xl">CONNEXION</div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border rounded-md"
            />
          </div>
          {errors.email && (
            <div className="text-red-600">Ce champ est requis</div>
          )}
        </div>
        <div className="mt-6">
          <label htmlFor="password">Mot de passe</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              {...register("password", { required: true })}
              className="w-full border rounded-md"
            />
            <div
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-1 flex items-center"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && (
            <div className="text-red-600">Ce champ est requis</div>
          )}
        </div>
        <div className="my-8">
          <button type="submit">Je me connecte</button>
        </div>
      </form>
      <div className="mt-8">
        <div>Vous n'avez pas de compte ?</div>
        <div onClick={() => setView("signup")}>Inscrivez-vous</div>
      </div>
    </div>
  );
};

export default Login;
