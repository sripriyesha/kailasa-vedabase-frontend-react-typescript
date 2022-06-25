import { Link } from "react-router-dom";
import { default as React } from "react"
import {
  connectStateResults,
  Index,
  Snippet,
  PoweredBy,
  connectHits,
} from "react-instantsearch-dom"
import { parseAlgoliaHit, HIGHLIGHT_TAGS } from "./react-instantsearch-core/highlight"
import { omit } from "./react-instantsearch-core/utils";

const convertIndexNameToText = (indexName) => {
  switch (indexName) {
    case 'scripture':
      return 'Scriptures';

    case 'scripture-verse':
      return 'Scripture verses';
  
    default:
      break;
  }
};

const HitCountAndIndexName = connectStateResults(({ searchResults, indexName }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div style={{ display: 'flex'}}>
      <span style={{ flex: 1}}>{convertIndexNameToText(indexName)}</span>
      <span className="HitCount">  
        {hitCount} result{hitCount !== 1 ? `s` : ``}
      </span>
    </div>
  ) : null
})

function buildHighlightMarkup (part, index) {
  return (
    part.isHighlighted ? (
      <mark className="ais-Highlight-highlighted" key={index}>{part.value}</mark>
    ) : (
      <span className="ais-Highlight-nonHighlighted" key={index}>{part.value}</span>
    )
  )
}

function buildHighlightedSearchResultMarkup({
  parsedHit,
  indexName,
}) {
  const markup = [];

  switch (indexName) {
    case 'scripture':
      markup.push(
        <h4>
          {parsedHit['title'].map(
            (part, index) => buildHighlightMarkup(part, index)
          )}
        </h4>
      );
      break;

    case 'scripture-verse':
      markup.push(
        <h4>
          {parsedHit['translation_aurobindo_english'].map(
            (part, index) => buildHighlightMarkup(part, index)
          )}
        </h4>
      );

      let scripture = null;
      if (parsedHit.hasOwnProperty('scripture')) {
        scripture = parsedHit['scripture'];
      }

      parsedHit = omit(parsedHit, ['translation_aurobindo_english', 'scripture']);

      const orderedIndexRemainingFields = [
        'transliteration',
        'sanksrit_sutra',
        'translation_aurobindo_hindi',
        'glossary',
        'sutra_number',
      ];

      for (let index = 0; index < orderedIndexRemainingFields.length; index++) {
        const fieldName = orderedIndexRemainingFields[index];
        
        if (parsedHit.hasOwnProperty(fieldName)) {
          markup.push(
            <p>
              {parsedHit[fieldName].map(
                (part, index) => buildHighlightMarkup(part, index)
              )}
            </p>
          );

          break;
        }
      }

      if (scripture !== null) {
        markup.push(
          <p>
            <b>Scripture:</b> {scripture.map(
              (part, index) => buildHighlightMarkup(part, index)
            )}
          </p>
        );
      }
      break;
  
    default:
      break;
  }

  return markup;
}

const Highlight = ({ hit, indexName }) => {
  let parsedHit = parseAlgoliaHit({
    highlightProperty: '_highlightResult',
    hit,
    preTag: HIGHLIGHT_TAGS.highlightPreTag,
    postTag: HIGHLIGHT_TAGS.highlightPostTag,
    indexName
  });

  const markup = buildHighlightedSearchResultMarkup({
    parsedHit, indexName
  })
  
  return (
    <span className="ais-Highlight">
      {markup.map((item, index) => {
        return (
          <div key={index}>
            {item}
          </div >
        )
      })}
    </span>
  );
};

const PageHit = ({ indexName, hit }) => (
  <div>
    <Link to={`/${indexName}/${hit.slug}`}>
      <Highlight hit={hit} tagName="mark" indexName={indexName}/>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

const Hits = ({ indexName, hits }) => {
  return (
    <div className="ais-Hits Hits">
      <ul className="ais-Hits-list">
        {hits.map(hit => (
          <li className="ais-Hits-item" key={hit.slug}> 
            <PageHit hit={hit} indexName={indexName} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const CustomHits = connectHits(Hits);

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCountAndIndexName indexName={index.name}/>
    <CustomHits indexName={index.name} />
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map((index, i) => (
      <div key={`${index.name}-hitsParent`}>
        <HitsInIndex index={index} key={`${index.name}-hitsInIndex`} />
      </div>
    ))}
    <PoweredBy />
  </div>
)

export default SearchResult