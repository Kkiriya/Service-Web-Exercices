-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RECRUIT', 'AGENT', 'CHIEF');

-- CreateEnum
CREATE TYPE "Habilitation" AS ENUM ('IN_TRAINING', 'GUNMAN', 'INFILTRATOR', 'HACKER', 'SPY');

-- CreateEnum
CREATE TYPE "ConfidentialityLevel" AS ENUM ('CONFIDENTIAL', 'SECRET', 'ULTRA_SECRET');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'IN_PROGRESS', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "Agent" (
    "agentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "connectionId" INTEGER NOT NULL,
    "pwd" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'RECRUIT',
    "habilitation" "Habilitation" NOT NULL DEFAULT 'IN_TRAINING',

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agentId")
);

-- CreateTable
CREATE TABLE "Mission" (
    "missionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "confidentialityLevel" "ConfidentialityLevel" NOT NULL DEFAULT 'CONFIDENTIAL',
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',
    "Reward" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("missionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_connectionId_key" ON "Agent"("connectionId");

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("agentId") ON DELETE RESTRICT ON UPDATE CASCADE;
