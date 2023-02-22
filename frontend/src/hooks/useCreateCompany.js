import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useCreateCompany = () => {
  const history = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();

  const createcompany = async (
    companyemail,
    companykey,
    companyname,
    contactnumber,
    companyaddress
  ) => {
    setIsloading(true);
    setError(null);

    const response = await fetch("/api/company/createcompany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyemail,
        companykey,
        companyname,
        contactnumber,
        companyaddress,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(json.error);
    }
    if (response.ok) {
      window.alert("Company create success");
      history("/");
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsloading(false);
    }
  };

  return { createcompany, isLoading, error };
};

export default useCreateCompany;
