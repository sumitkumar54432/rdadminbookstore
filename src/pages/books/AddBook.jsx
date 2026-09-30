
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card
} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL;


function AddBook() {

    const navigate = useNavigate();


    // ==========================================
    // BOOK DATA
    // ==========================================

    const [bookData, setBookData] = useState({

        bookTitle: '',

        authorName: '',

        price: '',

        isbnNo: '',

        nop: '',

        publisher: '',

        shortDescription: '',

        description: '',

        publicationYear: '',

        edition: '',

        file: null

    });


    // ==========================================
    // IMAGE PREVIEW
    // ==========================================

    const [preview, setPreview] = useState(null);


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value,
            files,
            type
        } = e.target;


        // ======================================
        // IMAGE INPUT
        // ======================================

        if (type === 'file') {

            const file = files[0];


            setBookData({

                ...bookData,

                file: file

            });


            // Create image preview

            if (file) {

                setPreview(
                    URL.createObjectURL(file)
                );

            }

        }


        // ======================================
        // NORMAL INPUT
        // ======================================

        else {

            setBookData({

                ...bookData,

                [name]: value

            });

        }

    };


    // ==========================================
    // ADD BOOK
    // ==========================================

    const addBook = async (e) => {

        e.preventDefault();


        // ======================================
        // CHECK IMAGE
        // ======================================

        if (!bookData.file) {

            alert(
                'Please select a book image'
            );

            return;

        }


        // ======================================
        // CREATE FORMDATA
        // ======================================

        const formData = new FormData();


        // ======================================
        // BOOK TITLE
        // ======================================

        formData.append(
            'bookTitle',
            bookData.bookTitle
        );


        // ======================================
        // AUTHOR NAME
        // ======================================

        formData.append(
            'authorName',
            bookData.authorName
        );


        // ======================================
        // PRICE
        // ======================================

        formData.append(
            'price',
            bookData.price
        );


        // ======================================
        // ISBN
        // ======================================

        formData.append(
            'isbnNo',
            bookData.isbnNo
        );


        // ======================================
        // NUMBER OF PAGES
        // ======================================

        formData.append(
            'nop',
            bookData.nop
        );


        // ======================================
        // PUBLISHER / PUBLICATION
        // ======================================

        formData.append(
            'publisher',
            bookData.publisher
        );


        // ======================================
        // SHORT DESCRIPTION
        // ======================================

        formData.append(
            'shortDescription',
            bookData.shortDescription
        );


        // ======================================
        // LONG DESCRIPTION
        // ======================================

        formData.append(
            'description',
            bookData.description
        );


        // ======================================
        // PUBLICATION YEAR
        // ======================================

        formData.append(
            'publicationYear',
            bookData.publicationYear
        );


        // ======================================
        // EDITION
        // ======================================

        formData.append(
            'edition',
            bookData.edition
        );


        // ======================================
        // IMAGE
        // ======================================

        formData.append(
            'file',
            bookData.file
        );


        // ======================================
        // OLD BACKEND COMPATIBILITY
        // ======================================

        formData.append(
            'bookTittle',
            bookData.bookTitle
        );


        formData.append(
            'originalPrice',
            bookData.price
        );


        formData.append(
            'finalPrice',
            bookData.price
        );


        // ======================================
        // SEND DATA TO BACKEND
        // ======================================

        try {

            const res = await axios({

                url: apiUrl + '/add/book',

                method: 'post',

                data: formData

            });


            // ==================================
            // SUCCESS MESSAGE
            // ==================================

            alert(
                res.data.message ||
                'Book added successfully'
            );


            // ==================================
            // GO TO BOOK LIST
            // ==================================

            navigate('/books');


        }


        // ======================================
        // ERROR
        // ======================================

        catch (err) {

            console.log(
                'ADD BOOK ERROR:',
                err
            );


            alert(

                err.response?.data?.message ||

                'Something went wrong'

            );

        }

    };


    // ==========================================
    // PAGE UI
    // ==========================================

    return (

        <Container className="py-4">

            <Row className="justify-content-center">

                <Col
                    md={10}
                    lg={8}
                >

                    <Card
                        className="
                            shadow
                            border-0
                            rounded-4
                        "
                    >

                        <Card.Body className="p-4">


                            {/* =================================
                                PAGE TITLE
                            ================================= */}

                            <h3
                                className="
                                    text-center
                                    fw-bold
                                    text-success
                                    mb-4
                                "
                            >

                                Add New Book

                            </h3>


                            {/* =================================
                                FORM
                            ================================= */}

                            <Form
                                onSubmit={addBook}
                            >

                                <Row>


                                    {/* =================================
                                        BOOK IMAGE
                                    ================================= */}

                                    <Col
                                        md={12}
                                        className="
                                            text-center
                                            mb-4
                                        "
                                    >


                                        {/* IMAGE PREVIEW */}

                                        {preview && (

                                            <img
                                                src={preview}
                                                alt="Book Preview"
                                                className="
                                                    mb-3
                                                    shadow-sm
                                                    rounded-3
                                                "
                                                style={{
                                                    width: '140px',
                                                    height: '180px',
                                                    objectFit: 'cover'
                                                }}
                                            />

                                        )}


                                        <Form.Group
                                            className="
                                                text-start
                                            "
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Book Image *

                                            </Form.Label>


                                            <Form.Control

                                                type="file"

                                                name="file"

                                                accept="image/*"

                                                onChange={
                                                    handleChange
                                                }

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        BOOK TITLE
                                    ================================= */}

                                    <Col md={12}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Book Title *

                                            </Form.Label>


                                            <Form.Control

                                                type="text"

                                                name="bookTitle"

                                                value={
                                                    bookData.bookTitle
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    Enter book title
                                                "

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        AUTHOR NAME
                                    ================================= */}

                                    <Col md={6}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Author Name *

                                            </Form.Label>


                                            <Form.Control

                                                type="text"

                                                name="authorName"

                                                value={
                                                    bookData.authorName
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    Author name
                                                "

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        PRICE
                                    ================================= */}

                                    <Col md={6}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Price (₹) *

                                            </Form.Label>


                                            <Form.Control

                                                type="number"

                                                name="price"

                                                value={
                                                    bookData.price
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    e.g. 499
                                                "

                                                min="0"

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        ISBN
                                    ================================= */}

                                    <Col md={6}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                ISBN No *

                                            </Form.Label>


                                            <Form.Control

                                                type="text"

                                                name="isbnNo"

                                                value={
                                                    bookData.isbnNo
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    ISBN number
                                                "

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        NUMBER OF PAGES
                                    ================================= */}

                                    <Col md={6}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                NOP (No. of Pages) *

                                            </Form.Label>


                                            <Form.Control

                                                type="number"

                                                name="nop"

                                                value={
                                                    bookData.nop
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    e.g. 250
                                                "

                                                min="1"

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        PUBLISHER
                                    ================================= */}

                                    <Col md={12}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Publication *

                                            </Form.Label>


                                            <Form.Control

                                                type="text"

                                                name="publisher"

                                                value={
                                                    bookData.publisher
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    Publication name
                                                "

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        SHORT DESCRIPTION
                                    ================================= */}

                                    <Col md={6}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Short Description *

                                            </Form.Label>


                                            <Form.Control
                                             type="text"
                                                as="textarea"

                                                rows={4}

                                               
                                                name="shortDescription"

                                                value={
                                                    bookData.shortDescription
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    Write a short
                                                    description
                                                "

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        LONG DESCRIPTION
                                    ================================= */}

                                    <Col md={6}>
    <Form.Group className="mb-3">

        <Form.Label className="fw-semibold">
            Long Description
        </Form.Label>

        <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Write complete book description"
            required
        />

    </Form.Group>
</Col>

                                    {/* =================================
                                        PUBLICATION YEAR
                                    ================================= */}

                                    <Col md={6}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Publication Year *

                                            </Form.Label>


                                            <Form.Control

                                                type="number"

                                                name="publicationYear"

                                                value={
                                                    bookData.publicationYear
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    e.g. 2025
                                                "

                                                min="1000"

                                                max="9999"

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        EDITION
                                    ================================= */}

                                    <Col md={6}>

                                        <Form.Group
                                            className="mb-3"
                                        >

                                            <Form.Label
                                                className="
                                                    fw-semibold
                                                "
                                            >

                                                Edition *

                                            </Form.Label>


                                            <Form.Control

                                                type="text"

                                                name="edition"

                                                value={
                                                    bookData.edition
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                                placeholder="
                                                    e.g. 2nd Edition
                                                "

                                                required

                                            />

                                        </Form.Group>

                                    </Col>


                                    {/* =================================
                                        SUBMIT BUTTON
                                    ================================= */}

                                    <Col md={12}>

                                        <Button

                                            type="submit"

                                            variant="success"

                                            className="
                                                w-100
                                                rounded-pill
                                                py-2
                                                fw-bold
                                            "

                                        >

                                            Add Book

                                        </Button>

                                    </Col>


                                </Row>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}


export default AddBook;

