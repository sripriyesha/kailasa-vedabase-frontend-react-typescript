import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../Home";
import Book from "../Book";
import BookChapter from "../BookChapter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/book/:slug" element={<Book />} exact />
        <Route path="/book/:bookslug/:slug" element={<BookChapter />} exact />
      </Routes>
    </div>
  );
}

export default App;
