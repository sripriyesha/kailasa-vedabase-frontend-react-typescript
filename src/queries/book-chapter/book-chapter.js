import gql from "graphql-tag";

const BOOK_CHAPTER_QUERY = gql`
  query BookChapter($slug: String!) {
    bookChapters(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          content
          slug
          order
          book {
            data {
              attributes {
                title
                slug
                book_chapters {
                  data {
                    attributes {
                      slug
                      order
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BOOK_CHAPTER_QUERY;
