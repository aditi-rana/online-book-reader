import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BookDetail = ({ books }) => {
  const { id } = useParams();

  const [book, setBook] = useState("");
  const [selectedBook, setSelectedBook] = useState([]);

  useEffect(() => {
    fetchBookContent();
  }, []);

  const fetchBookContent = async () => {
    try {
      const tmpbook = books.find((element) => element.cover_id == id);

      const response = await axios.get(
        `https://openlibrary.org${tmpbook.key}.json`
      );

      if (response) {
        setBook(response.data);
        setSelectedBook(tmpbook);
      }
    } catch (error) {
      console.error("Error fetching book content:", error);
    }
  };

  return book ? (
    <div className="container">
      <h2 className="mt-5">{book.title}</h2>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4 p-2">
            <img
              src={"/assets/Harry.jpeg"}
              className="card-img"
              alt={book.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                Author: {book?.authors?.map((author) => author.name).join(", ")}
              </h5>
              <p className="card-text">Description: {book.description}</p>
              <Link
                to={`/reader/${selectedBook.cover_id}`}
                className="btn btn-primary"
              >
                Read
              </Link>
              <Link to="/" className="btn btn-secondary ml-2">
                Back to Book List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center">...loading</div>
  );
};

export default BookDetail;
