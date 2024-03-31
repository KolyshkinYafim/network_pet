import { useContext } from "react";
import { ThemeContext } from "../theme-provider";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Theme } from "../../enums";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { useTypedSelector } from "@/app/store/store";
import { logout, selectIsAuth } from "@/app/store/slices/userSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAuth = useTypedSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={() => toggleTheme()}
        >
          {theme === Theme.light ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuth && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout /> <span>Logout</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
