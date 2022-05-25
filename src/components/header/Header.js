import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/">
          The
          <span> Breaking Bad </span>
        </Link>
      </h1>
      <nav className="header__menu">
        <ul>
          <li>
            <NavLink
              end
              style={({ isActive }) => ({
                color: isActive ? "red" : "inherit",
              })}
              to="/"
            >
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "inherit",
              })}
              to="/episodes"
            >
              Episodes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
