import { Outlet, Link } from "react-router-dom";
import './layout.css'


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/HelloWorld">Hello World</Link>
          </li>
          <li>
            <Link to="/ProductList">Product List</Link>
          </li>
          <li>
            <Link to="/Logowanie">Logowanie</Link>
          </li>
        </ul>
      </nav>
      <Outlet />

    </>
  )
};

export default Layout;