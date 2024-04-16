import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BOOK_CONTENT } from "../constants/book-content";

const BookReader = ({ books }) => {
  const { id } = useParams();

  const [bookContent, setBookContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedBook, setSelectedBook] = useState([]);

  useEffect(() => {
    fetchBookContent();
  }, []);

  const fetchBookContent = async () => {
    try {
      const tmpbook = books.find((element) => element.cover_id == id);

      const bookContent = BOOK_CONTENT;

      if (bookContent) {
        setBookContent(bookContent);
        setTotalPages(Math.ceil(bookContent.length / 1000)); // Calculate total pages
        setSelectedBook(tmpbook);
      }
    } catch (error) {
      console.error("Error fetching book content:", error);
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
    <div className="container">
      <h2 className="mt-5">Book Reader</h2>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <div className="card">
        <div className="card-body">
          <div>{getCurrentPageContent()}</div>
        </div>
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary mr-2"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Link to={`/book/${id}`} className="btn btn-secondary mt-3">
        Back to Book Detail
      </Link>
    </div>
  );
};

export default BookReader;
