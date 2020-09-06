import {
  GraphQLScalarType,
  GraphQLError,
  Kind,
} from "https://cdn.pika.dev/graphql@^15.0.0";

export const PostType = new GraphQLScalarType({
  name: "PostType",
  description: "Type of Post (written,link...)",
  parseValue(value: string) {
    return value;
  },
  serialize(value: string) {
    return value;
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.STRING) {
      const type = ast.value.toUpperCase();
      if (type === "LINK" || type === "WRITE") {
        return type;
      }
      throw new GraphQLError(
        `Can only Process LINK and WRITE type, not ${type}`,
      );
    }
    throw new GraphQLError(
      `Can only validate strings as URLs but got a: ${ast.kind}`,
    );
  },
});
