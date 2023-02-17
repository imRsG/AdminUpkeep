import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [usertype, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");

  async function signup() {
    let item = { username, email, usertype, password, Confirmpassword }
    console.warn(item)
    let result = await fetch("http://upkeep.crmcity.org:8093/api/user/register", { mode: 'cors' }, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    })
    result = await result;
    console.warn("result", result)
  }
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <>
      <section>
        <Container className="mt-5">
          <Row className='border border-1 mt-5 p-5'>
            <Col>
              <h2 className='text-center'>SignUp</h2>
              <Form>
                <Row className='mt-5 mb-4'>
                  <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className='mt-4 mb-4'>
                  <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="*email"
                        aria-describedby="inputGroupPrepend"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a active email-id
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className='mt-4 mb-4 justify-content-between'>
                  <Col> <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="file"
                        placeholder=""
                        aria-describedby="inputGroupPrepend"
                        required

                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group></Col>
                  <Col> <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Select aria-label="Default select example" value={usertype}
                        onChange={(e) => setUserType(e.target.value)}>
                        <option>Admin</option>
                        <option value="1">Tenant</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a user type
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-4 mb-4 justify-content-between'>
                  <Col> <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="*password"
                        aria-describedby="inputGroupPrepend"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid password
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group></Col>
                  <Col> <Form.Group controlId="validationCustomUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="*confrim password"
                        aria-describedby="inputGroupPrepend"
                        required
                        value={Confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        password does not match
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group></Col>
                  <Row className='mt-2 mb-4 justify-content-between'>
                    <Col>
                      <Button type="submit">SIGN UP</Button>
                    </Col>
                    <Col>
                      <Button>SIGN IN</Button>
                    </Col>
                  </Row>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Signup
