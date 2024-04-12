import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import DisplayUsers from "./DisplayUsers";
// import FeedPosts from lazy("./FeedPosts");

const FeedPosts = lazy(() => import("./FeedPosts"));
export default function Feeds() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const url =
    "https://rigi-react-assignment-ii-server-production.up.railway.app/api";
  const header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS",
    },
  };

  const fetchFeeds = () => {
    fetch(url + "/posts", header)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
      });
  };

  const fetchUsers = () => {
    fetch(url + "/users", header)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchFeeds();
    fetchUsers();
  }, []);

  return (
    <div className="main_feed_container">
      <div>
        {posts.map((post, i) => (
          <FeedPosts post={post} />
        ))}
      </div>
      <div className="users-container">
        <h3 className="member-title">Members</h3>
        {users.map((user) => (
          <DisplayUsers user={user} />
        ))}
      </div>
    </div>
  );
}
