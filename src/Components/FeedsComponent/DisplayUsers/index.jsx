import { useState, useEffect } from "react";
import "./index.css";

export default function DisplayUsers({ user }) {
  const [userName, setUserName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setProfilePictureUrl(user.profilePictureUrl || "");
    }
  }, [user]);

  return (
    <div className="single_user_container">
      <div className="single_user_image">
        <img src={profilePictureUrl} />
      </div>
      <div className="user_detail">
        <div>{userName}</div>
      </div>
    </div>
  );
}
