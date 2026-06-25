import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in .env");
}

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