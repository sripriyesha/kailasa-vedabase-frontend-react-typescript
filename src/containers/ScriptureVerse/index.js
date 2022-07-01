import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Cookies from 'js-cookie';

import Layout from "../../components/Layout";
import Query from "../../components/Query";
import SCRIPTURE_VERSE_QUERY from "../../queries/scripture-verse/scripture-verse";

const ScriptureVerse = () => {
  const { slug } = useParams();

  const devanagarieCookie = Cookies.get('vedabase_devanagari');
  const [ devanagariShown, setDevanagariShown] = useState(
    devanagarieCookie === 'on'
    || devanagarieCookie === undefined
  );

  const verseTextCookie = Cookies.get('vedabase_verse-text');
  const [ verseTextShown, setVerseTextShown] = useState(
    verseTextCookie === 'on'
    || verseTextCookie === undefined
  );

  const glossaryCookie = Cookies.get('vedabase_glossary');
  const [ glossaryShown, setGlossaryShown] = useState(
    glossaryCookie === 'on'
    || glossaryCookie === undefined
  );

  const englishTranslationCookie = Cookies.get('vedabase_translation-english');
  const [ englishTranslationShown, setEnglishTranslationShown] = useState(
    englishTranslationCookie === 'on'
    || englishTranslationCookie === undefined
  );

  const hindiTranslationCookie = Cookies.get('vedabase_translation-hindi');
  const [ hindiTranslationShown, setHindiTranslationShown] = useState(
    hindiTranslationCookie === 'on'
    || hindiTranslationCookie === undefined
  );

  const toggleDevanagari = useCallback(() => {
    Cookies.set('vedabase_devanagari', !devanagariShown ? 'on' : 'off');
    setDevanagariShown(!devanagariShown);
  }, [devanagariShown]);
  
  const toggleVerseText = useCallback(() => {
    Cookies.set('vedabase_verse-text', !verseTextShown ? 'on' : 'off');
    setVerseTextShown(!verseTextShown);
  }, [verseTextShown]);
  
  const toggleGlossary = useCallback(() => {
    Cookies.set('vedabase_glossary', !glossaryShown ? 'on' : 'off');
    setGlossaryShown(!glossaryShown);
  }, [glossaryShown]);

  const toggleEnglishTranslation = useCallback(() => {
    Cookies.set('vedabase_translation-english', !englishTranslationShown ? 'on' : 'off');
    setEnglishTranslationShown(!englishTranslationShown);
  }, [englishTranslationShown]);

  const toggleHindiTranslation = useCallback(() => {
    Cookies.set('vedabase_translation-hindi', !hindiTranslationShown ? 'on' : 'off');
    setHindiTranslationShown(!hindiTranslationShown);
  }, [hindiTranslationShown]);

  return (
    <Query query={SCRIPTURE_VERSE_QUERY} slug={slug}>
      {({ data: { scriptureVerses } }) => {
        const scriptureVerse = scriptureVerses.data[0];
        const scripture = scriptureVerse.attributes.scripture.data;
        
        return (
          <Layout>
            <Row>
              <Col sm={12}>
                <Link to={`/scripture/${scripture.attributes.slug}`}>
                  <h1>{scripture.attributes.title}</h1>
                </Link>
              </Col>
            </Row>
            <button
              className={"btn-toggle" + (devanagariShown ? " on": " off")}
              onClick={toggleDevanagari}
            >
              <i className={"fa fa-lg" + (
                devanagariShown ? " fa-check-circle-o" : " fa-ban"
              )}></i>              
              {' Devanagari'}
            </button>
            <button
              className={"btn-toggle" + (verseTextShown ? " on": " off")}
              onClick={toggleVerseText}
            >
              <i className={"fa fa-lg" + (
                verseTextShown ? " fa-check-circle-o" : " fa-ban"
              )}></i>              
              {' Verse Text'}
            </button>
            <button
              className={"btn-toggle" + (glossaryShown ? " on": " off")}
              onClick={toggleGlossary}
            >
              <i className={"fa fa-lg" + (
                glossaryShown ? " fa-check-circle-o" : " fa-ban"
              )}></i>              
              {' Glossary'}
            </button>
            <button
              className={"btn-toggle" + (englishTranslationShown ? " on": " off")}
              onClick={toggleEnglishTranslation}
            >
              <i className={"fa fa-lg" + (
                englishTranslationShown ? " fa-check-circle-o" : " fa-ban"
              )}></i>              
              {' English translation'}
            </button>
            <button
              className={"btn-toggle" + (hindiTranslationShown ? " on": " off")}
              onClick={toggleHindiTranslation}
            >
              <i className={"fa fa-lg" + (
                hindiTranslationShown ? " fa-check-circle-o" : " fa-ban"
              )}></i>              
              {' Hindi translation'}
            </button>
            <Row>
              <p>{scriptureVerse.attributes.sutra_number}</p>
              {
                devanagariShown
                &&
                <p>
                  {scriptureVerse.attributes.sanskrit_sutra}
                </p>
              }
              {
                verseTextShown
                &&
                <p>
                  {scriptureVerse.attributes.transliteration}
                </p>
              }
              {
                glossaryShown
                &&
                <p>
                  {scriptureVerse.attributes.glossary}
                </p>
              }
              {
                englishTranslationShown
                &&
                <p>
                  {scriptureVerse.attributes.translation_aurobindo_english}
                </p>
              }
              {
                hindiTranslationShown
                &&
                <p>
                  {scriptureVerse.attributes.translation_aurobindo_hindi}
                </p>
              }
            </Row>
          </Layout>
        );
      }}
    </Query>
  );
};

export default ScriptureVerse;
