import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import Layout from "../../components/Layout";
import Query from "../../components/Query";
import BOOK_QUERY from "../../queries/book/book";

const Book = () => {
  const { slug } = useParams();

  return (
    <Layout>
      <Row>
        <Query query={BOOK_QUERY} slug={slug}>
          {({ data: { books } }) => {
            const bookChapters = books.data[0].attributes.book_chapters.data.sort((a, b) => {
              return (
                a.attributes.order < b.attributes.order ?
                  -1
                :
                  (a.attributes.order > b.attributes.order ? 1 : 0)
              );
            })

            const bookChaptersMarkup = bookChapters.map(bookChapter => (
              <Row key={bookChapter.attributes.slug}>
                <Col sm={12}>
                  <Link
                    to={`/book/${books.data[0].attributes.slug}/${bookChapter.attributes.slug}`}
                  >
                    {bookChapter.attributes.title}
                  </Link>
                </Col>
              </Row>
            ))

            return (
              <>
                <Row>
                  <Col sm={12}>
                      <h1>{books.data[0].attributes.title}</h1>
                  </Col>
                </Row>
                {bookChaptersMarkup}
              </>
            );
          }}
        </Query>
      </Row>
    </Layout>
  );
};

export default Book;
