import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../utils/useProfile";
import styled from "styled-components";
import { GET_ALL_USERS, UPDATE_USER } from "../../graphql/user.graphql";
import { User } from "../../utils/types";

const CustomDiv = styled.div`
  height: 100vh;
`;

const UsersView = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, roles, isAdmin } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: usersData } = useQuery(GET_ALL_USERS);
  const allUsers = usersData?.getUsers;

  const [updateUserMutation] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      console.log("succes", data);
    },
    refetchQueries: [GET_ALL_USERS, "getUsers"],
  });

  useEffect(() => {}, [user]);

  const onSubmit = (user: User) => {
    const roles = user.roles.includes("admin")
      ? [...user?.roles.filter((role) => role !== "admin")]
      : [...user?.roles, "admin"];

    updateUserMutation({
      variables: {
        userId: user?._id,
        userInput: {
          roles,
        },
      },
    });
  };

  return (
    <CustomDiv>
      <div>
        {allUsers?.length > 0 ? (
          <div>
            <div className="flex">
              <div className="w-1/4">Nom</div>
              <div className="w-1/4">Email</div>
              <div className="w-1/4">Rôle</div>
              <div className="w-1/4">Administrateur</div>
            </div>
            {allUsers?.map((user: User) => {
              return (
                <div key={`user-${user._id}`} className="flex">
                  <div className="w-1/4">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="w-1/4">{user.email}</div>
                  <div className="w-1/4">{user.roles[0]}</div>
                  <div className="w-1/4">
                    <form>
                      <input
                        type="checkbox"
                        checked={user.roles.includes("admin")}
                        onChange={(e) => onSubmit(user)}
                        defaultValue={user.roles[0]}
                      />
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Pas de users</div>
        )}
      </div>
    </CustomDiv>
  );
};

export default UsersView;
