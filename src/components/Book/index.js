import React from "react";
import Query from "../Query";
import { Link } from "react-router-dom";

import BOOKS_QUERY from "../../queries/book/books";

const Book = () => {
  return (
    <div>
      <Query query={BOOKS_QUERY} id={null}>
        {({ data: { books } }) => {
          return (
            <div>
              <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-left">
                  <ul className="uk-navbar-nav">
                    <li>
                      <Link to="/">Kailasa Vedabase</Link>
                    </li>
                  </ul>
                </div>

                <div className="uk-navbar-right">
                  <ul className="uk-navbar-nav">
                    {books.data.map((book) => {
                      return (
                        <li key={book.attributes.slug}>
                          <Link
                            to={`/book/${book.attributes.slug}`}
                            className="uk-link-reset"
                          >
                            {book.attributes.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Book;