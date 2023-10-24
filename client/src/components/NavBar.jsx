import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [name, setName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  }, [id]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink">
      <div className="container color-pink">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <Link to='/dashboard'>
              <a className="nav-link link-primary" href="dashboard">
                Dashboard
              </a>
              </Link>
            </li>

            <li className="nav-item link-primary">
              <Link to='/'>
                <a className="nav-link link-info" href="#">
                  Home
                </a>
              </Link>
            </li>
          
            {/* <li className="nav-item">
              <Link to='/login'>
                <a className="nav-link" href="#">
                  Log In
                </a>
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {/* Icon */}
          <a className="text-reset me-3" href="#">
            <i className="fas fa-shopping-cart"></i>
          </a>

          {/* Notifications */}
          <div className="dropdown">
            <Link to='login'>
          <button className="btn btn-outline-primary ms-auto px-4 rounded-pill"><i className="fa fa-sign-in me-2"></i> Log In</button>
          </Link>
          <Link to='register'>
              <button className="btn btn-outline-primary ms-auto px-4 rounded-pill"><i className="fa fa-user-plus me-2"></i> Register</button>
              </Link>
            <a
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell"></i>
              {/* <span className="badge rounded-pill badge-notification bg-danger">1</span> */}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              
              {/* <li>
                <a className="dropdown-item" href="tips">
                  Something else here
                </a>
              </li> */}
            </ul>
          </div>
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <label htmlFor="name" className="form-label">
                User: {name} 
              </label>
              {/* <img
                // src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              /> */}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <Link to='expenses'>
              <li >
                <a className="dropdown-item" href="#">
                  My Expenses
                </a>
                
              </li>
              </Link>
              <li>
                <Link to='expenses'>
                <a className="dropdown-item" >
                 Update 
                </a>
                </Link>
              </li>
              

              <li>
                <a className="dropdown-item" href="logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
