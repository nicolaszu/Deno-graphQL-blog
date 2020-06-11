import db from "../../config/db.ts";

const dbPosts = db.instance.collection("posts");

export const PostMutation = {
  addPost: async (
    parent: any,
    { input:{title, author, htmlContent, dateCreated,dateModified,tags} }: any,
    context: any,
    info: any,
  ) => {
    const { "\$oid":id } = await dbPosts.insertOne(
      { title, author, htmlContent, dateCreated, dateModified, tags },
    );
    return {
      title,
      author,
      htmlContent,
      dateCreated,
      dateModified,
      tags,
      id,
    };
  },
};
