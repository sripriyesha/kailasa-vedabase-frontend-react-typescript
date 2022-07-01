import gql from "graphql-tag";

const SCRIPTURE_QUERY = gql`
  query Scripture($slug: String!) {
    scriptures(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          slug
          scripture_verses {
            data {
              attributes {
                sutra_number
                sanskrit_sutra
                transliteration
                translation_aurobindo_english
                translation_aurobindo_hindi
                glossary
                translation_sri_nithyananda_paramashivam
                slug
              }
            }   
          }
        }
      }
    }
  }
`;

export default SCRIPTURE_QUERY;
