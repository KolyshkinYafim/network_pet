import Login from "@/app/features/login";
import Register from "@/app/features/registration";
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";

export const AuthPage = () => {
  const [active, setActive] = useState("login");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w=[340px] h-[450]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={active}
              onSelectionChange={key => setActive(key as string)}
            >
              <Tab key={"sign-in"} title="Login">
                <Login setActive={setActive} />
              </Tab>
              <Tab key={"sign-up"} title="Registration">
                <Register setActive={setActive} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
