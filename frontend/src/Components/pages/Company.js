import { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import "./Company.css";
import { Button } from "react-bootstrap";

import ProjectDetails from "./ProjectDetails";
const Company = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/project/showproject");
      const json = await response.json();

      if (response.ok) {
        setProjects(json);
      }
    };

    fetchProjects();
  }, []);
  return (
    <SideBar>
      <div>
        <div
          className="card shadow"
          style={{
            width: " 1440px",
            height: " 655px",
            marginLeft: "25px",
            marginTop: "60px",
          }}
        >
          <h1 style={{ marginLeft: "555px" }}>Hasthiya It</h1>
          <div
            className="card shadow"
            style={{
              width: " 1395px",
              height: " 315px",
              marginLeft: "25px",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex" }}>
              <h1 style={{ marginLeft: "25px", marginTop: "10px" }}>
                Projects
              </h1>
              <Button
                variant="info"
                style={{
                  width: "200px",
                  height: "50px",
                  marginTop: "15px",
                  marginLeft: "25px",
                  padding: "10px",
                  fontSize: "20px",
                  color: "white",
                }}
                block
                href="./Createproject"
              >
                Add project
              </Button>
            </div>
          </div>
          <div
            className="card shadow"
            style={{
              width: " 1395px",
              height: " 315px",
              marginLeft: "25px",
              marginTop: "60px",
              marginBottom: "50px",
            }}
          >
            <div style={{ display: "flex" }}>
              <h1 style={{ marginLeft: "25px", marginTop: "10px" }}>Members</h1>
              <Button
                variant="info"
                style={{
                  width: "200px",
                  height: "50px",
                  marginTop: "15px",
                  marginLeft: "25px",
                  padding: "10px",
                  fontSize: "20px",
                  color: "white",
                }}
                block
                href="./Createproject"
              >
                Add Member
              </Button>
            </div>
          </div>
        </div>
        <div className="Projects"></div>
      </div>
    </SideBar>
  );
};

export default Company;
