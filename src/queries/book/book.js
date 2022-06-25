import gql from "graphql-tag";

const BOOK_QUERY = gql`
  query Book($slug: String!) {
    books(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          slug
          book_chapters {
            data {
              attributes {
                title   
                order
                slug
              }
            }   
          }
        }
      }
    }
  }
`;

export default BOOK_QUERY;
