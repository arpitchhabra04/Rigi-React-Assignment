import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import FeedPosts from "../FeedsComponent/FeedPosts";
import "./index.css";
export default function SpecificPost() {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();
  const url =
    "https://rigi-react-assignment-ii-server-production.up.railway.app/api";
  const header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS",
    },
  };

  const fetchPost = () => {
    fetch(`${url}/posts/${id}`, header)
      .then((response) => response.json())
      .then((data) => {
        console.log("fron use", data);
        setPost(data);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="single-post-contianer">
      <div>
        <div className="back-arrow" onClick={() => navigate(-1)}>
          &#x2190;
        </div>
        <FeedPosts post={post} />
      </div>
    </div>
  );
}
