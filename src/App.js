// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import BookList from './Component/BookList';
import AddBook from './Component/AddBook';

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<BookList/>} />
          <Route path="/add" element={<AddBook/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
