import React from "react";
import Query from "../../components/Query";
import BOOKS_QUERY from "../../queries/book/books";

const Home = () => {
  return (
    <div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Query query={BOOKS_QUERY}>
            {({ data: { books } }) => {
              return books.data.map(book => (
                <div>{book.attributes.title}</div>
              ));
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Home;
