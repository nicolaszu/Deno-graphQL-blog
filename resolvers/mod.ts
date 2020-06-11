import { Query } from "./Query.ts";
import { PostMutation } from "./Mutations/PostMutation.ts";
import { DateScalar } from "./customScalars/DateScalar.ts";
export default {
  Query,
  Mutation: {
    ...PostMutation,
  },
  Date: DateScalar,
};
