import { useContext, useState } from "react";
import { ThemeContext } from "../../Theme";
import "./index.css";

export default function Header({ setSearchValue, searchValue }) {
  const [searchInput, setSearchInput] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);

  const url =
    "https://rigi-react-assignment-ii-server-production.up.railway.app/api";
  const header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "XM0ooo4EG8puK9EPQ16M3KGxSA3ZsCKS",
    },
  };

  return (
    <div className="header">
      <div>
        <button className="theme-button" onClick={() => toggleTheme()}>
          {theme}
        </button>
        <input
          className="search-input"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
    </div>
  );
}
