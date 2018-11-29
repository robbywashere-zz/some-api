import gql from "graphql-tag";
const NewsFragment = gql`
  fragment NewsFragment on NewsObject {
    source @type(name: "ArticleSource") {
      id
      name
    }
    author
    title
    description
    url
    urlToImage
    content
    publishedAt
  }
`;

export const NEWS_SEARCH_QUERY = gql`
  query NewsSearch(
    $q: String!
    $page: Int!
    $pageSize: Int!
    $sortBy: String!
  ) {
    response(q: $q, page: $page, sortBy: $sortBy, pageSize: $pageSize)
      @rest(type: "NewsObjectPayload", path: "everything?{args}") {
      totalResults
      articles @type(name: "NewsObject") {
        ...NewsFragment
      }
    }
  }
  ${NewsFragment}
`;
