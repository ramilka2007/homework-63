import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
    return (
        <nav className="navbar navbar-dark bg-body mb-4">
            <div className="container-fluid">
                <NavLink className="navbar-brand text-black" to="/">
                    My blog
                </NavLink>

                <div className="d-flex flex-row align-items-center gap-2 justify-content-evenly">
                    <NavLink className="nav-link text-black" to="/">
                        Home
                    </NavLink>
                    <NavLink className="nav-link text-black" to="/new-post">
                        Add
                    </NavLink>
                    <NavLink className="nav-link text-black" to="/about">
                        About
                    </NavLink>
                    <NavLink className="nav-link text-black" to="/contacts">
                        Contacts
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;
