-- CreateTable
CREATE TABLE "ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celNumber" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "raffle_id" TEXT NOT NULL,
    CONSTRAINT "ticket_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
