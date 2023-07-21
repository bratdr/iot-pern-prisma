/*
  Warnings:

  - You are about to drop the `_BisToCommute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommuteToSiswa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BisToCommute" DROP CONSTRAINT "_BisToCommute_A_fkey";

-- DropForeignKey
ALTER TABLE "_BisToCommute" DROP CONSTRAINT "_BisToCommute_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommuteToSiswa" DROP CONSTRAINT "_CommuteToSiswa_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommuteToSiswa" DROP CONSTRAINT "_CommuteToSiswa_B_fkey";

-- DropTable
DROP TABLE "_BisToCommute";

-- DropTable
DROP TABLE "_CommuteToSiswa";

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_commuteId_fkey" FOREIGN KEY ("commuteId") REFERENCES "Commute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bis" ADD CONSTRAINT "Bis_commuteId_fkey" FOREIGN KEY ("commuteId") REFERENCES "Commute"("id") ON DELETE SET NULL ON UPDATE CASCADE;
