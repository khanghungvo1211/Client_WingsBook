import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listSaleBook } from 'src/actions/bookActions';
import "src/assets/styles/sales.css";

const SaleBooks = () => {
    const dispatch = useDispatch();

    // Fetching data from Redux store
    const bookSale = useSelector(state => state.bookSale);
    const { loading, error, books } = bookSale;

    // Fetch sale books on component mount
    useEffect(() => {
        dispatch(listSaleBook());
    }, [dispatch]);

    return (
        <div className='sales-books-container'>
            {/* Display Loader if data is loading */}
            {loading ? (
                <Loader />
            ) : error ? (
                // Display error message if there's an error
                <Message variant='danger'>{error}</Message>
            ) : Array.isArray(books) && books.length > 0 ? (
                // Display sale books if books array is not empty
                <ul className='align'>
                    {books.map((book) => (
                        <li className='mt-0' key={book._id}>
                            <figure className='sales_book'>
                                {/* Front cover image */}
                                <ul className='hardcover_front'>
                                    <li>
                                        <img src={book.image} alt='Images' width='100%' height='100%' />
                                    </li>
                                    {/* Add more logic for book display if needed */}
                                </ul>
                                {/* Book details and link */}
                                <figcaption>
                                    <Link to={`/book/${book._id}`}>
                                        <h4 className='title'><strong>{book.name}</strong></h4>
                                    </Link>
                                    {/* Additional book details */}
                                    <span>By {book.author}</span>
                                    {book.sales > 0 ? (
                                        // Display sale price if available
                                        <>
                                            <strike>${book.price}</strike>
                                            <h4 className='mt-1'><strong>${book.sales}</strong></h4>
                                        </>
                                    ) : (
                                        // Display regular price if no sale
                                        <h4><strong>${book.price}</strong></h4>
                                    )}
                                    {/* Add more book details if needed */}
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            ) : (
                // Display message if there are no sale books available
                <Message variant='info'>No sale books available.</Message>
            )}
        </div>
    );
}

export default SaleBooks;
