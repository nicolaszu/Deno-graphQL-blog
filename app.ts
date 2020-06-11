import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  applyGraphQL,
  gql,
} from "https://deno.land/x/oak_graphql/mod.ts";

import {
  GraphQLScalarType,
  Kind,
} from "https://cdn.pika.dev/graphql@^15.0.0";

import { MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();
const DBConnectionString =
  "mongodb+srv://graphqlUser:Test1234@graphql-blog-wtf1c.azure.mongodb.net/blog?retryWrites=true&w=majority";
client.connectWithUri(DBConnectionString);

const db = client.database("blog");
const posts = db.collection("posts");

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const types = (gql as any)`

  scalar Date

  type Blog{
    id: ID
    title: String
    author: String
    htmlContent: String
    dateCreated: Date
    dateModified: Date
    tags: [String]
  }

  input BlogInput{
    title: String
    author: String
    htmlContent: String
    dateCreated: Date
    dateModified: Date
    tags: [String]
  }

  type Query{
    blog(id:ID): Blog
    blogs: [Blog]
    tag(name:String): [Blog]
  }

  type Mutation{
    addBlog(input:BlogInput ): Blog!
  }
`;

const resolvers = {
  Query: {
    blog: async (parent: any, { id }: any, context: any, info: any) => {
      const postId = ObjectId(id);
      const post = await posts.findOne(postId);
      return { ...post, id };
    },
    blogs: async (parent: any, {}: any, context: any, info: any) => {
      const allPosts = await posts.find({});
      return allPosts.map((post: any) => {
        const { _id:{ "\$oid":id } } = post;
        post.id = id;
        return post;
      });
    },
    tag: async (parent: any, { name }: any, context: any, info: any) => {
      const allPosts = await posts.find({tags:name});
      return allPosts.map((post: any) => {
        const { _id:{ "\$oid":id } } = post;
        post.id = id;
        return post;
      });
    },
  },
  Mutation: {
    addBlog: async (
      parent: any,
      { input:{title, author, htmlContent, dateCreated,dateModified,tags} }:
        any,
      context: any,
      info: any,
    ) => {
      const { "\$oid":id } = await posts.insertOne(
        { title, author, htmlContent, dateCreated, dateModified, tags },
      );
      return {
        title,
        author,
        htmlContent,
        dateCreated,
        dateModified,
        tags,
        id,
      };
    },
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value: string) {
      return new Date(value); // value from the client
    },
    serialize(value: Date) {
      console.log(value.getTime());
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast: any) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

const GraphQLService = await applyGraphQL({
  typeDefs: types,
  resolvers: resolvers,
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server running");
await app.listen({ port: 8080 });
