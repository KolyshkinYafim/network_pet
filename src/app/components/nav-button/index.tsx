import { Button } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
  icon: JSX.Element;
  href: string;
};

const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  return <Button className="flex justify-start text-xl"></Button>;
};

export default NavButton;
