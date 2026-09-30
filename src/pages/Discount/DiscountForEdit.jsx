import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

function DiscountForEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState({
    discountName: "",
    discountType: "",
    discountValue: 0,
    validFrom: "",
    validTo: "",
    book: "",
  });

  // Fetch discount details
  useEffect(() => {
    axios
      .get(`${apiUrl}/discounts/for/edit/${id}`)
      .then((res) => {
        console.log(res.data);

        // Change this according to your backend response
        setDiscount(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error fetching discount details");
      });
  }, [id]);

  // Handle input changes
  function manageUpdate(e) {
    const { name, value } = e.target;

    setDiscount({
      ...discount,
      [name]: value,
    });
  }

  // Update discount
  function updateDiscount(e) {
    e.preventDefault();

    axios
      .put(`${apiUrl}/discounts/update/${id}`, discount)
      .then((res) => {
        alert("Discount updated successfully");
        navigate("/discounts");
      })
      .catch((error) => {
        console.log(error);
        alert("Error updating discount");
      });
  }

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col
          xs={12}
          md={8}
          lg={6}
          className="border p-4 rounded bg-white mt-5"
        >
          <h3 className="text-center text-danger mb-4">
            Edit Discount Page
          </h3>

          <Form onSubmit={updateDiscount}>
            {/* Discount Name */}
            <Form.Group className="mb-3">
              <Form.Label>Discount Name</Form.Label>

              <Form.Control
                type="text"
                name="discountName"
                value={discount.discountName}
                onChange={manageUpdate}
              />
            </Form.Group>

            {/* Discount Type */}
            <Form.Group className="mb-3">
              <Form.Label>Discount Type</Form.Label>

              <Form.Control
                type="text"
                name="discountType"
                value={discount.discountType}
                onChange={manageUpdate}
              />
            </Form.Group>

            {/* Discount Value */}
            <Form.Group className="mb-3">
              <Form.Label>Discount Value</Form.Label>

              <Form.Control
                type="number"
                name="discountValue"
                value={discount.discountValue}
                onChange={manageUpdate}
              />
            </Form.Group>

            {/* Book */}
            <Form.Group className="mb-3">
              <Form.Label>Book</Form.Label>

              <Form.Control
                type="text"
                name="book"
                value={discount.book}
                onChange={manageUpdate}
              />
            </Form.Group>

            {/* Valid From */}
            <Form.Group className="mb-3">
              <Form.Label>Valid From</Form.Label>

              <Form.Control
                type="date"
                name="validFrom"
                value={discount.validFrom?.substring(0, 10)}
                onChange={manageUpdate}
              />
            </Form.Group>

            {/* Valid To */}
            <Form.Group className="mb-3">
              <Form.Label>Valid To</Form.Label>

              <Form.Control
                type="date"
                name="validTo"
                value={discount.validTo?.substring(0, 10)}
                onChange={manageUpdate}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="success">
                Update Discount
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/discounts")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DiscountForEdit;