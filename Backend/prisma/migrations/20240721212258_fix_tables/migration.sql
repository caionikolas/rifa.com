/*
  Warnings:

  - You are about to drop the column `prizePool` on the `raffle` table. All the data in the column will be lost.
  - You are about to drop the column `celNumber` on the `ticket` table. All the data in the column will be lost.

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
    "prize_pool" TEXT
);
INSERT INTO "new_raffle" ("draw_date", "email", "id", "maximum_numbers", "password", "title") SELECT "draw_date", "email", "id", "maximum_numbers", "password", "title" FROM "raffle";
DROP TABLE "raffle";
ALTER TABLE "new_raffle" RENAME TO "raffle";
CREATE TABLE "new_ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "cel_number" TEXT,
    "paid" BOOLEAN,
    "raffle_id" TEXT NOT NULL,
    CONSTRAINT "ticket_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ticket" ("email", "id", "name", "number", "paid", "raffle_id") SELECT "email", "id", "name", "number", "paid", "raffle_id" FROM "ticket";
DROP TABLE "ticket";
ALTER TABLE "new_ticket" RENAME TO "ticket";
CREATE UNIQUE INDEX "ticket_raffle_id_number_key" ON "ticket"("raffle_id", "number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
