import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./passwordChange.css";
import { NavLink } from "react-router-dom";
const PasswordChange = () => {
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const setVal = (e) => {
    setEmail(e.target.value);
  };
  const sendLink = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/user/sendpasswordlink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.status === 201) {
      setEmail("");
      setmessage(true);
    } else {
      toast.error("Invalid email");
    }
  };
  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter your Email</h1>
          </div>
          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              password reset link send Succsfully in Your Email
            </p>
          ) : (
            ""
          )}

          <form>
            <div className="form_input">
              <label htmlFor="email">Enter your Email</label>
              <input
                type="text"
                value={email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter your email"
              ></input>
            </div>
            <button className="butt " onClick={sendLink}>
              send
            </button>
          </form>
          <ToastContainer />
          <NavLink to="/" className="log" style={{ textDecoration: "none" }}>
            Back to Login
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default PasswordChange;
