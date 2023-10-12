-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessHistory" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "success" BOOLEAN DEFAULT false,
    "userId" INTEGER,

    CONSTRAINT "AccessHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AccessHistory" ADD CONSTRAINT "AccessHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
