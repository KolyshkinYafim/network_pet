import { Button as NextButton } from "@nextui-org/react";
import type { ButtonType, ButtonColor } from "../../enums";

type Props = {
  children: React.ReactNode;
  icon: JSX.Element;
  className: string;
  type?: ButtonType;
  fullWidth?: boolean;
  color?: ButtonColor;
};

const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return <NextButton startContent={icon} size="lg" color={color}></NextButton>;
};

export default Button;
