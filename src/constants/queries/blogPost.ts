export default
`query blogPost($id: ID!) {
  blogPost(id: $id) {
    body
  }  
}
`
