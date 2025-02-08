import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    getPosts: async () => {
      return prisma.user.findMany();
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
      console.log("usreId", userId);
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
