import UpdateUserForm from "./notifikasi";
import { fetchUser } from "../../../lib/service/userService";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);

  if (!user) {
    return <div>User not found</div>;
  }

  return <UpdateUserForm user={user} />;
};

export default SingleUserPage;
