export default
`query musicBookTags($language: Language!) {
  musicBookTags(language: $language, first: 100) {
    nodes {
      id
      name
    }
  }
}

`
