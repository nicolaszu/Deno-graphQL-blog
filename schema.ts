import {
  gql,
} from "https://deno.land/x/oak_graphql/mod.ts";

const types = (gql as any)`
  scalar Date

  type Post {
    id: ID
    title: String
    author: String
    htmlContent: String
    dateCreated: Date
    dateModified: Date
    tags: [String]
  }

  input PostInput {
    title: String
    author: String
    htmlContent: String
    dateCreated: Date
    dateModified: Date
    tags: [String]
  }

  type Query {
    post(id: ID): Post
    posts: [Post]
    tag(name: String): [Post]
  }

  type Mutation {
    addPost(input: PostInput): Post!
  }
`;

export default types;
