export default
`query userPlaylists($language: Language!) {
  me {
    user {
      playlists(language: $language) {
        nodes {
          id
          title
        }
      }
    }
  }
}`
