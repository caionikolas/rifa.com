-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "cel_number" TEXT,
    "paid" BOOLEAN,
    "raffle_id" TEXT NOT NULL,
    CONSTRAINT "ticket_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ticket" ("cel_number", "email", "id", "name", "number", "paid", "raffle_id") SELECT "cel_number", "email", "id", "name", "number", "paid", "raffle_id" FROM "ticket";
DROP TABLE "ticket";
ALTER TABLE "new_ticket" RENAME TO "ticket";
CREATE UNIQUE INDEX "ticket_raffle_id_number_key" ON "ticket"("raffle_id", "number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
