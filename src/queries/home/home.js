
import gql from "graphql-tag";

const HOME_QUERY = gql`
  query Home {
    books {
      data {
        attributes {
          title
          slug
          cover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    scriptures {
      data {
        attributes {
          title
          slug
        }
      }
    }
    
  }
`;

export default HOME_QUERY;