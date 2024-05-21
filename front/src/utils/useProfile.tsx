import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/user.graphql";

enum Role {
  ADMIN = "ADMIN",
}

export const useProfile = () => {
  const {
    data: userData,
    loading,
    error,
    refetch,
  } = useQuery(GET_USER, {
    /*  onError: (err) => {
      if (err.message === "Token error: Account not found")
        authManager.logout();
    }, */
  });
  const roles = userData?.getUser?.roles || [];
  const isAdmin = roles.includes("admin");

  const user = userData?.getUser;
  return {
    isAdmin,
    user,
    roles,
    loading,
    error,
    refetch,
  };
};
