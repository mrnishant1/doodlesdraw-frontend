-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "emial" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emial_key" ON "public"."User"("emial");
