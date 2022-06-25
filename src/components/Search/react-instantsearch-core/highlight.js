import { omit } from './utils';

export const HIGHLIGHT_TAGS = {
  highlightPreTag: `<ais-highlight-0000000000>`,
  highlightPostTag: `</ais-highlight-0000000000>`,
};

/**
 * Parses an highlighted attribute into an array of objects with the string value, and
 * a boolean that indicated if this part is highlighted.
 *
 * @param {string} preTag - string used to identify the start of an highlighted value
 * @param {string} postTag - string used to identify the end of an highlighted value
 * @param {string} highlightedValue - highlighted attribute as returned by Algolia highlight feature
 * @return {object[]} - An array of {value: string, isHighlighted: boolean}.
 */
function parseHighlightedAttribute({ preTag, postTag, highlightedValue = '' }) {
  const splitByPreTag = highlightedValue.split(preTag);
  const firstValue = splitByPreTag.shift();
  const elements =
    firstValue === '' ? [] : [{ value: firstValue, isHighlighted: false }];

  if (postTag === preTag) {
    let isHighlighted = true;
    splitByPreTag.forEach((split) => {
      elements.push({ value: split, isHighlighted });
      isHighlighted = !isHighlighted;
    });
  } else {
    splitByPreTag.forEach((split) => {
      const splitByPostTag = split.split(postTag);

      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true,
      });

      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false,
        });
      }
    });
  }

  return elements;
}

function parseHighlightedAttributes({
  indexName,
  highlightObject,
  preTag,
  postTag
}) {
  for (const [key, value] of Object.entries(highlightObject)) {
    switch (indexName) {
      case 'scripture':
        highlightObject[key] = parseHighlightedAttribute({
          preTag,
          postTag,
          highlightedValue: value,
        });
        break;
  
      case 'scripture-verse':
        if (key === 'scripture') {
          highlightObject[key] = parseHighlightedAttribute({
            preTag,
            postTag,
            highlightedValue: value['title'],
          });

          continue;
        }
        
        highlightObject[key] = parseHighlightedAttribute({
          preTag,
          postTag,
          highlightedValue: value,
        });
        break;
  
      default:
        break;
    }
  }

  return highlightObject;
}

function addMandatoryFields({
  indexName,
  highlightObject,
  hit,
  highlightProperty
}) {
  switch (indexName) {
    case 'scripture':
      highlightObject['title'] = hit[highlightProperty]['title']['value'];
      break;

    case 'scripture-verse':
      highlightObject['translation_aurobindo_english'] = hit[highlightProperty]['translation_aurobindo_english']['value'];
      break;

    default:
      break;
  }

  return highlightObject;
}

function parseHitAndCreateHighlightObject(highlightResult) {
  const highlightObject = {};

  for (const [recordKey, matchingObj] of Object.entries(highlightResult)) {
    for (const [matchingObjKey, value] of Object.entries(matchingObj)) {
      if (typeof value === 'object') {
        for (const [valueKey, subValue] of Object.entries(value)) {
          if (valueKey === 'matchLevel' && subValue === 'full') {
            if (highlightObject[recordKey] !== 'object') {
              highlightObject[recordKey] = {};
            }

            if (highlightObject[recordKey][matchingObjKey] !== 'object') {
              highlightObject[recordKey][matchingObjKey] = {};
            }

            highlightObject[recordKey][matchingObjKey] = value['value'];
          }
        }

        continue;
      }

      if (matchingObjKey === 'matchLevel' && value === 'full') {
        if (highlightObject[recordKey] !== 'object') {
          highlightObject[recordKey] = {};
        }

        highlightObject[recordKey] = matchingObj['value'];
      }
    }   
  }

  return highlightObject;
}

/**
 * Find an highlighted attribute given an `attribute` and an `highlightProperty`, parses it,
 * and provided an array of objects with the string value and a boolean if this
 * value is highlighted.
 *
 * In order to use this feature, highlight must be activated in the configuration of
 * the index. The `preTag` and `postTag` attributes are respectively highlightPreTag and
 * highlightPostTag in Algolia configuration.
 *
 * @param {string} preTag - string used to identify the start of an highlighted value
 * @param {string} postTag - string used to identify the end of an highlighted value
 * @param {string} highlightProperty - the property that contains the highlight structure in the results
 * @param {string} attribute - the highlighted attribute to look for
 * @param {object} hit - the actual hit returned by Algolia.
 * @return {object[]} - An array of {value: string, isHighlighted: boolean}.
 */
export function parseAlgoliaHit({
  preTag = '<em>',
  postTag = '</em>',
  highlightProperty,
  hit,
  indexName
}) {
  if (!hit) throw new Error('`hit`, the matching record, must be provided');

  let highlightObject = parseHitAndCreateHighlightObject(hit[highlightProperty]);

  highlightObject = addMandatoryFields({
    indexName,
    highlightObject,
    hit,
    highlightProperty
  })

  highlightObject = omit(highlightObject, ['slug']);

  highlightObject = parseHighlightedAttributes({
    indexName,
    highlightObject,
    preTag,
    postTag
  })

  return highlightObject;
}