export default
`query presenters($language: Language!, $afterCursor: String) {
  presenters(
    language: $language
    first: 1000
    after: $afterCursor
    orderBy: [{ field: NAME, direction: ASC }]
  ) {
    nodes {
      id
      name
      photo86: photo {
        url(size: 86)
      }
      photo256: photo {
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
