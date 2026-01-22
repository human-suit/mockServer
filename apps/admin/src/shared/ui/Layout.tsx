import { Outlet, NavLink } from "react-router-dom";
import "../../styles/layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/waybills">Waybills</NavLink>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
