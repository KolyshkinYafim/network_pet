import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Input from "@components/input";
import { useRegisterMutation } from "@/app/services/userAPI";
import { hasErrorField } from "@/utils/has-error-field";
import ErrorMessage from "@/app/components/error-message";

type Props = {
  setActive: (val: string) => void;
};

type RegisterType = {
  email: string;
  password: string;
  name: string;
};

const Registration: React.FC<Props> = ({ setActive }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: RegisterType) => {
    try {
      await register(data).unwrap();
      setActive("sign-in");
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };

  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name={"name"}
        label={"Name"}
        type={"text"}
        requiered="This field is mandatory"
      />
      <Input
        control={control}
        name={"email"}
        label={"Email"}
        type={"email"}
        requiered="This field is mandatory"
      />
      <Input
        control={control}
        name={"password"}
        label={"Password"}
        type={"password"}
        requiered="This field is mandatory"
      />
      <ErrorMessage error={error} />
      <p className="text-center">
        Already have an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setActive("sign-in")}
        >
          Sign in!
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Create account
        </Button>
      </div>
    </form>
  );
};

export default Registration;
