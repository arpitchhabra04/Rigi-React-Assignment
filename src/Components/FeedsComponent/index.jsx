import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import DisplayUsers from "./DisplayUsers";
import FeedPosts from "./FeedPosts";

// const FeedPosts = lazy(() => import("./FeedPosts"));
export default function Feeds() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [morePage, setMorePage] = useState(true);

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
    fetch(`${url}/posts?page=${page}`, header)
      .then((response) => response.json())
      .then((data) => {
        setMorePage(data.pagination.hasMore);
        handleScrollPosition();
        const fetchedPosts = data.data || [];
        setPosts([...posts, ...fetchedPosts]);
        setPage(page + 1);
      });
  };
  console.log("more page", morePage);
  const fetchUsers = () => {
    fetch(url + "/users", header)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const handleScrollPosition = () => {
    try {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (scrollPosition !== null) {
        const parsedScrollPosition = parseInt(scrollPosition, 10);
        window.scrollTo(0, parsedScrollPosition);
        localStorage.removeItem("scrollPosition");
        console.log("Scroll position restored:", parsedScrollPosition);
      }
    } catch (error) {
      console.error("Error restoring scroll position:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        if (morePage) fetchFeeds();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [posts]);

  useEffect(() => {
    fetchFeeds();
    fetchUsers();
  }, []);

  return (
    <div className="main_feed_container">
      <div className="posts_container">
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
