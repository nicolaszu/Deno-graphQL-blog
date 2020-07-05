import { MongoClient, init } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
const dbConnectionString: string = Deno.env.get("dbConnectionString")!;
const dbName: string = Deno.env.get("dbName")!;

class DB {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }
  connect() {
    const client = new MongoClient();
    client.connectWithUri(dbConnectionString);
    this.client = client;
  }
  get instance() {
    return this.client.database(dbName);
  }
}

const db = new DB(dbName, dbConnectionString);
db.connect();

export default db;
