import React, { Component } from "react";
import styled, { StyledComponent } from "styled-components";
import { NewsSearchQuery, InfiniteNewsScroller } from "./NewsSearch";
import { NewsObject } from "./NewsSearch";
import { compose, withState } from "recompose";
import { ApolloProvider } from "react-apollo";
import { client } from "./graphql/client";

const SearchBar = styled.div`
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  position: relative;
  top: 0;
  background: #353535;
  vertical-align: middle;
  padding-left: 3rem;
  * {
    margin-right: 1rem;
  }
`;

interface SearchInputProps {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
const SearchInput = styled<React.SFC<SearchInputProps>>(props => (
  <input placeholder="some search term" type="text" {...props} />
))`
  width: 36rem;
  max-width: 50%;
  background: #252525;
  font-size: 1.25rem;
  color: #fff;
  border: 0;
  padding: 0.75rem;
`;

const Button = styled.button`
  width: 12rem;
  text-align: center;
  padding: 0.75rem;
  color: #fff;
  background: ${p => p.color};
  border: 0;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;
`;

const Link = styled(Button).attrs({ as: "a" })`
  text-decoration: none;
` as StyledComponent<"a", any, {}, never>;

interface SearchSelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any;
}
const SearchSelect = styled<React.SFC<SearchSelectProps>>(
  ({ options, ...props }) => (
    <select {...props}>
      {options.map(({ value, label }: { value: string; label: string }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  )
)`
  background: #252525;
  width: 12rem;
  font-size: 1.25rem;
  color: #fff;
  border: 0;
  height: 3rem;
  border: 0;
`;

const Main = styled(props => <div {...props} />)`
  background: #e8e7e7;
  padding: 3rem;
  padding-top: 0;
  position: relative;
  left: 0;
  bottom: 0;
  right: 0;
`;

const CardList = styled(({ children, ...props }) => (
  <div {...props}>{children}</div>
))`
  text-align: center;
  display: grid;
  padding-top: 3rem;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const CardImage = styled(({ img, ...props }) => <div {...props} />)`
  background-image: url("${p => p.img}");
  background-size: cover;
  height: 300px;
`;

const CardTitle = styled(props => <h2 {...props} />)`
  padding: 0;
  margin: 0;
`;
const CardContent = styled(({ title, body, ...props }) => (
  <div {...props}>
    <CardTitle>{title}</CardTitle>
    <p>{body}</p>
  </div>
))``;
const CardBody = styled.div`
  text-align: left;
  padding: 3rem 3rem 3rem 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export interface CardProps {
  title: string;
  img: string;
  body: string;
  url: string;
}

const Card = styled<React.SFC<CardProps>>(
  ({ img, body, url, title, ...props }) => (
    <div {...props}>
      <CardImage img={img} />
      <CardBody>
        <CardContent title={title} body={body} />
        <Link color="#252525" href={url}>
          Read More
        </Link>
      </CardBody>
    </div>
  )
)`
  background: #fff;
  display: flex;
  flex-direction: column;
`;

interface infStateProps {
  getInput: string;
  setInput: (state: string) => string;
  getQuery: string;
  setQuery: (state: string) => string;
  getSelect: string;
  setSelect: (state: string) => string;
  children: (props: { articles: NewsObject[] }) => React.ReactNode;
}

const SEARCH_SELECT_OPTIONS = [
  { value: "publishedAt", label: "Published" },
  { value: "relevancy", label: "Relevancy" },
  { value: "popularity", label: "Popularity" }
];
export const InfiniteNewsSearchQueryComponent: React.SFC<infStateProps> = ({
  getInput,
  setInput,
  setQuery,
  getQuery,
  setSelect,
  getSelect,
  children
}) => (
  <>
    <SearchBar>
      <form
        style={{ whiteSpace: "nowrap" }}
        onSubmit={e => {
          e.preventDefault();
          setQuery(getInput);
        }}
      >
        <SearchInput
          onChange={e => setInput(e.currentTarget.value)}
          value={getInput}
        />
        <SearchSelect
          onChange={e => setSelect(e.currentTarget.value)}
          value={getSelect}
          options={SEARCH_SELECT_OPTIONS}
        />
        <Button color="#df2d29">Search</Button>
      </form>
    </SearchBar>
    <NewsSearchQuery q={getQuery} sortBy={getSelect}>
      {props => (
        <InfiniteNewsScroller {...props}>
          {({ response: { articles } }) => children({ articles })}
        </InfiniteNewsScroller>
      )}
    </NewsSearchQuery>
  </>
);

interface NewsSearchRenderProp {
  children: (articles: { articles: NewsObject[] }) => React.ReactNode;
}

export const InfiniteNewsSearchQuery = compose<
  infStateProps,
  NewsSearchRenderProp
>(
  withState("getQuery", "setQuery", "bitcoin"),
  withState("getInput", "setInput", "bitcoin"),
  withState("getSelect", "setSelect", "publishedAt")
)(InfiniteNewsSearchQueryComponent);

const appClient = client();
class App extends Component {
  render() {
    return (
      <ApolloProvider client={appClient}>
        <div>
          <InfiniteNewsSearchQuery>
            {({ articles = [] }) => (
              <Main>
                <CardList>
                  {articles.map(({ title, urlToImage, url, content }) => (
                    <Card
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
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
