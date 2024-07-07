/*
  Warnings:

  - You are about to drop the column `premiacao` on the `rifas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rifas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "maximum_numbers" INTEGER NOT NULL,
    "draw_date" TEXT,
    "prizePool" INTEGER,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_rifas" ("draw_date", "email", "id", "maximum_numbers", "password", "slug", "title") SELECT "draw_date", "email", "id", "maximum_numbers", "password", "slug", "title" FROM "rifas";
DROP TABLE "rifas";
ALTER TABLE "new_rifas" RENAME TO "rifas";
CREATE UNIQUE INDEX "rifas_slug_key" ON "rifas"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
