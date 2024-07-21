/*
  Warnings:

  - A unique constraint covering the columns `[raffle_id,number]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ticket_raffle_id_number_key" ON "ticket"("raffle_id", "number");
