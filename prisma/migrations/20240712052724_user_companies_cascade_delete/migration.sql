-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserCompanies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "UserCompanies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserCompanies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserCompanies" ("companyId", "id", "userId") SELECT "companyId", "id", "userId" FROM "UserCompanies";
DROP TABLE "UserCompanies";
ALTER TABLE "new_UserCompanies" RENAME TO "UserCompanies";
CREATE UNIQUE INDEX "UserCompanies_userId_companyId_key" ON "UserCompanies"("userId", "companyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
