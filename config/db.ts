import { MongoClient, init } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
const dbConnectionString =
  "mongodb+srv://graphqlUser:Test1234@graphql-blog-wtf1c.azure.mongodb.net/blog?retryWrites=true&w=majority";

const dbName = "blog";
let _db: any;

await init();

const connect = (): any => {
  const client = new MongoClient();
  client.connectWithUri(dbConnectionString);
  _db = client.database("dbName");
};
const getDatabase = (): any => {
  return _db;
};

export default db;
