import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Home";
import Book from "../Book";
import BookChapter from "../BookChapter";
import Scripture from "../Scripture";
import ScriptureVerse from "../ScriptureVerse";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/book/:slug" element={<Book />} exact />
        <Route path="/book/:bookslug/:slug" element={<BookChapter />} exact />
        <Route path="/scripture/:slug" element={<Scripture />} exact />
        <Route path="/scripture/:scriptureslug/:slug" element={<ScriptureVerse />} exact />
      </Routes>
    </div>
  );
}

export default App;
