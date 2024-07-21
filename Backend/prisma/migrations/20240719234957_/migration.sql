/*
  Warnings:

  - You are about to drop the column `slug` on the `raffle` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_raffle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "maximum_numbers" INTEGER NOT NULL,
    "draw_date" TEXT,
    "prizePool" TEXT
);
INSERT INTO "new_raffle" ("draw_date", "email", "id", "maximum_numbers", "password", "prizePool", "title") SELECT "draw_date", "email", "id", "maximum_numbers", "password", "prizePool", "title" FROM "raffle";
DROP TABLE "raffle";
ALTER TABLE "new_raffle" RENAME TO "raffle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
