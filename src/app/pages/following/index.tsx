import User from "@/app/components/user";
import { selectCurrentUser } from "@/app/store/slices/userSlice";
import { useTypedSelector } from "@/app/store/store";
import { Card, CardBody } from "@nextui-org/react";
import { Link } from "react-router-dom";

const FollowingPage = () => {
  const currentUser = useTypedSelector(selectCurrentUser);

  if (!currentUser) return null;

  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map(user => (
        <Link to={`/users/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>Followers list is empty</h2>
  );
};

export default FollowingPage;
