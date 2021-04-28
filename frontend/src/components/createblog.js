import { React, useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Row, Col, Card, Button, Form, ListGroup, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createblog, clearmsgerr } from '../redux'

export default function Createblog() {

    const { loginuser, loginid } = useSelector(state => state.AuthReducer);
    const { postblog_errors, redirectaftersuccess } = useSelector(state => state.BlogReducer);
    const dispatch = useDispatch();

    const [title, settitle] = useState('');
    const [imgname, setimgname] = useState('Choose Image');
    const [imgfile, setimgfile] = useState('');
    const [quill, setquill] = useState('')
    const [description, setdescription] = useState('');
    const [slug, setslug] = useState('');
    const [slugbtn, setslugbtn] = useState(false);
    const [imgprev, setimgprev] = useState('');

    const blogtitle = (e) => {
        settitle(e.target.value); //working on whole value ex: a b c
        const slugvalue = e.target.value.trim().split(' ').join('-');
        setslug(slugvalue);
    }

    const blogquill = (e) => {
        //console.log(e)
        setquill(e)
    }

    const blogimg = (e) => {
        if (e.target.files.length !== 0) {
            setimgname(e.target.files[0].name); // image name
            setimgfile(e.target.files[0]) //send to form data

            const Reader = new FileReader();
            Reader.readAsDataURL(e.target.files[0]) //read the binary data and encode it as base64 data url.
            Reader.onload = () => { // if no error in reading file then onload else onerror
                setimgprev(Reader.result);
            }
        }
    }

    const blogslug = (e) => {
        setslug(e.target.value)
        setslugbtn(true)
    }

    const updateslug = (e) => {
        e.preventDefault();
        const updatedurl = slug.trim().split(' ').join('-');
        setslug(updatedurl);
    }

    const blogdescription = (e) => {
        setdescription(e.target.value)
    }

    const onsubmit = (e) => {
        e.preventDefault();
        console.log(imgfile)
        // we have to use formdata() when we want to save img file
        let form = new FormData();

        //IMP : when we don't send file(image) with form data then the image key will be included in fields instead of files
        // it will read img property as normal text

        form.append('title', title);
        form.append('body', quill);
        form.append('image', imgfile);
        form.append('description', description);
        form.append('slug', slug)
        form.append('username', loginuser)
        form.append('userid', loginid)

        // for (var pair of form.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        dispatch(createblog(form))
    }

    // forcomponentdidmount 
    // to remove errors and success message from createblog page too
    useEffect(() => {
        dispatch(clearmsgerr())
    }, [])

    console.log("render")
    return (
        <>
            {loginuser ? null : <Redirect to="/" />}
            {/* redirect true when submit successfully */}
            {redirectaftersuccess ? <Redirect to="/dashboard" /> : null}

            <Container style={{ marginTop: "30px" }}>
                <Row>
                    <Col xs={6}>
                        <Card
                            bg="light"
                            style={{ width: '32rem' }}
                            className="mb-2" >

                            <Card.Body>
                                <Card.Title>Create New Blog</Card.Title>

                                <Form >

                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Blog Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Title"
                                            value={title}
                                            onChange={blogtitle}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.File
                                            type="file"
                                            id="custom-file"
                                            label={imgname}
                                            custom
                                            onChange={blogimg}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <p style={{marginBottom : '5px'}}>Blog Body</p>
                                        <ReactQuill value={quill} onChange={blogquill} />
                                    </Form.Group>

                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={7}
                                            placeholder="Write Description ......"
                                            maxLength='200'
                                            value={description}
                                            onChange={blogdescription}
                                        />
                                        <p>{description ? description.length : 0} <br />
                                        Max length : 200</p>
                                    </Form.Group>
                                    <ListGroup style={{ marginTop: "15px" }}>
                                        {postblog_errors ?
                                            postblog_errors.map((err, key) => (
                                                <ListGroup.Item key={key} variant="danger" style={{ borderLeft: "3px solid #8c0000" }}>{err.msg}</ListGroup.Item>
                                            ))
                                            : null
                                        }
                                    </ListGroup>
                                </Form>

                            </Card.Body>
                        </Card>

                    </Col>


                    <Col xs={6}>
                        <Card
                            bg="light"
                            style={{ width: '32rem' }}
                            className="mb-2" >

                            <Card.Body>
                                <Card.Title>Blog Preview</Card.Title>
                                <Form onSubmit={onsubmit}>

                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Post URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={slug}
                                            onChange={blogslug}
                                        />
                                    </Form.Group>

                                    {slugbtn ?
                                        <Form.Group style={{ marginTop: "-9px" }}>
                                            <Form.Control
                                                type="submit"
                                                value="Update URL"
                                                onClick={updateslug}
                                            />
                                        </Form.Group> : null}

                                    {imgprev ?
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Image Preview</Form.Label>
                                            <Card.Img variant="top" src={imgprev} />
                                        </Form.Group>
                                        : null}


                                    <Form.Group style={{ marginTop: "7px"  }}>
                                        <Form.Control type="submit" placeholder="Submit" style ={{ backgroundColor: '#fd6b0c', border : 'none', color : 'white'}}/>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
