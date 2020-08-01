import db from "../../config/db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const dbPosts = db.instance.collection("posts");

export const PostMutation = {
  addPost: async (
    parent: any,
    {
      input: {
        title,
        author,
        htmlContent,
        dateCreated,
        tags,
        coverImage,
        description,
      },
    }: any,
    context: any,
    info: any,
  ) => {
    const { "\$oid": id } = await dbPosts.insertOne(
      {
        title,
        author,
        htmlContent,
        dateCreated,
        tags,
        coverImage,
        description,
      },
    );
    return {
      title,
      author,
      htmlContent,
      dateCreated,
      tags,
      id,
      coverImage,
      description,
    };
  },
  deletePost: async (
    parent: any,
    { id }: any,
    context: any,
    info: any,
  ) => {
    const postId = ObjectId(id);
    await dbPosts.deleteOne({ "_id": postId });
    return id;
  },
  editPost: async (
    parent: any,
    {
      input: {
        title,
        author,
        htmlContent,
        dateCreated,
        tags,
        coverImage,
        description,
      },
      id,
    }: any,
    context: any,
    info: any,
  ) => {
    const postId = ObjectId(id);
    await dbPosts.updateOne(
      { _id: { $eq: postId } },
      {
        $set: {
          title,
          author,
          htmlContent,
          tags,
          coverImage,
          description,
        },
      },
    );
    const post = await dbPosts.findOne({ "_id": postId });
    return { ...post, id };
  },
};
