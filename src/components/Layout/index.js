import React from "react";
import { Container } from "react-bootstrap";
import Nav from "../Nav";

const Layout = ({ children, navChildren }) => (
  <Container>
    <Nav />
    <main>{children}</main>
  </Container>
);

export default Layout;