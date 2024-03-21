import NavButton from "../nav-button";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-cal gap-5">
        <li>
          <NavButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
