import {
  gql,
} from "https://deno.land/x/oak_graphql/mod.ts";

const postType = (gql as any)`

  type Post{
      id: ID
      title: String
      author: String
      htmlContent: String
      dateCreated: Date
      dateModified: Date
      tags: [String]
    }

  input PostInput{
    title: String
    author: String
    htmlContent: String
    dateCreated: Date
    dateModified: Date
    tags: [String]
  }
`;

export default postType;
