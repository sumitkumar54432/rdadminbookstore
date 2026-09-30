import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

function UserList() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      url: apiUrl + "/users",
      method: "get"
    })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.status || "Active"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UserList;