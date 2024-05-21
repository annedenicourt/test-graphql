import { useEffect, useState } from "react";
import { SIGNUP } from "../graphql/user.graphql";
import { useMutation } from "@apollo/client";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const Signup: React.FC<SignupProps> = ({ setView }) => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorPassword, setErrorPassword] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [createUserMutation] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      console.log("succes", data);
      reset();
      Cookies.set("accessToken", data?.signup.accessToken, {
        expires: 1 / 24, //expires in 1 hour
        secure: true,
      });
      toast("Votre compte a été crée!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      navigate("/");
    },
    onError: ({ message }) => {
      toast(message);
    },
  });

  useEffect(() => {}, []);

  const onSubmit = (values: any) => {
    console.log(values);
    const { firstName, lastName, email, password } = values;
    const input = { firstName, lastName, email, password };

    createUserMutation({
      variables: {
        userInput: input,
      },
    });
  };

  const isSamePassword = (values: FieldValues) => {
    const { password, confirm } = values;
    if (password !== confirm) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="my-8 text-3xl">INSCRIPTION</div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="w-full border rounded-md"
            />
            {errors.firstName && (
              <div className="text-red-600">Ce champ est requis</div>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="w-full border rounded-md"
            />
            {errors.lastName && (
              <div className="text-red-600">Ce champ est requis</div>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border rounded-md"
            />
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
          <div className="mt-6">
            <label htmlFor="confirm">Confirmation mot de passe</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                {...register("confirm", { required: true })}
                onBlur={() => isSamePassword(getValues())}
                className="w-full border rounded-md"
              />
              <div
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-1 flex items-center"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {errors.confirm && (
              <div className="text-red-600">Ce champ est requis</div>
            )}
            {errorPassword && (
              <div className="text-red-600">
                Le mot de passe n'est pas identique
              </div>
            )}
          </div>
          <div className="my-8">
            <button type="submit">Je m'inscris</button>
          </div>
        </form>
        <div>
          <div>Vous avez déjà un compte ?</div>
          <div onClick={() => setView("login")}>Connectez-vous</div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
