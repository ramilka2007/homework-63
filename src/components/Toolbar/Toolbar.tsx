import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-dark bg-black mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white fw-bold" to="/">
          ramilka's blog
        </NavLink>

        <div className="d-flex flex-row align-items-center gap-2 justify-content-evenly">
          <NavLink className="nav-link text-white" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link text-white" to="/new-post">
            Add
          </NavLink>
          <NavLink className="nav-link text-white" to="/about">
            About
          </NavLink>
          <NavLink className="nav-link text-white" to="/contacts">
            Contacts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
