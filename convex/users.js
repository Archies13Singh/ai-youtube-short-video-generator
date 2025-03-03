import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUsers = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    photoURL: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the user already exists
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field('email'),args.email))
      .collect();

    if (!users[0]?.email) {
      const userData = {
        name: args?.name,
        email: args?.email,
        photoURL: args?.photoURL,
        credits: 3,
      }
      // If no user exists, insert a new user record
      const result = await ctx.db.insert("users", userData);

      return userData;
    }

    return users[0]; // Return the existing user
  },
});
