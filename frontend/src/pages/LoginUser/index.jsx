import trackingGif from "../../assets/tracking.gif";
import UserSearch from "../../components/UserSearch";

const UserLogin = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-bold">
        Tracking Your <br />
        Childern Location
      </h1>
      <p className="pb-6">Insert Your Childern Tracking Code!</p>
      <img className="max-w-xs" src={trackingGif} alt="my-gif" />
      <div className="flex flex-col items-center justify-center gap-6 pt-6">
        <UserSearch />
      </div>
    </div>
  );
};

export default UserLogin;
