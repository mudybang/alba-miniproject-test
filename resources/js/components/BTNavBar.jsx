import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
const CustomNavBar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const handleMenuCollapse = () => setIsMenuCollapsed(!isMenuCollapsed);
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2" data-bs-theme="dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button onClick={() => setIsNavCollapsed(!isNavCollapsed)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/dashboard/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard/about">About</NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/dashboard/blog">Blog</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <a onClick={handleMenuCollapse} className={`${isMenuCollapsed ? 'show' : ''} nav-link dropdown-toggle`} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={!isMenuCollapsed ? true : false}>
                        Dropdown
                    </a>
                    <div className={`${isMenuCollapsed ? 'show' : ''} dropdown-menu`} aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav navbar-right">
                <li>
                    <NavLink className="btn btn-primary" to="/dashboard/login">Login</NavLink>
                </li>
            </ul>

        </div>
    </nav>
  );
};

export default CustomNavBar
