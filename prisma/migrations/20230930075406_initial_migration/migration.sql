-- CreateTable
CREATE TABLE "restaurant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prefecture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);
