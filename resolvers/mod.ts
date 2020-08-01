import { Query } from "./Query.ts";
import { PostMutation } from "./Mutations/PostMutation.ts";
import { DateScalar } from "./customScalars/DateScalar.ts";
import { URLScalar } from "./customScalars/URL.ts";
import { Void } from "./customScalars/Void.ts";
export default {
  Query,
  Mutation: {
    ...PostMutation,
  },
  Date: DateScalar,
  URL: URLScalar,
  Void: Void,
};
