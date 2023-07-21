-- DropForeignKey
ALTER TABLE "Bis" DROP CONSTRAINT "Bis_supirId_fkey";

-- AlterTable
ALTER TABLE "Bis" ALTER COLUMN "supirId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bis" ADD CONSTRAINT "Bis_supirId_fkey" FOREIGN KEY ("supirId") REFERENCES "Supir"("id") ON DELETE SET NULL ON UPDATE CASCADE;
