-- AlterTable
ALTER TABLE "Bis" ADD COLUMN     "position" TEXT;

-- AlterTable
ALTER TABLE "Commute" ADD COLUMN     "finishPosition" TEXT,
ADD COLUMN     "isActiveCommuting" BOOLEAN,
ADD COLUMN     "startPosition" TEXT;
