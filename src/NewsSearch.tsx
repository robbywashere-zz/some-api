import { Query, QueryResult } from "react-apollo";
import { NEWS_SEARCH_QUERY } from "./graphql/queries";
import InfiniteScroll from "react-infinite-scroller";
import React from "react";

export type NewsSearchResponseType = QueryResponseType<NewsObject[]>;

export interface NewsObject {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
  publishedAt: string;
}

export interface QueryResponseType<T> {
  response: {
    articles: T;
    totalResults: number;
  };
}

export interface NewsSearchVariables {
  q?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
}
export class NewsSearchQueryComponent extends Query<
  NewsSearchResponseType,
  NewsSearchVariables
> {}

export interface NewsSearchProps extends NewsSearchVariables {
  children: (
    props: QueryResult<NewsSearchResponseType, NewsSearchVariables>
  ) => React.ReactNode;
}

export const NewsSearchQuery: React.SFC<NewsSearchProps> = ({
  q = "",
  page = 1,
  pageSize = 20,
  sortBy = "publishedAt",
  children
}) => (
  <NewsSearchQueryComponent
    query={NEWS_SEARCH_QUERY}
    variables={{
      q,
      page,
      pageSize,
      sortBy
    }}
  >
    {props => children(props)}
  </NewsSearchQueryComponent>
);

export interface InfiniteScrollerProps<T> extends QueryResult<T> {
  children: (props: T) => React.ReactNode;
}

export interface InfiniteScrollerType<T = any[]>
  extends React.SFC<InfiniteScrollerProps<QueryResponseType<T>>> {}

export const InfiniteScroller: InfiniteScrollerType = ({
  data,
  fetchMore,
  children,
  variables
}) => {
  if (!data || Object.entries(data).length === 0) return null;
  const { articles: collection, totalResults } = data.response;
  return (
    <>
      <InfiniteScroll
        loader={<div>Loading ...</div>}
        hasMore={variables.page * variables.pageSize < totalResults}
        loadMore={() => {
          return fetchMore({
            variables: {
              page: variables.page + 1
            },
            updateQuery: (prev, { fetchMoreResult }) => ({
              ...prev,
              response: {
                ...prev.response,
                articles: !fetchMoreResult
                  ? Array.from(new Set([...collection]))
                  : Array.from(
                      new Set([
                        ...prev.response.articles,
                        ...fetchMoreResult.response.articles
                      ])
                    )
              }
            })
          });
        }}
      >
        {children(data)}
      </InfiniteScroll>
    </>
  );
};

export const InfiniteNewsScroller = InfiniteScroller as InfiniteScrollerType<
  NewsObject[]
>;
