import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = ({books}) => {
  const { id } = useParams();

  const [book, setBook] = useState('');
  const [selectedBook, setSelectedBook] = useState([]);

  useEffect(() => {
    fetchBookContent();
  }, []);

  const fetchBookContent = async () => {
    try {
      const tmpbook = books.find((element) => element.cover_id == id);

      const response = await axios.get(`https://openlibrary.org${tmpbook.key}.json`);
      
      if(response) {
        setBook(response.data);
        setSelectedBook(tmpbook);
      }
    } catch (error) {
      console.error('Error fetching book content:', error);
    }
  };
  
  return ( book ?
    <div className="container">
      <h2 className="mt-5">{book.title}</h2>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md">
            <div className="card-body">
              <h5 className="card-title">Author: {selectedBook.authors ? selectedBook.authors.length > 1 ? selectedBook.authors.map((author) => author.name + ', ') : selectedBook.authors[0].name : '-'}</h5>
              <p className="card-text">Description: {book.description}</p>
              <Link to={`/reader/${book.cover_id}`} className="btn btn-primary">Read</Link>
              <Link to="/" className="btn btn-secondary ml-2">Back to Book List</Link>
            </div>
          </div>
        </div>
      </div>
    </div> : <div className='text-center'>...loading</div>
  );
};

export default BookDetail;
