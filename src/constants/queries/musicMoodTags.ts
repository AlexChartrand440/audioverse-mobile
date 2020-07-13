export default
`query musicMoodTags($language: Language!) {
  musicMoodTags(language: $language, first: 100) {
    nodes {
      id
      name
    }
  }
}

`
