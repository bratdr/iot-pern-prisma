-- CreateEnum
CREATE TYPE "STATUS_BIS" AS ENUM ('NORMAL', 'DARURAT');

-- CreateTable
CREATE TABLE "Sekolah" (
    "id" TEXT NOT NULL,
    "nama" TEXT,
    "alamat" TEXT,
    "nomorTelepon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" TEXT NOT NULL,
    "nisn" TEXT,
    "cardId" TEXT,
    "nama" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sekolahId" TEXT,
    "commuteId" TEXT,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bis" (
    "id" TEXT NOT NULL,
    "nomorPolisi" TEXT,
    "merek" TEXT,
    "status" "STATUS_BIS" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supirId" TEXT NOT NULL,
    "commuteId" TEXT,

    CONSTRAINT "Bis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supir" (
    "id" TEXT NOT NULL,
    "nomorTelepon" TEXT,
    "nama" TEXT,
    "alamat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supir_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "Siswa"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_cardId_key" ON "Siswa"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "Bis_nomorPolisi_key" ON "Bis"("nomorPolisi");

-- CreateIndex
CREATE UNIQUE INDEX "Bis_supirId_key" ON "Bis"("supirId");

-- CreateIndex
CREATE UNIQUE INDEX "Supir_nomorTelepon_key" ON "Supir"("nomorTelepon");

-- CreateIndex
CREATE UNIQUE INDEX "_CommuteToSiswa_AB_unique" ON "_CommuteToSiswa"("A", "B");

-- CreateIndex
CREATE INDEX "_CommuteToSiswa_B_index" ON "_CommuteToSiswa"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BisToCommute_AB_unique" ON "_BisToCommute"("A", "B");

-- CreateIndex
CREATE INDEX "_BisToCommute_B_index" ON "_BisToCommute"("B");

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "Sekolah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bis" ADD CONSTRAINT "Bis_supirId_fkey" FOREIGN KEY ("supirId") REFERENCES "Supir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommuteToSiswa" ADD CONSTRAINT "_CommuteToSiswa_A_fkey" FOREIGN KEY ("A") REFERENCES "Commute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommuteToSiswa" ADD CONSTRAINT "_CommuteToSiswa_B_fkey" FOREIGN KEY ("B") REFERENCES "Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BisToCommute" ADD CONSTRAINT "_BisToCommute_A_fkey" FOREIGN KEY ("A") REFERENCES "Bis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BisToCommute" ADD CONSTRAINT "_BisToCommute_B_fkey" FOREIGN KEY ("B") REFERENCES "Commute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
