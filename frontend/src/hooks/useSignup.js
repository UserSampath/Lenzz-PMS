import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();
  const history = useNavigate();
  const signup = async (firstname, lastname, email, password, selectedJob) => {
    setIsloading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,

        selectedJob,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      if (json.selectedJob === "System admin") {
        history("/CreateCompany");
      }
      if (
        json.selectedJob === "Developer" ||
        json.selectedJob === "Team lead" ||
        json.selectedJob === "Project manager"
      ) {
        history("/EnterCompany");
      }
      console.log(json.selectedJob);

      dispatch({ type: "LOGIN", payload: json });
      window.alert("Register success");

      setIsloading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
