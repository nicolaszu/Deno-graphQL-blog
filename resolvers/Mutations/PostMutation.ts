import db from "../../config/db.ts";

const dbPosts = db.instance.collection("posts");

export const PostMutation = {
  addPost: async (
    parent: any,
    {
      input:{title, author, htmlContent, dateCreated,tags, coverImage, description},
    }: any,
    context: any,
    info: any,
  ) => {
    const { "\$oid":id } = await dbPosts.insertOne(
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
};
