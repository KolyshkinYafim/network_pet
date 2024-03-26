import { useForm } from "react-hook-form";
import Input from "@components/input";
import { Button, Link } from "@nextui-org/react";
import { useLazyCurrentQuery, useLoginMutation } from "@/app/services/userAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "@/app/components/error-message";
import { hasErrorField } from "@/utils/has-error-field";

type Props = {
  setActive: (val: string) => void;
};

type LoginType = {
  email: string;
  password: string;
};

const Login: React.FC<Props> = ({ setActive }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [triggerCurrentUser] = useLazyCurrentQuery();

  const onSubmit = async (data: LoginType) => {
    try {
      await login(data).unwrap();
      await triggerCurrentUser().unwrap();
      navigate("/");
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        Dont have an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setActive("sign-up")}
        >
          Let's register!
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Enter
        </Button>
      </div>
    </form>
  );
};

export default Login;
