import { Link } from "react-router-dom";

function Nav() {
  return <div id="nav">
    <div className="container">
      <Link to="/" className="brand">
        RCS Photography
      </Link>
      <Link to="/about" className="link">
        About
      </Link>
    </div>
  </div>
}

export default Nav;