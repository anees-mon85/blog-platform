export const typeDefs = `#graphql
  type User {
    id: Int!
    email: String!
    createdAt: String!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    author: User!
    createdAt: String!
  }

  type Query {
    getPosts(page: Int, limit: Int): [Post!]!
    getPost(postId: Int!): Post
    searchPosts(keyword: String!, page: Int, limit: Int): [Post!]!
  }

  type Mutation {
    signup(email: String!, password: String!): String
    login(email: String!, password: String!): String
    createPost(title: String!, content: String!): Post
  }
`;
