import {
  gql,
} from "https://deno.land/x/oak_graphql/mod.ts";

const types = (gql as any)`
  scalar Date
  scalar URL
  scalar Void

  type Post {
    id: ID
    title: String
    author: String
    htmlContent: String
    dateCreated: Date
    dateModified: Date
    tags: [String]
    description : String
    coverImage: String
  }

  input PostInput {
    title: String
    author: String
    htmlContent: String
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
    tag(name: String): [Post]
    searchPosts(limit: Int, offset: Int, filter: String): PostsResult
  }

  type Mutation {
    addPost(input: PostInput): Post!
    deletePost(id: ID): ID
    editPost(input: PostInput, id:ID): Post!
  }
`;

export default types;
