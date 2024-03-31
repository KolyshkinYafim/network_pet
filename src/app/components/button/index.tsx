import { Button as NextButton } from "@nextui-org/react";
import type { ButtonProps } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: ButtonProps["type"];
  fullWidth?: boolean;
  color?: ButtonProps["color"];
};

const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      fullWidth={fullWidth}
      type={type}
    >
      {children}
    </NextButton>
  );
};

export default Button;
