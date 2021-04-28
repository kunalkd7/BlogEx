import { React, useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert, ListGroup } from 'react-bootstrap'
import logo from '../formimage.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../redux'
import {Redirect} from 'react-router-dom'

export default function Comp(props) {

    //same should be in req.body
    const [state, setstate] = useState({
        name: '',
        password: '',
    })

    const dispatch = useDispatch();
    const { loading, loginerrors, loginsuccess, loginuser } = useSelector(state => state.AuthReducer); //redux store state

    const onchange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = (e) => {
        e.preventDefault() //prevent reload 
        // console.log(state);
        dispatch(login(state));
    }

    //didmount didupdate
    // useEffect(() => {
    //     console.log("useeffects")
    //     if (loginuser) {
    //         props.history.push('/dashboard')
    //     }
    // },[loginuser])

    console.log("login page")
    
    return (
            <>
               { loginuser  ?  <Redirect to = "/dashboard" /> : null }
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

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={onchange}
                                    />
                                </Form.Group>

                                <Button  type="submit" style={{ backgroundColor: '#fd6b0c', border : 'none'}} >
                                    {loading ? "...." : "Login"}
                                </Button>
                            </Form>
                            <ListGroup style={{ marginTop: "15px" }}>
                                {
                                    loginerrors.map((err) => (
                                        <ListGroup.Item variant="danger" style={{ borderLeft: "3px solid #8c0000" }}>{err.msg}</ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            {loginsuccess ? <Alert variant="success" style={{ borderLeft: "3px solid green" }}>{loginsuccess}</Alert> : <> </>}
                        </Col>
                    </Row>
                </Container>
            </>

    )
}
