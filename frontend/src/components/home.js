import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getallblogs } from '../redux'
import { Container, Row, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import { GiEyeTarget } from 'react-icons/gi';
import { FaUser, FaEye } from 'react-icons/fa';
import moment from 'moment'

const Renderdata = (props) => {

    return (
        props.data.map((data) => (

            <Row style={{ backgroundColor: "white", marginTop: "15px" }}>
                <Col xs={4}>
                    <img src={process.env.PUBLIC_URL + `/images/${data.image}`} style={{ height: "230px", width: "100%", padding: "20px 20px 20px 10px" }} />
                </Col>

                <Col xs={6} style={{ paddingLeft: "0px" }}>

                    <div style={{ marginTop: "20px" }}>

                        <p> <FaUser /> {data.username}
                            <span style={{ marginLeft: "450px" }}>
                                {/* <Link to={"/showpost/" + post.slug} params={{ slug: post.slug }}></Link>
                            <Link to={{ pathname: `/blogview/${data.slug}` }}> */}
                                <Link to={"/blogview/" + data.slug}>
                                    <FaEye style={{ color: '#007bff', fontSize: "19px" }} />
                                </Link>
                            </span>
                        </p>

                        <h2>{data.title}</h2>
                        <div style={{ height: "90px" }}>
                            <p style={{ fontSize: "16px" }}>{data.description}</p>
                        </div>

                        <p style={{ fontSize: "13.5px", textAlign: 'right', paddingRight: '20px' }}>posted at {moment(data.createdAt).fromNow()}</p>
                    </div>
                </Col>
                <Col xs={2} style={{ backgroundColor: "#e7e6e1" }}></Col>
            </Row>

        ))
    )
}

export default function Home() {

    const { blogs_success } = useSelector(state => state.BlogReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("logout")
        dispatch(getallblogs())
    }, [])

    const [currentpage, setcurrentpage] = useState(1);
    const [itemsperpage, setitemsperpage] = useState(3);

    const indexoflastitem = currentpage * itemsperpage;
    const indexoffirstitem = indexoflastitem - itemsperpage;
    const currentblogs = blogs_success.slice(indexoffirstitem, indexoflastitem);

    const pages = [];
    for (let i = 1; i <= Math.ceil(blogs_success.length / itemsperpage); i++) {
        pages.push(i)
    }
    
    const handleclick = (e) => {
    setcurrentpage(e.target.innerHTML)
    }

    //can also write diectly in render 
    const renderpages = pages.map((val) => {
        return <Button onClick={handleclick} style={{ backgroundColor: '#fd6b0c', border: 'none' }}>{val}</Button> //new array with tags
    })

    return (
        <>

            <Container style={{ marginTop: "30px" }}>
                {/* .length cz it is already a empty array it won't show the else part */}
                {blogs_success.length > 0
                    ? <Renderdata data={currentblogs} />
                    : <Row>
                        <Col style={{ marginTop: "100px" }}>
                            <p style={{ fontSize: "30px", textAlign: "center" }}> No Blogs Created Yet !!!!</p>
                        </Col>
                    </Row>
                }

                <Row>
                    <Col xs={12} style={{ marginTop: '15px' }}>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="mr-2" aria-label="First group">
                                {renderpages}
                            </ButtonGroup>
                        </ButtonToolbar></Col>
                </Row>

            </Container>
        </>
    )
}
