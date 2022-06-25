import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Image } from "react-bootstrap";

import Layout from "../../components/Layout";
import Query from "../../components/Query";
import HOME_QUERY from "../../queries/home/home";

const Home = () => {
  return (
    <Layout>
        <Query query={HOME_QUERY}>
            {({ data: { books, scriptures } }) => {
                books = books.data.sort((a, b) => {
                    return (
                        a.attributes.title < b.attributes.title ?
                            -1
                        :
                            (a.attributes.title > b.attributes.title ? 1 : 0)
                    )
                })
                    
                const booksMarkup = books.map(book => (
                    <Col sm={3} key={book.attributes.slug}>
                        <Link
                            
                            to={"/book/" + book.attributes.slug}
                        >
                            <Image
                                style={{
                                width: 261,
                                height: 324,
                            }}
                            src={process.env.REACT_APP_BACKEND_URL + book.attributes.cover.data.attributes.url} />
                            <p style={{ textAlign: 'center' }}>{book.attributes.title}</p>
                        </Link>
                    </Col>
                ));

                const scripturesMarkup = scriptures.data.map(scripture => (
                    <Col sm={3} key={scripture.attributes.slug}>
                        <Link
                            to={"/scripture/" + scripture.attributes.slug}
                        >
                            {scripture.attributes.title}
                        </Link>
                    </Col>
                ));

                return (
                <>
                    <Row>
                        <h2>Books</h2>
                        {booksMarkup}
                    </Row>
                    <Row>
                        <h2>Scriptures</h2>
                        {scripturesMarkup}
                    </Row>
                </>
                )
            }}
        </Query>
    </Layout>
  );
};

export default Home;