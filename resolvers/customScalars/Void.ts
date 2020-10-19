import {
  GraphQLScalarType,
} from "../../deps.ts";

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
