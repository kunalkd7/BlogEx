import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getslugblog } from '../redux'
import { Container, Row, Col, Image, Card, Jumbotron } from 'react-bootstrap'
import moment from 'moment';

export default function Blogview({ match }) {
   const slug = match.params.slug;
   const { slugblog } = useSelector(state => state.BlogReducer)
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getslugblog(slug))
   }, [])

   console.log(slug)
   console.log(slugblog)
   return (
      <>
         {slugblog.length > 0 ?
            slugblog.map(blog => (
               <Container key={blog._id} style={{ marginTop: "20px" }}>
                  <Card style={{ width: '70rem', padding: "10px 50px 10px 50px" }}>

                     <Card.Header style={{ backgroundColor: 'white' }}>
                        <h2>{blog.title}</h2>
                        <p style={{ fontSize: '14px', textAlign: 'right', marginBottom: "-2px" }}>Posted at {moment(blog.createdAt).fromNow()}</p>
                     </Card.Header>

                     <Card.Img variant="top"
                        src={process.env.PUBLIC_URL + `/images/${blog.image}`} style={{}} />

                     <Card.Body>
                        <Card.Text >
                           <Jumbotron fluid style={{ paddingTop : "6px", paddingBottom : "1px"}}>
                              <Container>
                                 <h5>Description</h5>
                                 <p>{blog.description}</p>
                              </Container>
                           </Jumbotron>
                        </Card.Text>

                        <Card.Text>
                           <container>
                           <div dangerouslySetInnerHTML={{ __html: blog.body }} />
                           </container>
                        </Card.Text>

                     </Card.Body>
                  </Card>
               </Container>

            ))
            : null
         }
      </>
   )
}
