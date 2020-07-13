export default
`query audiobible($id: ID!) {
  audiobible(id: $id) {
    books {
      id
      title
    }
  }
}
`
