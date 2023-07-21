-- DropForeignKey
ALTER TABLE "Bis" DROP CONSTRAINT "Bis_commuteId_fkey";

-- DropForeignKey
ALTER TABLE "Siswa" DROP CONSTRAINT "Siswa_commuteId_fkey";

-- CreateTable
CREATE TABLE "_CommuteToSiswa" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BisToCommute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommuteToSiswa_AB_unique" ON "_CommuteToSiswa"("A", "B");

-- CreateIndex
CREATE INDEX "_CommuteToSiswa_B_index" ON "_CommuteToSiswa"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BisToCommute_AB_unique" ON "_BisToCommute"("A", "B");

-- CreateIndex
CREATE INDEX "_BisToCommute_B_index" ON "_BisToCommute"("B");

-- AddForeignKey
ALTER TABLE "_CommuteToSiswa" ADD CONSTRAINT "_CommuteToSiswa_A_fkey" FOREIGN KEY ("A") REFERENCES "Commute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommuteToSiswa" ADD CONSTRAINT "_CommuteToSiswa_B_fkey" FOREIGN KEY ("B") REFERENCES "Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BisToCommute" ADD CONSTRAINT "_BisToCommute_A_fkey" FOREIGN KEY ("A") REFERENCES "Bis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BisToCommute" ADD CONSTRAINT "_BisToCommute_B_fkey" FOREIGN KEY ("B") REFERENCES "Commute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
