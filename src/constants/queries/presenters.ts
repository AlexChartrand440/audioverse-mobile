export default
`query presenters($language: Language!, $afterCursor: String) {
  presenters(
    language: $language
    first: 1500
    after: $afterCursor
    orderBy: [{ field: NAME, direction: ASC }]
  ) {
    nodes {
      id
      name
      description
      photo86: photoWithFallback {
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
