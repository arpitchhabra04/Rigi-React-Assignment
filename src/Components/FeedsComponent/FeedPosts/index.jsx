import { useState, useEffect } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Attachments from "./DisplayAttachments";
import SpecificPost from "../../PostComponent";

export default function FeedPosts({ post }) {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [imgs, setImgs] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (post) {
      setUserName(post.author?.name || "");
      setText(post.text || "");
      setAttachments(post.attachments || []);
      setProfilePictureUrl(post.author?.profilePictureUrl || "");
    }
  }, [post]);

  useEffect(() => {
    filterAttachments();
  }, [attachments]);

  const filterAttachments = () => {
    let filteredImgs = attachments.filter((attach) => attach.type === "image");
    let filteredVideos = attachments.filter(
      (attach) => attach.type === "video",
    );
    setImgs(filteredImgs);
    setVideos(filteredVideos);
  };

  let navigate = useNavigate();

  const handlePostClick = (id) => {
    localStorage.setItem("scrollPosition", window.pageYOffset);
    navigate(`/${id}`);
  };

  return (
    <div className="feed_post_container">
      <div className="user_image" onClick={() => handlePostClick(post.id)}>
        <img src={profilePictureUrl} />
      </div>
      <div className="user_detail">
        <div className="user_title" onClick={() => handlePostClick(post.id)}>
          {userName}
        </div>
        <div>{text}</div>
        {attachments.length > 0 && <Attachments imgs={imgs} videos={videos} />}
      </div>
    </div>
  );
}
