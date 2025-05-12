import {NavLink} from "react-router"

const TopNav = () => {
  return (
      <nav>
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/profile" end>Profile</NavLink></li>
          <li><NavLink to="/apps" end>Apps</NavLink></li>
        </ul>
      </nav>
  )
}
export default TopNav