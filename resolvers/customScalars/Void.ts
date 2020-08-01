import {
  GraphQLScalarType,
} from "https://cdn.pika.dev/graphql@^15.0.0";

export const Void = new GraphQLScalarType({
  name: "Void",
  description: "Represents NULL values",
  serialize() {
    return null;
  },
  parseValue() {
    return null;
  },
  parseLiteral() {
    return null;
  },
});
