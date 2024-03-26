import { useCurrentQuery } from "@/app/services/userAPI";
import { Spinner } from "@nextui-org/react";

const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoading } = useCurrentQuery();
  console.log(isLoading);
  console.log(useCurrentQuery());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return children;
};

export default AuthGuard;
