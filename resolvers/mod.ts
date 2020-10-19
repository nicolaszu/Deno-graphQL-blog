import { Query } from "./Query.ts";
import { PostMutation } from "./Mutations/PostMutation.ts";
import { AuthMutation } from "./Mutations/AuthMutation.ts";
import { DateScalar } from "./customScalars/DateScalar.ts";
import { URLScalar } from "./customScalars/URL.ts";
import { Void } from "./customScalars/Void.ts";
import { PostType } from "./customScalars/PostType.ts";
export default {
  Query,
  Mutation: {
    ...PostMutation,
    ...AuthMutation,
  },
  Date: DateScalar,
  URL: URLScalar,
  Void,
  PostType,
};
