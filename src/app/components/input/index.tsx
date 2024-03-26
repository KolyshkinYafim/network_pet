import { useController, type Control } from "react-hook-form";
import { Input as NextInput } from "@nextui-org/react";
type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  requiered?: string;
  endContent?: JSX.Element;
};

const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  requiered = "",
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required: true,
    },
  });

  return (
    <NextInput
      id={name}
      label={label}
      placeholder={placeholder}
      type={type}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
    />
  );
};

export default Input;
