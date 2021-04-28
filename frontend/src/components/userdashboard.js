import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { redirectfalse } from '../redux';
import { Modal, Container, Row, Col, Jumbotron, Card } from 'react-bootstrap';
import { clearmsgerr, getuserblogs, deleteblog, cleardeletestate } from '../redux';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import moment from 'moment'

export default function Dashboard() {
    const { loginuser } = useSelector(state => state.AuthReducer); //redux store state
    const { userblogs_success, deleteblog_success } = useSelector(state => state.BlogReducer); //redux store state

    const { postblog_success } = useSelector(state => state.BlogReducer);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(clearmsgerr())//clear postblog_success  postblog_error
        dispatch(redirectfalse());//can go to createpost component again
    };

    const handledeleteClose = () => {
        dispatch(cleardeletestate()) //make deleteblog_success false again
    };

    useEffect(() => {
        // dispatch(redirectfalse());//can go to createpost component again
        dispatch(getuserblogs(loginuser))
        console.log("useeffects")
    }, [])

    const deleteonclick = (id, username) => {
        dispatch(deleteblog(id, username))
    }

    return (
        <>
            { loginuser ? null : <Redirect to='/' />}

            {postblog_success ?
                <Modal
                    show={true}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Happy Blogging</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {postblog_success}
                    </Modal.Body>

                </Modal>
                : null}

            {deleteblog_success ?
                <Modal
                    show={true}
                    onHide={handledeleteClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <h5> Blog Deleted Successfully</h5>
                    </Modal.Header>
                </Modal>
                : null}


            <Container style={{ marginTop: "30px" }}>
                <Row>

                    {/* .length cz it is already a empty array it won't show the else part */}
                    {userblogs_success.length > 0

                        ? userblogs_success.map(data => (

                            <Col xs={3}>
                                <Card style={{ width: '17rem', marginTop: '20px', padding: "0px 5px 0px 5px" }}>
                                    <Card.Header style={{ backgroundColor: 'white' }}>
                                        <h5 >{data.title} </h5>

                                        <p style={{ textAlign: 'right', marginBottom: '-10px' , marginRight: '-9px'}}>
                                            <span>
                                                <Link to={"/blogview/" + data.slug}>
                                                    <FaEye
                                                    style={{ color: '#007bff' , fontSize : "18px" , marginRight : '4px' }} />
                                                </Link>
                                            </span>
                                            <span>
                                                <RiDeleteBin6Fill style={{ color: '#dc3545' , fontSize : "17px" }}
                                                    onClick={() => deleteonclick(data._id, data.username)} //way to pass params
                                                    //created diff params for each value cz of map method
                                                />
                                            </span>

                                        </p>
                                    </Card.Header>
                                    <Card.Img style={{ height: '150px', }} variant="top" src={process.env.PUBLIC_URL + `images/${data.image}`} />
                                    <Card.Body>

                                        <Card.Text style={{ marginTop: '-10px' }}>
                                            <p style={{ fontSize: '14px', marginBottom: '-10px', marginLeft: '-10px' }}>posted at {moment(data.createdAt).fromNow()}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                        : <Container>
                            <Row>
                                <Col style={{ marginTop: "100px" }}>
                                    <p style={{ fontSize: "30px", textAlign: "center" }}> No Blogs Created Yet !!!!</p>
                                </Col>
                            </Row>
                        </Container>

                    }
                </Row>
            </Container>
        </>
    );


}

