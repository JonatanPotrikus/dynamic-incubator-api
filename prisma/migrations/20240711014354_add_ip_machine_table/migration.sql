/*
  Warnings:

  - Added the required column `ip` to the `machine` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_machine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_machine" ("id", "name", "type") SELECT "id", "name", "type" FROM "machine";
DROP TABLE "machine";
ALTER TABLE "new_machine" RENAME TO "machine";
CREATE UNIQUE INDEX "machine_ip_key" ON "machine"("ip");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
