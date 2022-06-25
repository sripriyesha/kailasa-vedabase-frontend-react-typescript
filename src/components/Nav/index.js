import React from "react";
import { Col, Navbar, Row } from "react-bootstrap";

import Search from "../Search"

const searchIndices = [
    { name: `scripture`, title: `Scriptures` },
    { name: `scripture-verse`, title: `ScriptureVerses` }
]

const Nav = ({ children }) => (
    <Row>
        <Col sm={12}>
            <Navbar>
                <Navbar.Brand href="/">Kailasa Scriptures</Navbar.Brand>
                <Search indices={searchIndices} />
            </Navbar>
            {children}
        </Col>
    </Row>
);

export default Nav;