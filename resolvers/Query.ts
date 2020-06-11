import db from "../config/db.ts";

const dbPosts = db.instance.collection("posts");
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

export const Query = {
  post: async (parent: any, { id }: any, context: any, info: any) => {
    const postId = ObjectId(id);
    const post = await dbPosts.findOne(postId);
    return { ...post, id };
  },
  posts: async (parent: any, {}: any, context: any, info: any) => {
    const allPosts = await dbPosts.find({});
    return allPosts.map((post: any) => {
      const { _id:{ "\$oid":id } } = post;
      post.id = id;
      return post;
    });
  },
  tag: async (parent: any, { name }: any, context: any, info: any) => {
    const allPosts = await dbPosts.find({ tags: name });
    return allPosts.map((post: any) => {
      const { _id:{ "\$oid":id } } = post;
      post.id = id;
      return post;
    });
  },
};
