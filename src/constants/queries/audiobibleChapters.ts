export default `query audiobible($id: ID!, $bookId: ID!) {
  audiobible(id: $id) {
    book(id: $bookId) {
      chapters {
        id
        title
        url
      }
    }
  }
}
`;