import NavButton from "@components/nav-button";
import { BsPostcard } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const NavBar = () => {
  return (
    <nav className="flex flex-cal gap-5">
      <ul>
        <li>
          <NavButton href={"/"} icon={<BsPostcard />}>
            <span>Posts</span>
          </NavButton>
        </li>
        <li>
          <NavButton href={"following"} icon={<FiUsers />}>
            <span>Following</span>
          </NavButton>
        </li>
        <li>
          <NavButton href={"followers"} icon={<FaUsers />}>
            <span>Followers</span>
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
