import React from "react";
import { NewsSearchQuery, InfiniteNewsScroller } from "./NewsSearch";
import { NewsObject } from "./NewsSearch";
import { compose, withState } from "recompose";
import {
  SearchBar,
  SearchInput,
  SearchSelect,
  SearchSubmit
} from "./SearchBar";
export const EndlessSearch: React.SFC<infStateProps> = ({
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
        <SearchSubmit color="#df2d29" aria-label="Search" />
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
export interface infStateProps {
  getInput: string;
  setInput: (state: string) => string;
  getQuery: string;
  setQuery: (state: string) => string;
  getSelect: string;
  setSelect: (state: string) => string;
  children: (
    props: {
      articles: NewsObject[];
    }
  ) => React.ReactNode;
}
export const SEARCH_SELECT_OPTIONS = [
  { value: "publishedAt", label: "Published" },
  { value: "relevancy", label: "Relevancy" },
  { value: "popularity", label: "Popularity" }
];
interface NewsSearchRenderProp {
  children: (
    articles: {
      articles: NewsObject[];
    }
  ) => React.ReactNode;
}
export const InfiniteNewsSearchQuery = compose<
  infStateProps,
  NewsSearchRenderProp
>(
  withState("getQuery", "setQuery", "bitcoin"),
  withState("getInput", "setInput", "bitcoin"),
  withState("getSelect", "setSelect", "publishedAt")
)(EndlessSearch);
