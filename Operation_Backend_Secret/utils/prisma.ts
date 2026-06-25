import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";
import { log } from "node:console";

dotenv.config();

// Creer le client Neon adapter
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

// Creer le client Prisma avec adapteur Neon
const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

export default prisma;
