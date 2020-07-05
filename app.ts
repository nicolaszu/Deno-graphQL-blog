import { Application } from "https://deno.land/x/oak/mod.ts";
import {
  applyGraphQL,
} from "https://deno.land/x/oak_graphql/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import resolvers from "./resolvers/mod.ts";
import types from "./schema.ts";
import "https://deno.land/x/dotenv/load.ts";
import "https://deno.land/x/dotenv/load.ts";
const app = new Application();
const port = Number(Deno.env.get("port"));
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

const GraphQLService = await applyGraphQL({
  typeDefs: types,
  resolvers: resolvers,
});

app.use(oakCors());
app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server running");
await app.listen({ port });
