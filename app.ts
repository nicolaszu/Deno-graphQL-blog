import {
  Application,
  Router,
  
} from "./deps.ts";
import type {RouterContext} from "./deps.ts"
import {
  applyGraphQL,
} from "./deps.ts";
import { oakCors } from "./deps.ts";
import "https://deno.land/x/dotenv/load.ts";

import resolvers from "./resolvers/mod.ts";
import types from "./schema.ts";

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

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return {};
  },
});

app.use(oakCors());
app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server running");
await app.listen({ port });
