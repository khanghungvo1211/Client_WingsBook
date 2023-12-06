import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Image, Button, Container, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { listTopBooks } from 'src/actions/bookActions';
import { Rating } from 'src/components/book';

const TopRatedBooks = () => {
    const dispatch = useDispatch();

    const bookTopRated = useSelector(state => state.bookTopRated);
    const { loading, error, books } = bookTopRated;

    useEffect(() => {
        dispatch(listTopBooks());
    }, [dispatch]);

    return (
        <div className='bg-img-2 p-5'>
            <Container>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : Array.isArray(books) && books.length > 0 ? (
                    <Carousel>
                        {books.map((book) => (
                            <Carousel.Item key={book._id}>
                                <Row>
                                    <Col sm={12} md={6} lg={3}>
                                        <Link key={book._id} to={`/book/${book._id}`}>
                                            <Image src={book.image} alt={book.name} fluid />
                                        </Link>
                                    </Col>
                                    {/* Rest of your code for displaying book details */}
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <Message variant='info'>No books available.</Message>
                )}
            </Container>
        </div>
    );
}

export default TopRatedBooks;
