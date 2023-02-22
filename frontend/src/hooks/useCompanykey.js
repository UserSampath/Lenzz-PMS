import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useCompanykey = () => {
  const history = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();

  const checkcompany = async (companykey) => {
    setIsloading(true);
    setError(null);

    const response = await fetch("/api/company/checkcompany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companykey,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(json.error);
    }
    if (response.ok) {
      window.alert("entered your company");
      history("/Dashboard");
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsloading(false);
    }
  };

  return { checkcompany, isLoading, error };
};

export default useCompanykey;
