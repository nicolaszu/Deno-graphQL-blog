import db from "../../config/db.ts";
import { ObjectId } from "../../deps.ts";
import {
  GQLError,
} from "../../deps.ts";
import { bcrypt } from "../../deps.ts";
import { validateJwt } from "../../deps.ts";

import {
  makeJwt,
  setExpiration,
} from "../../deps.ts";

import type{
  Jose,
  Payload,
} from "../../deps.ts";

import "https://deno.land/x/dotenv/load.ts";

const JWT_SECRET: string = Deno.env.get("JWT_SECRET")!;
const dbUsers = db.instance.collection("users");

export const AuthMutation = {
  login: async (
    parent: any,
    {
      email,
      password,
    }: any,
    context: any,
    info: any,
  ) => {
    const user: any = await dbUsers.findOne({ email: { $eq: email } });

    if (!user) {
      throw new GQLError(
        { type: "Authentication Error", detail: "somthing critical!" },
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new GQLError(
        { type: "Authentication Error", detail: "Incorrect Password" },
      );
    }
    return await generateJWT(user.id, user.email);
  },
  signup: async (
    parent: any,
    {
      fName,
      lName,
      email,
      password,
    }: any,
    context: any,
    info: any,
  ) => {
    const user = await dbUsers.findOne({ email: { $eq: email } });

    if (user) {
      throw new GQLError(
        { type: "Authentication Error", detail: "User exists" },
      );
    }
    const hashedPassword = await bcrypt.hash(password);
    const { $oid: id } = await dbUsers.insertOne({
      fName,
      lName,
      email,
      hashedPassword,
    });

    return await generateJWT(id, email);
  },
};

const generateJWT = async (id: any, email: string) => {
  const payload: Payload = {
    id,
    email,
    exp: setExpiration(60),
  };
  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  };
  return await makeJwt({ header, payload, key: JWT_SECRET });
};
