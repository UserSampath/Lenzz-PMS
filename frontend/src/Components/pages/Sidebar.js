import { useState } from "react";
import {
  FaBars,
  FaCommentAlt,
  FaRegChartBar,
  FaCog,
  FaCity,
  FaThLarge,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLogout } from "../../hooks/useLogout";
import "./SideBar.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const Sidebar = ({ children }) => {
  const [open, SetOpen] = useState(false);

  const toggle = () => SetOpen(!open);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  const menuItem = [
    {
      path: "/Company",
      name: "Company",
      icon: <FaCity />,
    },
    {
      path: "/Progress",
      name: "Progress",
      icon: <FaRegChartBar />,
    },
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: <FaThLarge />,
    },
    {
      path: "/ChatRoom",
      name: "ChatRoom",
      icon: <FaCommentAlt />,
    },
    {
      path: "/Settings",
      name: "settings",
      icon: <FaCog />,
    },
  ];
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#075d88" }}
        fixed="top"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Members" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">member 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">member 2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">member 3</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Add Member
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {user && (
              <div className="ss">
                <span>{user.email}</span>
                <button className="logout" onClick={handleClick}>
                  Logout
                </button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="sideBarContainer">
        <div className="sidebar" style={{ width: open ? "230px" : "50px" }}>
          <div className="topSection">
            <img
              style={{ display: open ? "block" : "none" }}
              className="logo"
              src="images/logo.png"
              alt="logo"
            />
            <div
              className="bars"
              style={{ marginLeft: open ? "60px" : "12px" }}
            >
              <FaBars onClick={toggle} className="fabars" />
            </div>
          </div>
          <div>
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) => (isActive ? "active" : "noActive")}
              >
                <div className="icon">{item.icon} </div>
                <div
                  style={{ display: open ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
