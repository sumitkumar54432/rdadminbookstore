
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function BookDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios({
            url: apiUrl + '/book/' + id,
            method: 'get'
        })
            .then((res) => {

                console.log("Book Details:", res.data.data);

                setBook(res.data.data);
                setLoading(false);

            })
            .catch((err) => {

                console.log(err);
                alert(
                    err.response?.data?.message ||
                    'Unable to load book details'
                );

                setLoading(false);

            });

    }, [id]);


    if (loading) {

        return (
            <Container className="py-5 text-center">

                <Spinner
                    animation="border"
                    variant="success"
                />

                <p className="mt-3 text-muted">
                    Loading book details...
                </p>

            </Container>
        );

    }


    if (!book) {

        return (
            <Container className="py-5 text-center">

                <h4 className="text-danger">
                    Book not found
                </h4>

                <Button
                    variant="success"
                    className="mt-3"
                    onClick={() => navigate('/books')}
                >
                    ← Back to Books
                </Button>

            </Container>
        );

    }


    // Support both current and old backend field names
    const bookTitle =
        book.bookTitle ||
        book.bookTittle ||
        'Untitled Book';

    const authorName =
        book.authorName ||
        'Unknown Author';

    const price =
        book.price ||
        book.finalPrice ||
        book.originalPrice ||
        0;

    const image =
        book.bookImage ||
        book.image ||
        book.file ||
        '';


    return (

        <Container className="py-4">

            {/* Back Button */}

            <Button
                variant="outline-success"
                className="mb-4 rounded-pill px-4"
                onClick={() => navigate('/books')}
            >
                ← Back to Books
            </Button>


            {/* Main Book Card */}

            <Card className="border-0 shadow rounded-4 overflow-hidden">

                <Card.Body className="p-4">

                    <Row className="g-4">


                        {/* Book Image */}

                        <Col
                            md={4}
                            className="text-center"
                        >

                            <div
                                className="p-3 bg-light rounded-4"
                                style={{
                                    minHeight: '450px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >

                                {image ? (

                                    <img
                                        src={image}
                                        alt={bookTitle}
                                        className="img-fluid rounded-3 shadow-sm"
                                        style={{
                                            width: '100%',
                                            maxWidth: '300px',
                                            height: '420px',
                                            objectFit: 'contain'
                                        }}
                                    />

                                ) : (

                                    <div className="text-muted">
                                        No Image Available
                                    </div>

                                )}

                            </div>

                        </Col>


                        {/* Book Information */}

                        <Col md={8}>

                            <Badge
                                bg="success"
                                className="mb-3 px-3 py-2"
                            >
                                Book
                            </Badge>


                            <h1 className="fw-bold mb-2">
                                {bookTitle}
                            </h1>


                            <p className="text-muted fs-5 mb-3">

                                By{' '}

                                <span className="fw-semibold text-dark">
                                    {authorName}
                                </span>

                            </p>


                            {/* Rating */}

                            <div className="mb-4">

                                <Badge
                                    bg="warning"
                                    text="dark"
                                    className="px-3 py-2"
                                >
                                    ★ {book.rating || '0'}
                                </Badge>

                                <span className="ms-2 text-muted">
                                    {book.reviews || '0'} Reviews
                                </span>

                            </div>


                            <hr />


                            {/* Price */}

                            <div className="my-4">

                                <span className="fs-1 fw-bold text-success">
                                    ₹{price}
                                </span>

                                {book.originalPrice &&
                                    Number(book.originalPrice) > Number(price) && (

                                        <span className="ms-3 text-muted text-decoration-line-through fs-5">

                                            ₹{book.originalPrice}

                                        </span>

                                    )}

                            </div>


                            {/* Short Description */}

                            {book.shortDescription && (

                                <div className="mb-4">

                                    <h5 className="fw-bold">
                                        Product Highlights
                                    </h5>

                                    <p className="text-muted">
                                        {book.shortDescription}
                                    </p>

                                </div>

                            )}


                            {/* Book Details */}

                            <h5 className="fw-bold mb-3">
                                Book Details
                            </h5>


                            <BookDetail
                                label="Book Title"
                                value={bookTitle}
                            />


                            <BookDetail
                                label="Author"
                                value={authorName}
                            />


                            <BookDetail
                                label="Publisher / Publication"
                                value={book.publisher}
                            />


                            <BookDetail
                                label="ISBN No"
                                value={book.isbnNo}
                            />


                            <BookDetail
                                label="Number of Pages"
                                value={book.nop}
                            />


                            <BookDetail
                                label="Price"
                                value={
                                    price
                                        ? `₹${price}`
                                        : '-'
                                }
                            />


                            <BookDetail
                                label="Publication Year"
                                value={book.publicationYear}
                            />


                            <BookDetail
                                label="Edition"
                                value={book.edition}
                            />

                        </Col>

                    </Row>

                </Card.Body>

            </Card>


            {/* Description */}

            {(book.description || book.shortDescription) && (

                <Card className="border-0 shadow-sm rounded-4 mt-4">

                    <Card.Body className="p-4">

                        <h4 className="fw-bold mb-3">
                            About This Book
                        </h4>


                        {book.shortDescription && (

                            <div className="mb-4">

                                <h6 className="fw-bold">
                                    Short Description
                                </h6>

                                <p className="text-muted">
                                    {book.shortDescription}
                                </p>

                            </div>

                        )}


                        {book.description && (

                            <div>

                                <h6 className="fw-bold">
                                    Long Description
                                </h6>

                                <p
                                    className="text-muted"
                                    style={{
                                        lineHeight: '1.8'
                                    }}
                                >
                                    {book.description}
                                </p>

                            </div>

                        )}

                    </Card.Body>

                </Card>

            )}


            {/* Additional Information */}

            <Card className="border-0 shadow-sm rounded-4 mt-4">

                <Card.Body className="p-4">

                    <h4 className="fw-bold mb-3">
                        Product Information
                    </h4>


                    <BookDetail
                        label="ISBN No"
                        value={book.isbnNo}
                    />


                    <BookDetail
                        label="Publisher"
                        value={book.publisher}
                    />


                    <BookDetail
                        label="Number of Pages"
                        value={book.nop}
                    />


                    <BookDetail
                        label="Publication Year"
                        value={book.publicationYear}
                    />


                    <BookDetail
                        label="Edition"
                        value={book.edition}
                    />


                    <BookDetail
                        label="Category"
                        value={book.bookCategory}
                    />


                    <BookDetail
                        label="Language"
                        value={book.language}
                    />


                    <BookDetail
                        label="Country of Origin"
                        value={book.countryOfOrigin}
                    />

                </Card.Body>

            </Card>

        </Container>

    );

}


/* Reusable Book Detail Component */

function BookDetail({ label, value }) {

    return (

        <Row className="border-bottom py-2">

            <Col
                xs={5}
                className="text-muted"
            >
                {label}
            </Col>


            <Col
                xs={7}
                className="fw-semibold"
            >
                {value || '-'}
            </Col>

        </Row>

    );

}


export default BookDetails;

