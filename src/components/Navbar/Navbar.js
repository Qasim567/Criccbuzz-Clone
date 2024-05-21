import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg" style={{ background: '#009270', width: '100%' }}>
        <div className="container-fluid">
          <Link to="/" target="_self" className="cb-hm-text">
            <img height="40" width="101" alt="Cricbuzz Logo" src="https://static.cricbuzz.com/images/cb_logo.svg" />
          </Link>
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
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 w-50" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <li className="nav-item">
                <Link className="nav-link text" aria-current="page" to="/" style={{ color: 'white' }}>
                  Live Scores
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text" to="" style={{ color: 'white' }}>
                  Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text" aria-current="page" to="" style={{ color: 'white' }}>
                  Archives
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text" aria-current="page" to="" style={{ color: 'white' }}>
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text" aria-current="page" to="/series" style={{ color: 'white' }}>
                  Series
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text" aria-current="page" to="/player" style={{ color: 'white' }}>
                  Player
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                  Teams
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Action</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                  Rankings
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/rankingMen">ICC Rankings - Men</Link></li>
                  <li><Link className="dropdown-item" to="#">ICC Rankings - Women</Link></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-light" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
