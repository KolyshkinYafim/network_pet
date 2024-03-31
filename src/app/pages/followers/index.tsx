import User from "@/app/components/user";
import { selectCurrentUser } from "@/app/store/slices/userSlice";
import { useTypedSelector } from "@/app/store/store";
import { Card, CardBody } from "@nextui-org/react";
import { Link } from "react-router-dom";

const FollowersPage = () => {
  const currentUser = useTypedSelector(selectCurrentUser);

  if (!currentUser) return null;

  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map(user => (
        <Link to={`/users/${user.follower.id}`} key={user.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email ?? ""}
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

export default FollowersPage;
