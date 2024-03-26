import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative flex h-dvh w-screen flex-col">
      <Outlet />
    </div>
  );
};

export default Layout;
