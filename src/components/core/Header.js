import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { logout } from 'src/actions/userActions';
import logo from 'src/assets/images/logo.png';

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <>
            {/* Left side section */}
            <div className="left-section" style={{ backgroundColor: '#131921', float: 'left', width: '50%' }}>
                <p className="text-center text-white mb-0">FREEESHIP WITH INVOICES FROM 499K</p>
            </div>

            {/* Right side section */}
            <div className="right-section" style={{ backgroundColor: '#131921', float: 'right', width: '50%' }}>
                <p className="text-center text-white mb-0">
                    Hotline: <a className='text-white mb-0' href="tel:+8412345678">+84 12345678 (Free)</a>
                </p>
            </div>

            {/* Clearfix to contain floats */}
            <div style={{ clear: 'both' }}></div>

            {/* Existing header */}
            <header>
                <Navbar variant='dark' className='text-light' expand='lg' collapseOnSelect sticky="top">
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand href="/book">
                                <Image src={logo} alt="Logo" width="80" className="avatar" />
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls='navbarScroll' />
                        <Navbar.Collapse id='navbarScroll'>
                            <Nav className='ml-auto' navbarScroll>
                                <Nav.Link href="/book">Book</Nav.Link>
                                <Nav.Link href="/author">Author</Nav.Link>
                                <Nav.Link href="/contact">Contact</Nav.Link>
                                <LinkContainer to='/cart'>
                                    <Nav.Link>
                                        <i className='fas fa-shopping-cart'></i> Cart
                                    </Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <>
                                        <Image src={userInfo.avatar} width="40" height="40" roundedCircle />
                                        <NavDropdown title={userInfo.name} id='username'>
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;
