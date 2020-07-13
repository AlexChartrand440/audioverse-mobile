// TODO: support pagination for the presenters list
export default
`query presenters($language: Language!, $afterCursor: String) {
  presenters(
    language: $language
    first: 2500
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
