import {
  GraphQLScalarType,
  Kind,
} from "../../deps.ts";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value: string) {
    const dateType = new Date(value);
    return dateType; // value from the client
  },
  serialize(value: Date) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});
