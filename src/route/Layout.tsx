import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/task">Task</Link>
        </li>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
