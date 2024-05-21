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
import UsersView from "../../components/admin/UsersView";
import PartnersView from "../../components/admin/PartnersView";
import { FaArrowRight } from "react-icons/fa";

const CustomDiv = styled.div`
  height: 100vh;
`;

const AdminDashboard = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, roles, isAdmin } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [view, setView] = useState<string>("users");

  useEffect(() => {}, [user]);

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <CustomDiv>
      <div className="h-full flex">
        <div className="w-64 bg-fuchsia-100">
          <div className="">
            <img
              src="/images/discount-tag.png"
              alt="réduction shopping"
              className="h-full object-cover"
            />
          </div>
          <div className="">
            <div
              onClick={() => setView("users")}
              className={`pl-3 py-3 flex items-center justify-between ${
                view === "users" ? "font-bold bg-fuchsia-300" : ""
              } cursor-pointer`}
            >
              <div>USERS</div>
              {view === "users" && (
                <div>
                  <FaArrowRight />
                </div>
              )}
            </div>
            <div
              onClick={() => setView("partners")}
              className={`pl-3 py-3 flex items-center justify-between ${
                view === "partners" ? "font-bold bg-fuchsia-300" : ""
              } cursor-pointer`}
            >
              <div>PARTNERS</div>
              {view === "partners" && (
                <div>
                  <FaArrowRight />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => {
              Cookies.remove("accessToken");
              window.location.reload();
            }}
          >
            SE DÉCONNECTER
          </div>
          <div>
            {view === "users" && <UsersView />}
            {view === "partners" && <PartnersView />}
          </div>
        </div>
      </div>
    </CustomDiv>
  );
};

export default AdminDashboard;
