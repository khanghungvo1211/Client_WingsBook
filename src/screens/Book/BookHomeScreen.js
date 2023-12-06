import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Dropdown } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { Book } from 'src/components/book';
import { listBooks } from 'src/actions/bookActions';
import { TopRatedBooks } from 'src/components/home';
import Filter from 'src/components/core/Filter';
import { useQuery } from 'src/hooks/useQuery';

const BookHomeScreen = ({ match }) => {
    const query = useQuery();
    const pageNumber = match.params.pageNumber || 1;
    const sort = query.get('sort');

    const dispatch = useDispatch();
    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, page, pages, count } = bookList;

    useEffect(() => {
        dispatch(listBooks(pageNumber, sort));
    }, [dispatch, pageNumber, sort]);

    return (
        <>
            <Meta />
            <h1 className="mt-2 text-center">Latest Book</h1>
            <div>
                {/* Dropdown for sorting options */}
                <Dropdown className="text-left">
                    {/* ... (dropdown code) */}
                </Dropdown>
                <h6 className="align-right text-right">Showing {1 + Number(pageNumber - 1) * 12} - {pageNumber * 12} of {count} result</h6>
            </div>
            {/* Check if books is defined and an array before mapping */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : books && Array.isArray(books) ? (
                <>
                    {/* Display books */}
                    <Row>
                        {books.map((book) => (
                            <Col key={book._id} sm={12} md={6} lg={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </Row>
                    {/* Pagination */}
                    <Paginate
                        category="books"
                        pages={pages}
                        page={page}
                        query={`sort=${sort}`}
                    />
                </>
            ) : (
                <Message variant='info'>No books available.</Message>
            )}
        </>
    );
}

export default BookHomeScreen;
