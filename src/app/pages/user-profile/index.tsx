import BackButton from "@/app/components/back-button";
import CountInfo from "@/app/components/count-info";
import ProfileInfo from "@/app/components/profile-info";
import { BASE_URL } from "@/app/constants/constants";
import { useAppDispatch } from "@/app/hooks/hooks";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/app/services/followsAPI";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@/app/services/userAPI";
import { resetUser, selectCurrentUser } from "@/app/store/slices/userSlice";
import { useTypedSelector } from "@/app/store/store";
import { formatToClientDate } from "@/utils/format-to-client-date";
import { Card, useDisclosure, Image, Button } from "@nextui-org/react";
import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useTypedSelector(selectCurrentUser);
  const { data } = useGetUserByIdQuery(id ?? "");
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [triggerGetUserById] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetUser());
  }, []);
  if (!data) return null;

  const handleFolow = async () => {
    try {
      if (id) {
        data.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap();
        await triggerGetUserById(id);
        await triggerCurrentQuery();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BackButton />
      <div className="flex items-center gap-4">
        <Card
          className="
          flex 
          flex-col 
          items-center
          text-center
          space-y-4
          p-5 
          flex-2"
        >
          <Image
            width={200}
            height={200}
            className="border-4 border-white"
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data?.name}
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
          </div>

          {currentUser?.id !== id ? (
            <Button
              color={data.isFollowing ? "default" : "primary"}
              className="gap-2"
              variant="flat"
              onClick={handleFolow}
              endContent={
                data.isFollowing ? (
                  <MdOutlinePersonAddDisabled />
                ) : (
                  <MdOutlinePersonAddAlt1 />
                )
              }
            >
              {data.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          ) : (
            <Button endContent={<CiEdit />}>Edit profile</Button>
          )}
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="About" info={data.bio} />
          <ProfileInfo title="Email" info={data.email} />
          <ProfileInfo title="Location" info={data.location} />
          <ProfileInfo
            title="Birthday "
            info={formatToClientDate(data.dateOfBirth)}
          />
          <div className="flex gap-2">
            <CountInfo count={data.followers?.length} title={"Followers"} />
            <CountInfo count={data.followings?.length} title={"Followings"} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserProfilePage;
