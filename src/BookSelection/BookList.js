import React from 'react';
import { Link } from "react-router-dom";

const BookList = ({ books }) => {
  return (
    <div className="container">
      <h2 className="mt-5">Book List</h2>
      {books.length === 0 && <div>... loading</div>}
      <ul className="list-group">
        {books.map((book) => {
            return (<li key={book.cover_id} className="list-group-item"><Link to={"book/"+book.cover_id}>{book.title}</Link></li>)
        })}
      </ul>
    </div>
  );
};

export default BookList;
