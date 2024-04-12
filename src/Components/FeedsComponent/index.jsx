import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
// import FeedPosts from lazy("./FeedPosts");

const FeedPosts = lazy(() => import("./FeedPosts"));
export default function Feeds() {
  const [posts, setPosts] = useState([]);

  const fetchFeeds = () => {
    fetch(
      "https://rigi-react-assignment-ii-server-production.up.railway.app/api/posts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="main_feed_container">
      {posts.map((post, i) => (
        <FeedPosts post={post} />
      ))}
    </div>
  );
}
