import { useNavigate } from "react-router-dom"
import { Button, Container,Row, Col,Form ,Table} from "react-bootstrap"
import {useEffect, useState} from "react"
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios"

function DiscountList() {
    const navigate = useNavigate();
    const [discounts, setDiscounts] = useState([]);
   function goToAddDiscount() {
        navigate('/add/discount')
    }
    function goForEdit(id) {
        
        navigate(`/edit/discount/${id}`)
    }
    useEffect(() => {
        // Fetch discounts from API or local storage
        axios({
            url:apiUrl + '/discounts',
            method: 'get'
        })
        .then(res => {
            setDiscounts(res.data.data);
        })
        .catch(error => {
            alert('Error fetching discounts: ' + error);
        });
    }, []);

    function goTOAddDiscount() {
        navigate('/add/discount')
    }
    return (
        <Container>
            <Row>
                <Col>
                <Form> 
                    <Form.Group>
                        <Form.Control type="text" placeholder="type book name  search"></Form.Control>
                    </Form.Group>
                </Form>
                <Button className = "mt-5" variant ="success" style={{float:"right"}} onClick={goTOAddDiscount}>AddDiscount +</Button>
                </Col>
            </Row>
            <Row>
                <h3 className="mt-2 text-center" text-danger  >Discounts List</h3>
                <Table bordered hover >
                    <thead>
                        <tr>
                            <th>Discount Name</th>
                            <th>Discount Type</th>
                            <th>Discount Value</th>     
                            <th>Book Name</th>   
                            <th>Valid From</th>
                            <th>Valid To</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                              </thead>     
                    <tbody>
                        {discounts.map((discount) => 
                            <tr > 
                                <td>{discount.discountName}</td>
                                <td>{discount.discountType}</td>
                                <td>{discount.discountValue}</td>
                                <td>{discount.bookTitle}</td>
                                <td>{new Date(discount.validFrom).toLocaleDateString()}</td>
                                <td>{new Date(discount.validTo).toLocaleDateString()}</td>
                                <td className={discount.status?.toLowerCase() === "active" ? "text-success" : "text-danger"}>{discount.status}</td>
                                 <td><Button variant="danger" size="sm" onClick={()=>goForEdit(discount._id)}>Edit</Button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>

            </Row>
        </Container>
    )
}
export default DiscountList