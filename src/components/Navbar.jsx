import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-initials">HS</span>
        <span className="logo-text">Himasree Dintakurthy</span>
      </div>
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Projects
        </NavLink>
      </div>
    </nav>
  )
}
