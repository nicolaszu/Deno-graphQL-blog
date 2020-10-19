import {
  gql,
} from "./deps.ts";

const types = (gql as any)`
  scalar Date
  scalar URL
  scalar Void
  scalar PostType

  type User {
    id: ID!
    fName: String
    lName: String
    email: String
  }
  
  type Post {
    id: ID
    type: PostType
    title: String
    author: String
    htmlContent: String
    urlContent:URL
    dateCreated: Date
    dateModified: Date
    tags: [String]
    description : String
    coverImage: String
  }

  input PostInput {
    type:PostType
    title: String
    author: String
    htmlContent: String
    urlContent: URL
    dateCreated: Date
    description: String
    tags: [String]
    coverImage: String
  }
  
  type PostsResult{
    posts: [Post]
    totalCount: Int
  }

  type Query {
    post(id: ID): Post
    posts(limit: Int, offset: Int): PostsResult
    searchPosts(limit: Int, offset: Int, filter: String): PostsResult
  }

  type Mutation {
    addPost(input: PostInput): Post!
    deletePost(id: ID): ID
    editPost(input: PostInput, id:ID): Post!
    login (email: String!, password: String!): String
    signup (fName:String!, lName:String!, email: String!, password: String!): String
  }
`;

export default types;
