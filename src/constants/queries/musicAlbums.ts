export default
`query musicAlbums($language: Language!, $afterCursor: String) {
  musicAlbums(
    language: $language
    first: 25
    after: $afterCursor
    orderBy: [{ field: TITLE, direction: ASC }]
  ) {
    nodes {
      id
      title
      logoImage: logoImageWithFallback {
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
