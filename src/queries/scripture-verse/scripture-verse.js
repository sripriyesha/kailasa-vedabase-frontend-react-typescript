import gql from "graphql-tag";

const SCRIPTURE_VERSE_QUERY = gql`
  query ScriptureVerse($slug: String!) {
    scriptureVerses(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          sutra_number
          sanskrit_sutra
          transliteration
          translation_aurobindo_english
          translation_aurobindo_hindi
          glossary
          translation_sri_nithyananda_paramashivam
          scripture {
            data {
              attributes {
                title
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export default SCRIPTURE_VERSE_QUERY;
