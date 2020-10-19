import db from "../../config/db.ts";
import { ObjectId } from "../../deps.ts";

const dbPosts = db.instance.collection("posts");

export const PostMutation = {
  addPost: async (
    parent: any,
    {
      input: {
        title,
        type,
        author,
        htmlContent,
        urlContent,
        dateCreated,
        tags,
        coverImage,
        description,
      },
    }: any,
    context: any,
    info: any,
  ) => {
    const { $oid: id } = await dbPosts.insertOne({
      title,
      type,
      author,
      htmlContent,
      urlContent,
      dateCreated,
      tags,
      coverImage,
      description,
    });
    return {
      title,
      type,
      author,
      htmlContent,
      urlContent,
      dateCreated,
      tags,
      id,
      coverImage,
      description,
    };
  },
  deletePost: async (parent: any, { id }: any, context: any, info: any) => {
    const postId = ObjectId(id);
    await dbPosts.deleteOne({ _id: postId });
    return id;
  },
  editPost: async (
    parent: any,
    {
      input: {
        title,
        type,
        author,
        htmlContent,
        urlContent,
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
          type,
          author,
          htmlContent,
          urlContent,
          tags,
          coverImage,
          description,
        },
      },
    );
    if (coverImage === "Delete") {
      await dbPosts.updateOne(
        { _id: { $eq: postId } },
        {
          $unset: {
            coverImage,
          },
        },
      );
    }
    const post = await dbPosts.findOne({ _id: postId });
    return { ...post, id };
  },
};
