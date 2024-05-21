import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegHeart, FaRegStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useProfile } from "../../utils/useProfile";
import styled from "styled-components";

const CustomDiv = styled.div`
  height: 100vh;
`;

const PartnersView = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, roles, isAdmin } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [view, setView] = useState<string>("");

  useEffect(() => {}, [user]);

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return <CustomDiv>PARTNERS</CustomDiv>;
};

export default PartnersView;
