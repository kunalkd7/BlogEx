import { React, useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert, ListGroup } from 'react-bootstrap'
import logo from '../formimage.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../redux'
import { Link, Redirect } from "react-router-dom";


export default function Signup({ history }) {

    //same should be in req.body
    const [state, setstate] = useState({
        name: '',
        email: '',
        password: '',
        cPassword: '',
    })


    const dispatch = useDispatch();
    const { loading, signuperrors, signupsucess, signedup, loginuser } = useSelector(state =>state.AuthReducer); //redux store state

    const onchange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = (e) => {
        e.preventDefault() //prevent reload 

        dispatch(signup(state));
    }

    return (
        <>
            { signedup ? <Redirect to="/login" /> : null}
            { loginuser ? <Redirect to="/userdashboard" /> : null}

            <Container fluid>
                <Row>
                    <Col xs={8} >
                        <img src={logo} alt="mylogo" style={{ height: "650px", width: "100%" }}></img>
                    </Col>

                    <Col >
                        <Form style={{ marginTop: "25px" }} onSubmit={onsubmit}>

                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="name" // should be same in req.body in api
                                    type="text"
                                    placeholder="Enter your username"
                                    onChange={onchange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={onchange}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                 </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={onchange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirmPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="cpassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={onchange}
                                />
                            </Form.Group>

                            <Button  type="submit" style={{ backgroundColor: '#fd6b0c', border : 'none'}}>
                                {loading ? "...." : "Signup"}
                            </Button>
                        </Form>
                        <ListGroup style={{ marginTop: "15px" }}>
                            {
                                signuperrors.map((err) => (
                                    <ListGroup.Item variant="danger" style={{ borderLeft: "3px solid #8c0000" }}>{err.msg}</ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                        {signupsucess ? <Alert variant="success" style={{ borderLeft: "3px solid green" }}>{signupsucess}</Alert> : <> </>}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
