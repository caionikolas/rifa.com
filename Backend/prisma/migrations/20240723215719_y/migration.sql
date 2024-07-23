-- CreateTable
CREATE TABLE "raffle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "maximum_numbers" INTEGER NOT NULL,
    "draw_date" TEXT,
    "prize_pool" TEXT,

    CONSTRAINT "raffle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "cel_number" TEXT,
    "paid" BOOLEAN,
    "raffle_id" TEXT NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_raffle_id_number_key" ON "ticket"("raffle_id", "number");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
