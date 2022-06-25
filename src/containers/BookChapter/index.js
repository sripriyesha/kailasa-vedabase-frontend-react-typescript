import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";

import Layout from "../../components/Layout";
import Query from "../../components/Query";
import BOOK_CHAPTER_QUERY from "../../queries/book-chapter/book-chapter";

const BookChapter = () => {
  const { slug } = useParams();

  return (
    <Query query={BOOK_CHAPTER_QUERY} slug={slug}>
      {({ data: { bookChapters } }) => {
        let previousLinkSlug = null;
        let nextLinkSlug = null;

        const currentBookChapter = bookChapters.data[0];
        const currentBook = currentBookChapter.attributes.book.data;
        bookChapters = currentBook.attributes.book_chapters.data;

        if (currentBookChapter.attributes.order !== 1) {
          previousLinkSlug = bookChapters.filter((bookChapter) => {
            return bookChapter.attributes.order === currentBookChapter.attributes.order - 1;
          })[0].attributes.slug;
        }

        const maxOrder = Math.max.apply(Math, bookChapters.map(bookChapter => bookChapter.attributes.order));

        if (currentBookChapter.attributes.order !== maxOrder) {
          nextLinkSlug = bookChapters.filter((bookChapter) => {
            return bookChapter.attributes.order === currentBookChapter.attributes.order + 1;
          })[0].attributes.slug;
        }

        return (
          <Layout>
            <Row>
              <Col sm={12}>
                <Link to={`/book/${currentBookChapter.attributes.book.data.attributes.slug}`}>
                  {currentBookChapter.attributes.book.data.attributes.title}
                </Link>
                <h1>{currentBookChapter.attributes.title}</h1>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                {currentBookChapter.attributes.content.split('\n').map(function(item, key) {
                  return (
                    <span key={key}>
                      {item}
                      <br/>
                    </span>
                  )
                })}
              </Col>
            </Row>
            <Row>
              {previousLinkSlug !== null ?
                <Col sm={6}>
                  <Button
                    variant="primary"
                    href={`/book/${currentBook.attributes.slug}/${previousLinkSlug}`}
                  >Previous</Button>
                </Col>
              :
                <Col sm={6}></Col>
              }
              {nextLinkSlug !== null ?
                <Col sm={6}>
                  <Button
                    variant="primary"
                    href={`/book/${currentBook.attributes.slug}/${nextLinkSlug}`}
                    className="pull-right"
                  >Next</Button>
                </Col>
              :
                null
              }
            </Row>
          </Layout>
        );
      }}
    </Query>
  );
};

export default BookChapter;
