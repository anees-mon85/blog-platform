import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { JWT_SECRET } from "@/util/auth";
import jwt from "jsonwebtoken";
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
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
      return jwt.sign({ userId: user.id }, JWT_SECRET);
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      return jwt.sign({ userId: user.id }, JWT_SECRET);
    },
    createPost: async (
      _: any,
      { title, content }: { title: string; content: string },
      { req, validateToken }
    ) => {
      const userId = await validateToken(req);
      if (!userId) throw new Error("Unauthorized");
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
