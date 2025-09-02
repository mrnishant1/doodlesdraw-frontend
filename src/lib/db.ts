// import { PrismaClient } from "../node_modules/.prisma/client";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional: logs all queries, useful for dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
