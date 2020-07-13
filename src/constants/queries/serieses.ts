export default
`query serieses($language: Language!, $afterCursor: String) {
  serieses(
    language: $language
    first: 25
    after: $afterCursor
    orderBy: [{ field: TITLE, direction: ASC }]
  ) {
    nodes {
      id
      title
      logoImage {
        url(size: 86)
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`
