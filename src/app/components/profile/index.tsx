import { BASE_URL } from "@/app/constants/constants";
import { selectCurrentUser } from "@/app/store/slices/userSlice";
import { useTypedSelector } from "@/app/store/store";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const current = useTypedSelector(selectCurrentUser);

  if (!current) return null;

  return (
    <Card className="py-4 w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center ">
        <Image
          alt="no image for card profile"
          className="object-cover-rounded-xl"
          src={(BASE_URL + current?.avatarURL).toString()}
          width={370}
        />
      </CardHeader>
      <CardBody>
        <Link to={`/users/${current.id}`}>
          <h4 className="font-bold text-large mb-2">{current.name}</h4>
          <p className="text-default-500 flex items-center gap-2">
            <MdAlternateEmail />
            {current.email}
          </p>
        </Link>
      </CardBody>
    </Card>
  );
};

export default Profile;

// for (const key in current) {
//     if (Object.prototype.hasOwnProperty.call(current, key)) {
//       const propValue = current[key as keyof typeof current];

//       console.log(`${key} ${propValue}`);
//     }
//   }
