import { useState } from "react";
import "./index.css";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="header">
      <div>
        <input
          className="search-input"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
    </div>
  );
}
