import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200 }}>
        <NavLink to="/waybills">Waybills</NavLink>
      </aside>

      <main style={{ padding: 16, flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
