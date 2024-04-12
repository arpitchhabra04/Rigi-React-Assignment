import { useState, useEffect } from "react";
import "./index.css";

export default function FeedPosts({ post }) {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    if (post) {
      setUserName(post.author?.name || "");
      setText(post.text || "");
      setAttachments(post.attachments || []);
      setProfilePictureUrl(post.author?.profilePictureUrl || "");
    }
  }, [post]);

  return (
    <div className="feed_post_container">
      <div className="user_image">
        <img src={profilePictureUrl} />
      </div>
      <div className="user_detail">
        <div className="user_title">{userName}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}
