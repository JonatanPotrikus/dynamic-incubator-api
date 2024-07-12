/*
  Warnings:

  - The primary key for the `machine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `machine` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_machine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_machine" ("id", "ip", "name", "type") SELECT "id", "ip", "name", "type" FROM "machine";
DROP TABLE "machine";
ALTER TABLE "new_machine" RENAME TO "machine";
CREATE UNIQUE INDEX "machine_ip_key" ON "machine"("ip");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
