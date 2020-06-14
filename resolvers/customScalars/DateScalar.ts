import {
  GraphQLScalarType,
  Kind,
} from "https://cdn.pika.dev/graphql@^15.0.0";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value: string) {
    return new Date(value); // value from the client
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