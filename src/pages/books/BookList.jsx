
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Col,
  Container,
  Row,
  Table,
  Button,
  Form,
  Pagination,
  Card,
  Badge,
  Spinner,
  InputGroup,
} from "react-bootstrap";

import {
  FaTrash,
  FaEdit,
  FaEye,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function BookList() {

  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  // =========================
  // GET BOOKS
  // =========================

  const getBooks = () => {

    setLoading(true);

    axios
      .get(apiUrl + "/user/books")

      .then((res) => {

        console.log("BOOK API RESPONSE:", res.data);

        let data =
          res.data.data ||
          res.data.books ||
          res.data ||
          [];

        if (!Array.isArray(data)) {
          data = [];
        }

        // Newest books first
        data.sort((a, b) => {

          return (
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
          );

        });

        setBooks(data);

      })

      .catch((err) => {

        console.log("BOOK API ERROR:", err);

        setBooks([]);

      })

      .finally(() => {

        setLoading(false);

      });

  };


  // =========================
  // LOAD BOOKS
  // =========================

  useEffect(() => {

    getBooks();

  }, []);


  // =========================
  // DELETE BOOK
  // =========================

  function handleDelete(id) {

    if (
      !window.confirm(
        "Are you sure you want to delete this book?"
      )
    ) {
      return;
    }

    axios
      .delete(apiUrl + "/delete/book/" + id)

      .then(() => {

        alert("Book deleted successfully");

        getBooks();

      })

      .catch((err) => {

        console.log("DELETE ERROR:", err);

        alert(
          err.response?.data?.message ||
          "Failed to delete book"
        );

      });

  }


  // =========================
  // EDIT BOOK
  // =========================

  function handleUpdate(id) {

    navigate("/edit/book/" + id);

  }


  // =========================
  // VIEW BOOK
  // =========================

  function handleView(id) {

    navigate("/book/" + id);

  }


  // =========================
  // ADD BOOK
  // =========================

  function goToAddBook() {

    navigate("/add/book");

  }


  // =========================
  // SEARCH
  // =========================

  const filteredBooks = books.filter((book) => {

    const search =
      searchBook.toLowerCase().trim();

    if (!search) {
      return true;
    }

    const title =
      (
        book.bookTitle ||
        book.bookTittle ||
        ""
      ).toLowerCase();

    const author =
      (
        book.authorName ||
        ""
      ).toLowerCase();

    const isbn =
      (
        book.isbnNo ||
        ""
      ).toLowerCase();

    const publisher =
      (
        book.publisher ||
        ""
      ).toLowerCase();

    return (
      title.includes(search) ||
      author.includes(search) ||
      isbn.includes(search) ||
      publisher.includes(search)
    );

  });


  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredBooks.length / booksPerPage
  );

  const startIndex =
    (pageNo - 1) * booksPerPage;

  const currentBooks =
    filteredBooks.slice(
      startIndex,
      startIndex + booksPerPage
    );


  // =========================
  // SEARCH PAGE RESET
  // =========================

  useEffect(() => {

    setPageNo(1);

  }, [searchBook]);


  return (

    <Container className="mt-4 mb-5">

      <Card className="shadow-sm border-0 rounded-4">

        <Card.Body className="p-4">


          {/* ================= HEADER ================= */}

          <Row className="align-items-center mb-4">

            <Col md={6}>

              <h4 className="fw-bold mb-0">

                Book List

                <Badge
                  bg="primary"
                  className="ms-2"
                >
                  {filteredBooks.length}
                </Badge>

              </h4>

              <p className="text-muted mb-0 mt-1">
                Manage all books in your store
              </p>

            </Col>


            <Col
              md={6}
              className="text-md-end mt-3 mt-md-0"
            >

              <Button
                variant="success"
                className="rounded-pill px-4"
                onClick={goToAddBook}
              >

                <FaPlus className="me-2" />

                Add Book

              </Button>

            </Col>

          </Row>


          {/* ================= SEARCH ================= */}

          <Row className="mb-4">

            <Col
              md={6}
              lg={5}
            >

              <InputGroup>

                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  placeholder="Search title, author, ISBN or publisher..."
                  value={searchBook}
                  onChange={(e) =>
                    setSearchBook(
                      e.target.value
                    )
                  }
                />

              </InputGroup>

            </Col>

          </Row>


          {/* ================= LOADING ================= */}

          {loading ? (

            <div className="text-center py-5">

              <Spinner
                animation="border"
                variant="success"
              />

              <p className="mt-2 text-muted">
                Loading books...
              </p>

            </div>

          ) : (

            <>


              {/* ================= TABLE ================= */}

              <Table
                bordered
                hover
                responsive
                className="align-middle"
              >

                <thead className="table-light">

                  <tr>

                    <th>#</th>

                    <th>Book Image</th>

                    <th>Book Title</th>

                    <th>Author Name</th>

                    <th>Price</th>

                    <th>ISBN No</th>

                    <th>Publication</th>

                    <th>Pages</th>

                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {currentBooks.length > 0 ? (

                    currentBooks.map(
                      (book, index) => {

                        const title =
                          book.bookTitle ||
                          book.bookTittle ||
                          "No title";

                        const price =
                          book.price ||
                          book.finalPrice ||
                          book.originalPrice ||
                          0;

                        return (

                          <tr
                            key={book._id}
                          >


                            {/* NUMBER */}

                            <td>

                              {startIndex +
                                index +
                                1}

                            </td>


                            {/* IMAGE */}

                            <td>

                              {book.bookImage ? (

                                <img
                                  src={
                                    book.bookImage
                                  }
                                  width="60"
                                  height="75"
                                  alt={title}
                                  className="rounded border"
                                  style={{
                                    objectFit:
                                      "contain",
                                  }}
                                  onError={(
                                    e
                                  ) => {

                                    e.target.style.display =
                                      "none";

                                  }}
                                />

                              ) : (

                                <div
                                  className="bg-light border rounded d-flex align-items-center justify-content-center text-muted"
                                  style={{
                                    width:
                                      "60px",
                                    height:
                                      "75px",
                                    fontSize:
                                      "11px",
                                  }}
                                >
                                  No Image
                                </div>

                              )}

                            </td>


                            {/* TITLE */}

                            <td>

                              <span className="fw-semibold">

                                {title}

                              </span>

                            </td>


                            {/* AUTHOR */}

                            <td>

                              {book.authorName ||
                                "N/A"}

                            </td>


                            {/* PRICE */}

                            <td>

                              <span className="fw-semibold text-success">

                                ₹{price}

                              </span>

                            </td>


                            {/* ISBN */}

                            <td>

                              {book.isbnNo ||
                                "N/A"}

                            </td>


                            {/* PUBLICATION */}

                            <td>

                              {book.publisher ||
                                book.publication ||
                                "N/A"}

                            </td>


                            {/* NUMBER OF PAGES */}

                            <td>

                              {book.nop ||
                                "N/A"}

                            </td>


                            {/* ACTIONS */}

                            <td>

                              <div className="d-flex gap-2">


                                {/* VIEW */}

                                <Button
                                  variant="primary"
                                  size="sm"
                                  title="View Book"
                                  onClick={() =>
                                    handleView(
                                      book._id
                                    )
                                  }
                                >

                                  <FaEye />

                                </Button>


                                {/* EDIT */}

                                <Button
                                  variant="warning"
                                  size="sm"
                                  title="Edit Book"
                                  onClick={() =>
                                    handleUpdate(
                                      book._id
                                    )
                                  }
                                >

                                  <FaEdit />

                                </Button>


                                {/* DELETE */}

                                <Button
                                  variant="danger"
                                  size="sm"
                                  title="Delete Book"
                                  onClick={() =>
                                    handleDelete(
                                      book._id
                                    )
                                  }
                                >

                                  <FaTrash />

                                </Button>

                              </div>

                            </td>


                          </tr>

                        );

                      }

                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="9"
                        className="text-center py-5"
                      >

                        <h5 className="text-muted">

                          No books found 😔

                        </h5>


                        {searchBook && (

                          <p className="text-muted">
                            Try searching with another
                            title, author or ISBN.
                          </p>

                        )}


                        <Button
                          variant="success"
                          className="rounded-pill mt-2"
                          onClick={
                            goToAddBook
                          }
                        >

                          <FaPlus className="me-2" />

                          Add Your First Book

                        </Button>

                      </td>

                    </tr>

                  )}

                </tbody>

              </Table>


              {/* ================= PAGINATION ================= */}

              {totalPages > 1 && (

                <div className="d-flex justify-content-center mt-4">

                  <Pagination>


                    <Pagination.Prev

                      disabled={
                        pageNo === 1
                      }

                      onClick={() =>
                        setPageNo(
                          (prev) =>
                            Math.max(
                              prev - 1,
                              1
                            )
                        )
                      }

                    />


                    {[...Array(totalPages)].map(
                      (_, index) => {

                        const page =
                          index + 1;

                        return (

                          <Pagination.Item

                            key={page}

                            active={
                              page ===
                              pageNo
                            }

                            onClick={() =>
                              setPageNo(
                                page
                              )
                            }

                          >

                            {page}

                          </Pagination.Item>

                        );

                      }
                    )}


                    <Pagination.Next

                      disabled={
                        pageNo ===
                        totalPages
                      }

                      onClick={() =>
                        setPageNo(
                          (prev) =>
                            Math.min(
                              prev + 1,
                              totalPages
                            )
                        )
                      }

                    />

                  </Pagination>

                </div>

              )}

            </>

          )}

        </Card.Body>

      </Card>

    </Container>

  );

}


export default BookList;

