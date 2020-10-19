import {
  GraphQLScalarType,
  GraphQLError,
  Kind,
} from "../../deps.ts";

export const URLScalar = new GraphQLScalarType({
  name: "URL",
  description:
    "A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.",
  parseValue: (value: string) => new URL(value.toString()),
  serialize(value: URL) {
    return new URL(value.toString()).toString();
  },
  parseLiteral(ast: any) {
    if (ast.kind !== Kind.STRING) {
      throw GraphQLError(
        `Can only validate strings as URLs but got a: ${ast.kind}`,
      );
    }

    return new URL(ast.value.toString());
  },
});
