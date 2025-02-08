import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getPosts: async (
      _: any,
      { page = 1, limit = 10 }: { page: number; limit: number }
    ) => {
      return prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { author: true },
      });
    },
    getPost: async (_: any, { postId }: { postId: number }) => {
      console.log("postId", postId);
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          author: true,
        },
      });
      return post;
    },
    searchPosts: async (
      _: any,
      {
        keyword,
        page = 1,
        limit = 10,
      }: { keyword: string; page: number; limit: number }
    ) => {
      return prisma.post.findMany({
        where: { title: { contains: keyword } },
        skip: (page - 1) * limit,
        take: limit,
        include: { author: true },
      });
    },
  },
  Mutation: {
    signup: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await prisma.user.create({
        data: { email, password },
      });
      return `User Created ${user.id}`;
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || password != user.password) {
        throw new Error("Invalid credentials");
      }
      return `Logged In ${user.id}`;
    },
    createPost: async (
      _: any,
      {
        title,
        content,
        userId,
      }: { title: string; content: string; userId: number }
    ) => {
      return prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: { id: userId },
          },
        },
      });
    },
  },
};
