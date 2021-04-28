import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, clearblogsfromstate } from '../redux'
import logo from '../mylogo.jpg'
import { AiOutlineUserAdd, AiOutlineFileDone } from 'react-icons/ai';
import { RiLoginBoxLine } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

export default function Comp() {
  const { loginuser } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const logoutuser = () => {
    dispatch(logout())
    dispatch(clearblogsfromstate())
  }

  const navlinks = loginuser
    ?
    <Nav >
      <Nav style={{ color: "black", textDecoration: "none", marginRight: "25px" }}>
        <span style={{ marginRight: "2px"}}><BiUser /></span>{loginuser}</Nav>

      <Nav> <Link to="/dashboard" style={{ color: "black", textDecoration: "none", marginRight: "23px" }}>
        <span style={{ marginRight: "2px"}}><AiOutlineFileDone /></span>MyBlogs</Link></Nav>

      <Nav> <Link to="/createblog" style={{ color: "black", textDecoration: "none", marginRight: "25px" }}>
        <span style={{ marginRight: "2px"}}><IoCreateOutline /></span>CreateBlog</Link></Nav>

      <Nav> <Link to="" style={{ color: "black", textDecoration: "none", marginRight: "150px" }} onClick={logoutuser}>
        <span style={{ marginRight: "2px"}}><FiLogOut/></span>Logout</Link></Nav>
    </Nav>
    :
    <Nav >
      <Nav > <Link to="/signup" style={{ color: "black", textDecoration: "none", marginRight: "25px" }}>
        <span ><AiOutlineUserAdd /></span>  Signup
       </Link></Nav>

      <Nav > <Link to="/login" style={{ color: "black", textDecoration: "none", marginRight: "150px" }}>
        <span><RiLoginBoxLine /></span>   Login
        </Link></Nav>
    </Nav>


  return (<>
    <Navbar collapseOnSelect expand="lg" bg="white" style={{ borderBottom: "2px solid #fe6601" }}>
      <Navbar.Brand style={{ marginLeft: "130px" }}>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <img
            alt=""
            src={logo}
            width="28"
            height="32"
            className="d-inline-block align-top"
            style={{}}
          />{' '}
          <span style={{ marginLeft: "-4px", fontSize: "25px" }}>log<span style={{ color: '#fe6601' }}>E</span>x</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        {navlinks}
      </Navbar.Collapse>
    </Navbar>

    {/* we can declare the routes here too */}


  </>
  )
}
