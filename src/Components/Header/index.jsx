import { useState } from "react";
import "./index.css";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const url =
    "https://rigi-react-assignment-ii-server-production.up.railway.app/api";
  const header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS",
    },
  };

  const fetchSearch = (key) => {
    console.log("kef", key);
    fetch(`${url}/posts?query=${key}`, header)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);

    clearTimeout(debounceTimer);

    setDebounceTimer(
      setTimeout(() => {
        fetchSearch(e.target.value);
      }, 2000),
    );
  };

  return (
    <div className="header">
      <div>
        <input
          className="search-input"
          onChange={(e) => handleSearch(e)}
          value={searchInput}
        />
      </div>
    </div>
  );
}
