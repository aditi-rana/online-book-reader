// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
// import SignUp from './Authentication/SignUp';
// import Login from './Authentication/Login';
import BookList from './BookSelection/BookList';
import BookDetail from './BookSelection/BookDetail';
import BookReader from './BookReader/BookReader';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/subjects/fiction.json?limit=20');
      setBooks(response.data.works);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1 className='text-center mt-4'>Online Book Reader</h1>
        <Routes>
          {/* <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} /> */}
          <Route path="/" element={<BookList books={books}/>}></Route>
          <Route path="/book/:id" element={<BookDetail books={books}/>} />
          <Route path="/reader/:id" element={<BookReader books={books}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
