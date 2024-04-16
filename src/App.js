import React, { lazy, Suspense, useContext, useState } from "react";
import "./styles.css";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./Theme";
import Loading from "./Components/LoadingComponent";
const Feeds = lazy(() => import("./Components/FeedsComponent"));
const SpecificPost = lazy(() => import("./Components/PostComponent"));

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const { theme } = useContext(ThemeContext);
  console.log("themee", theme);
  return (
    <div className={`App ${theme}`}>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Feeds searchValue={searchValue} />}
            />
            <Route path="/:id" element={<SpecificPost />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
