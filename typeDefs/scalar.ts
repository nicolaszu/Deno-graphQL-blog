import DateScalar from "./customScalars/DateScalar.ts";
import {
  gql,
} from "https://deno.land/x/oak_graphql/mod.ts";

const types = (gql as any)`

  scalar Date
`;
const resolvers = {
  Date: DateScalar,
};

export default {
  types,
  resolvers,
};
