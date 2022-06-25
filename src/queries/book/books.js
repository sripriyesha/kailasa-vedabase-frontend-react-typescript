import gql from "graphql-tag";

const BOOKS_QUERY = gql`
  query Books {
    books {
      data {
        attributes {
          title
          slug
        }
      }
    }
  }
`;

export default BOOKS_QUERY;