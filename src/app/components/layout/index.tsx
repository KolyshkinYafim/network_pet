import { Outlet, useNavigate } from "react-router-dom";
import Container from "../container";
import Header from "../header";
import NavBar from "@components/nav-bar";
import { selectIsAuth, selectUser } from "@/app/store/slices/userSlice";
import { useEffect } from "react";
import { useTypedSelector } from "@/app/store/store";
import Profile from "../profile";

const Layout = () => {
  const isAuth = useTypedSelector(selectIsAuth);
  const user = useTypedSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  );
};
export default Layout;
