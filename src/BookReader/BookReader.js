// // BookReader.js
// import React from 'react';

// const BookReader = ({ book }) => {
//   return (
//     <div>
//       <h2>{book.title}</h2>
//       {/* Implement book reading interface here */}
//     </div>
//   );
// };

// export default BookReader;
// BookReader.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BookReader = ({ books }) => {
  const { id } = useParams();

  const [bookContent, setBookContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedBook, setSelectedBook] = useState([]);

  useEffect(() => {
    fetchBookContent();
  }, []);

  const fetchBookContent = async () => {
    try {
      const tmpbook = books.find((element) => element.cover_id == id);

      const response = await axios.get(`https://openlibrary.org${tmpbook.key}.json`);
      // const response = await axios.get(`https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=${tmpbook.key}`);
      const book = response.data;
console.log(book)
      if(response) {
        setBookContent(book.content);
        setTotalPages(Math.ceil(book.content.length / 500)); // Calculate total pages
        setSelectedBook(tmpbook);
      }
    } catch (error) {
      console.error('Error fetching book content:', error);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  const getCurrentPageContent = () => {
    const startIndex = (currentPage - 1) * 500;
    const endIndex = startIndex + 500;
    return bookContent.substring(startIndex, endIndex);
  };

  return (
    <div>
      <h2>Book Reader</h2>
      <p>Page {currentPage} of {totalPages}</p>
      <div>{getCurrentPageContent()}</div>
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <Link to={`/book/${id}`}>
        <button>Back to Book Detail</button>
      </Link>
    </div>
  );
};

export default BookReader;
