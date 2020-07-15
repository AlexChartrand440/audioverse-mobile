export default
`query sponsors($language: Language!, $afterCursor: String) {
  sponsors(
    language: $language
    first: 25
    after: $afterCursor
    orderBy: [{ field: TITLE, direction: ASC }]
  ) {
    nodes {
      id
      title
      description
      logoImage {
        url(size: 86)
      }
      logoImage256: logoImage {
        url(size: 256)
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`
