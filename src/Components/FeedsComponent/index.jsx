import { React, useState, useEffect, lazy, Suspense, useRef } from "react";
import "./index.css";
import DisplayUsers from "./DisplayUsers";
import FeedPosts from "./FeedPosts";
import { useVirtualizer } from "@tanstack/react-virtual";
// const FeedPosts = lazy(() => import("./FeedPosts"));
export default function Feeds({ searchValue }) {
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [morePage, setMorePage] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const parentRef = useRef(null);
  const url =
    "https://rigi-react-assignment-ii-server-production.up.railway.app/api";
  const header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS",
    },
  };
  console.log("from posts", { searchedPosts, posts });
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

  const fetchUsers = () => {
    fetch(url + "/users", header)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const fetchSearch = (key) => {
    fetch(`${url}/posts?query=${key}`, header)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        data.length > 0 ? setSearchedPosts(data) : setSearchedPosts([]);
      });
  };

  const handleSearch = (e) => {
    clearTimeout(debounceTimer);

    setDebounceTimer(
      setTimeout(() => {
        fetchSearch(searchValue);
      }, 2000),
    );
  };

  // const rowVirtualizer = useVirtualizer({
  //   count: 10,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => 200,
  // });

  // console.log("virtual", rowVirtualizer.getVirtualItems());

  const handleScrollPosition = () => {
    try {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (scrollPosition !== null) {
        const parsedScrollPosition = parseInt(scrollPosition, 10);
        window.scrollTo(0, parsedScrollPosition);
        localStorage.removeItem("scrollPosition");
        // console.log("Scroll position restored:", parsedScrollPosition);
      }
    } catch (error) {
      console.error("Error restoring scroll position:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

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
        {/* {rowVirtualizer.getVirtualItems().map(({ index, start, size }) => (
          <div
            key={index}
            style={
              {
                // position: "relative",
                // top: start,
                // height: size,
                // width: "100%",
              }
            }
          >
            <FeedPosts post={posts[index]} />
          </div>
        ))} */}
        {(searchedPosts.length > 0 ? searchedPosts : posts).map((post, i) => (
          <FeedPosts post={post} key={i} />
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
