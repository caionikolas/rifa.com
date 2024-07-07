-- CreateTable
CREATE TABLE "rifas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "maximum_numbers" INTEGER NOT NULL,
    "image" TEXT,
    "date_draw" DATETIME,
    "premiacao" INTEGER,
    "slug" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "rifas_slug_key" ON "rifas"("slug");
