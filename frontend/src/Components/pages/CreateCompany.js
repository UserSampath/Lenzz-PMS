import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import useCreateCompany from "../../hooks/useCreateCompany";
const CreateCompany = () => {
  const [companyname, setcompanyname] = useState("");
  const [companyemail, setcompanyemail] = useState("");
  const [companykey, setcompanykey] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [companyaddress, setcompanyaddress] = useState("");
  const { createcompany, isLoading, error } = useCreateCompany();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createcompany(
      companyemail,
      companykey,
      companyname,
      contactnumber,
      companyaddress
    );
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-6 d-flex flex-column align-items-center text-white justify-content-center form order-2 ">
            <h1 className="display-4 fw-bolder">Hello, Friend</h1>
            <p className="lead text-center">
              Enter your company details to register
            </p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/login"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Login
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">CREATE YOUR COMPANY</h1>
            <div
              className="mform"
              style={{ width: "450px", marginLeft: "50px" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Company name" className="form-label">
                    Company name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyname"
                    onChange={(e) => setcompanyname(e.target.value)}
                    value={companyname}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="company email" className="form-label">
                    Company Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyemail"
                    onChange={(e) => setcompanyemail(e.target.value)}
                    value={companyemail}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="company key" className="form-label">
                    Company key
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companykey"
                    onChange={(e) => setcompanykey(e.target.value)}
                    value={companykey}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactnumber" className="form-label">
                    contact number
                  </label>
                  <input
                    type=""
                    className="form-control"
                    id="password"
                    onChange={(e) => setcontactnumber(e.target.value)}
                    value={contactnumber}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="companyaddress" className="form-label">
                    Company Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyaddress"
                    onChange={(e) => setcompanyaddress(e.target.value)}
                    value={companyaddress}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-primary w-100 mt-4 rounded-pill"
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
  );
};

export default CreateCompany;
