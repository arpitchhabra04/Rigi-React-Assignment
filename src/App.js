import React, { lazy, Suspense } from "react";
// import Feeds from "./Components/FeedsComponent";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
// import SpecificPost from "./Components/PostComponent";

const Feeds = lazy(() => import("./Components/FeedsComponent"));
const SpecificPost = lazy(() => import("./Components/PostComponent"));

export default function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route exact path="/" element={<Feeds />} />
            <Route path="/:id" element={<SpecificPost />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
