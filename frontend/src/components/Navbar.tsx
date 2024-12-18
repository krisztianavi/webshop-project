import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserAlt, FaStore } from 'react-icons/fa';  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <FaStore /> 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart /> 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <FaUserAlt />
              </Link>
            </li>
          </ul>
          <Link className="btn btn-outline-light" to="/login">
            Bejelentkezem
          </Link>
          <Link className="btn btn-outline-light ms-2" to="/register">
            Regisztrálok
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
