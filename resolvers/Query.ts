import db from "../config/db.ts";

const dbPosts = db.instance.collection("posts");
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

export const Query = {
  post: async (parent: any, { id }: any, context: any, info: any) => {
    const postId = ObjectId(id);
    const post = await dbPosts.findOne({ "_id": postId });
    return { ...post, id };
  },

  posts: async (
    parent: any,
    { limit, offset }: any,
    context: any,
    info: any,
  ) => {
    const limitClause = limit ? { $limit: limit } : ""; // if zero return all
    const allPosts = await dbPosts.aggregate(
      [
        {
          $sort: {
            dateCreated: -1,
          },
        },
        { $skip: offset },
        limitClause,
      ],
    );
    let resultPosts = allPosts.map((post: any) => {
      const { _id: { "\$oid": id } } = post;
      post.id = id;
      return post;
    });
    let resultCount = dbPosts.count({});
    return { posts: resultPosts, totalCount: resultCount };
  },
  searchPosts: async (
    parent: any,
    { limit, offset, filter }: any,
    context: any,
    info: any,
  ) => {
    try {
      if (!filter) {
        return { posts: [], totalCount: 0 };
      }
      const limitClause = limit ? { $limit: limit } : ""; // if zero return all
      const searchPosts: any = await dbPosts.aggregate([
        {
          $search: {
            "text": {
              "query": filter,
              "path": ["title", "author", "tags"],
            },
          },
        },
        {
          $facet: { //facet used to return total count for pagination
            count: [{ $count: "count" }],
            results: [{ $skip: offset }, limitClause],
          },
        },
      ]);
      let resultPosts = searchPosts[0].results.map((post: any) => {
        const { _id: { "\$oid": id } } = post;
        post.id = id;
        return post;
      });
      let resultCount = searchPosts[0].count[0].count; //accessing count returned by mongo
      return { posts: resultPosts, totalCount: resultCount };
    } catch (e) {
      return { posts: [], totalCount: 0 };
    }
  },
};
