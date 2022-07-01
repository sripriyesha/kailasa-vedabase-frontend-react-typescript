import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import Layout from "../../components/Layout";
import Query from "../../components/Query";
import SCRIPTURE_QUERY from "../../queries/scripture/scripture";

const Scripture = () => {
  const { slug } = useParams();

  return (
    <Layout>
      <Row>
        <Query query={SCRIPTURE_QUERY} slug={slug}>
          {({ data: { scriptures } }) => {
            const currentScripture = scriptures.data[0];

            const scripturesVersesMarkup = currentScripture.attributes.scripture_verses.data.map(scriptureVerse => (
              <Row key={scriptureVerse.attributes.slug}>
                <Col sm={12}>
                  <Link
                    to={`/scripture/${currentScripture.attributes.slug}/${scriptureVerse.attributes.slug}`}
                  >
                    {scriptureVerse.attributes.sutra_number}
                  </Link>
                </Col>
              </Row>
            ));

            return (
              <>
                <Row>
                  <Col sm={12}>
                      <h1>{currentScripture.attributes.title}</h1>
                  </Col>
                </Row>
                {scripturesVersesMarkup}
              </>
            );
          }}
        </Query>
      </Row>
    </Layout>
  );
};

export default Scripture;
