import React from "react";
import { CardList, Card } from "./Card";
import { Main } from "./SearchBar";
import { InfiniteNewsSearchQuery } from "./EndlessSearch";

class App extends React.Component {
  render() {
    return (
      <InfiniteNewsSearchQuery>
        {({ articles = [] }) => (
          <Main>
            <CardList>
              {articles.map(({ title, urlToImage, url, content }, i) => (
                <Card
                  key={i}
                  title={title}
                  url={url}
                  img={urlToImage}
                  body={content}
                />
              ))}
            </CardList>
          </Main>
        )}
      </InfiniteNewsSearchQuery>
    );
  }
}

export default App;
