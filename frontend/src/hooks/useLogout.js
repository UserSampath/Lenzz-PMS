import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const history = useNavigate();
  const { dispatch } = useAuthContext();
  const logout = () => {
    // remove user from local
    history("/");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

export default useLogout;
