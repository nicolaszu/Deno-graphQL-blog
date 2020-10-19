import {
  GraphQLScalarType,
  GraphQLError,
  Kind,
} from "../../deps.ts";

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
      throw GraphQLError(
        `Can only Process LINK and WRITE type, not ${type}`,
      );
    }
    throw GraphQLError(
      `Can only validate strings as URLs but got a: ${ast.kind}`,
    );
  },
});
