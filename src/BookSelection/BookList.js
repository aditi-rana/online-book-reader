import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books }) => {
  return (
    <div className="container">
      <h2 className="mt-5">Book List</h2>
      {books.length === 0 && <div>... loading</div>}
      <div className="row">
        {books.map((book) => (
          <div key={book.cover_id} className="col-md-3 mb-4">
            <div className="card h-100 d-flex flex-column">
              <img
                src={"assets/Harry.jpeg"}
                className="card-img"
                alt={book.title}
                height={"200px"}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  Author:{" "}
                  {book?.authors?.map((author) => author.name).join(", ")}
                </p>
                <div className="mt-auto">
                  <Link
                    to={"book/" + book.cover_id}
                    className="btn btn-primary align-self-end"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
