import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router";

const Navbar = () => {
  const { user, logOut, isLoading, isAdmin } = UserAuth() ?? {};
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handlesSignOut = async () => {
    try {
      // Show confirmation dialog
      const confirmDelete = await Swal.fire({
        title: "Are you sure you want to log-out?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "yes",
        cancelButtonText: "no",
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#2196f3",
      });

      if (!confirmDelete.isConfirmed) return;

      await logOut();
      localStorage.removeItem("isAdmin");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    if (user) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);

    switch (option) {
      case "signOut":
        handlesSignOut();
        break;
      case "profile":
        navigate("/userprofile");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "favorites":
        navigate("/favorites");
        break;
      case "contactUs":
        navigate("/ContactUs");
        break;
      case "ReadMore":
        navigate("/ReadMore");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Nav>
        <div className="brand">
          <a href="/">
            <div className="container">SCE-Movie-Social</div>
          </a>
        </div>

        <div className="pages">
          <ul>
            <li className={location.pathname === "/posts" ? "active" : ""}>
              <a href="/posts">Posts</a>
            </li>
            <li className={location.pathname === "/movie" ? "active" : ""}>
              <a href="/movie">Movie</a>
            </li>
            <li className={location.pathname === "/tv" ? "active" : ""}>
              <a href="/tv">TV</a>
            </li>
            <li className={location.pathname === "/search" ? "active" : ""}>
              <a href="/search">Search</a>
            </li>
            <li className={location.pathname === "/contactus" ? "active" : ""}>
              <a href="/contactus">Contact-us</a>
            </li>
            <li className={location.pathname === "/aboutus" ? "active" : ""}>
              <a href="/aboutus">About-us</a>
            </li>
            <li className={location.pathname === "/readmore" ? "active" : ""}>
              <a href="/readmore">Read-More</a>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {isLoading ? (
              <span>loading</span>
            ) : user ? (
              <span>{user?.displayName}</span>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </button>
          {isOpen && user && (
            <ul className="dropdown-menu">
              {isAdmin && (
                <li>
                  <button onClick={() => handleOptionClick("admin")}>
                    Admin
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => handleOptionClick("profile")}>
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleOptionClick("favorites")}>
                  Favorites
                </button>
              </li>
              <li>
                <button onClick={() => handleOptionClick("signOut")}>
                  Sign OUT
                </button>
              </li>
            </ul>
          )}
        </div>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  font-size: 20px;
  font-weight: 600;
  background-image: linear-gradient(
    260deg,
    rgb(42, 244, 152, 1) 0%,
    #3498db 100%
  );
  justify-content: space-between;
  padding-left: 2rem;
  z-index: 10;

  .dropdown {
    margin-top: -20px;
    position: relative;
  }

  .dropdown button {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .dropdown-toggle {
    background-color: #333;
    color: #fff;
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    border: none;
    margin-top: 1rem;
    cursor: pointer;
    margin-right: 24px;
    font-weight: 499;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #023e8a;
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
  }

  .dropdown-toggle:hover {
    background-color: #0761b9;
    color: #fff;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin: 0;
    padding: 0.5rem 0;
    list-style: none;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .dropdown-menu li {
    margin: 0.8rem;
  }

  .dropdown-menu button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    color: #333;
    text-align: left;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    color: #000;
  }

  .dropdown-menu button:hover {
    color: white;
  }

  @media only screen and (max-width: 600px) {
    .dropdown-menu li {
      margin: 0.8rem 0;
    }

    .dropdown {
      margin-top: 0.5px;
    }
    .dropdown button {
      padding: 0.5rem;
      padding-top: 0rem;
    }
  }
  .pages ul li.active {
    background-color: #333;
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    a {
      color: white;
      padding-top: 0.5rem;
    }
  }

  .pages {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0;
      padding: 0;

      li {
        margin: 0.5rem;

        a {
          padding: 0.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          color: #333;

          &:hover {
            background-color: #333;
            color: #fff;
          }
        }
      }
    }
  }

  button {
    background-color: #333;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    margin-top: 1rem;

    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-right: 24px;
    font-weight: 499;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #023e8a;
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #023e8a;
    }
  }
  .brand {
    padding-right: 4rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;

    .container {
      cursor: pointer;
      gap: 0.4rem;
      font-weight: 900;
      text-transform: uppercase;
      transition: 0.1s ease-in-out;
      color: white;
      text-decoration: underline;
      &:hover {
        color: #023e8a;
      }
    }
    .toggle {
      display: none;
    }
  }
  ul {
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #ffba08;
        font-size: 1.3rem;
        font-weight: 650;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .brand {
      margin-bottom: 0;
    }

    .pages {
      ul {
        li {
          margin: 0;

          a {
            padding: 0.5rem 1rem;
          }
        }
      }
    }

    button {
      margin-top: 0;
    }
  }
`;

export default Navbar;
