import React, { useState } from "react";

import "./EnterCompany.css";

import useCompanykey from "../../hooks/useCompanykey";
function EnterCompany() {
  const [companykey, setCompanykey] = useState("");
  const { checkcompany, isLoading, error } = useCompanykey();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkcompany(companykey);
  };
  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-6 d-flex flex-column align-items-center text-white justify-content-center order-2 form ">
            <h1 className="display-4 fw-bolder">JOIN THE COMPANY</h1>
            <p className="lead text-center">Enter your Credentials </p>
            <h5 className="mb-4">OR</h5>
          </div>
          <div className="col-md-6 p-5  ">
            <h1 className="display-6 fw-bolder mb-5">JOIN WITH YOUR COMPANY</h1>
            <div
              className="lg"
              style={{ marginLeft: "95px", marginTop: "125px" }}
            >
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="mb-4 w-75">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Enter Company key
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    onChange={(e) => setCompanykey(e.target.value)}
                    value={companykey}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-75  rounded-pill mt-3 h-25 p-20"
                  disabled={isLoading}
                >
                  Submit
                </button>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    /*
    <div className=" formain">
      <div className="main-container">
        <h1 className="mainc">Join company</h1>
      </div>
      <div className="formboxC">
        <label>Enter Company key</label>
        <input type="email" name="email" class="form-control"></input>
      </div>

      <submitPopup
        class="btn btn-primary"
        style={{
          width: "380px",
          height: "50px",
          size: "20px",
          top: " 60%",
          position: "absolute",
          marginLeft: "39%",
        }}
      >
        Submit
      </submitPopup>
      <submitPopup />

      <Link to="/Methods">
        <p className="Methods">Back to Choose</p>
      </Link>
    </div>*/
  );
}

export default EnterCompany;
