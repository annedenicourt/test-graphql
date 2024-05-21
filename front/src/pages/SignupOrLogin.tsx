import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

const SignupOrLogin = () => {
  //const navigate = useNavigate();
  const [view, setView] = useState("login");

  /* useEffect(() => {
    if (Cookies.get("accessToken")) navigate("/");
  }, []); */

  return (
    <div>
      {view === "signup" ? (
        <Signup setView={setView} />
      ) : (
        <Login setView={setView} />
      )}
    </div>
  );
};

export default SignupOrLogin;
