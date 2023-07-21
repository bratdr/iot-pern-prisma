const prisma = require("../../prisma/client");
const { resError, resSuccess } = require("../../services/responseHandler");
const ITEM_LIMIT = 2;

exports.create = async (req, res) => {
    try {
        const { nomorTelepon, nama, alamat } = req.body;
        const data = await prisma.sekolah.create({
            data: {
                nama: nama,
                alamat: alamat,
                nomorTelepon: nomorTelepon,
            },
        });
        resSuccess({
            res,
            title: "Berhasil menambahkan data sekolah",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal memasukan data sekolah",
            code: 400,
        });
    }
};

exports.list = async (req, res) => {
    try {
        const { search, cursor } = req.query;
        let daftarsekolah;
        if (search) {
            if (!cursor) {
                daftarsekolah = await prisma.sekolah.findMany({
                    where: {
                        nama: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }

            if (cursor) {
                daftarsekolah = await prisma.sekolah.findMany({
                    where: {
                        nama: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                    skip: 1,
                    cursor: {
                        id: cursor,
                    },
                });
            }
        }
        if (!search) {
            if (!cursor) {
                daftarsekolah = await prisma.sekolah.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }
            if (cursor) {
                daftarsekolah = await prisma.sekolah.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                    skip: 1,
                    cursor: {
                        id: cursor,
                    },
                });
            }
        }
        return resSuccess({
            res,
            title: "Berhasil menampilkan data sekolah",
            data: daftarsekolah,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menampilkan data sekolah",
            code: 400,
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, nomorTelepon, nama, alamat } = req.body;
        const data = await prisma.sekolah.update({
            where: {
                id: id,
            },
            data: {
                nama: nama,
                nomorTelepon: nomorTelepon,
                alamat: alamat,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil mengubah data sekolah",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengubah data sekolah",
            code: 400,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await prisma.sekolah.delete({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil menghapus data sekolah",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menghapus data sekolah",
            code: 400,
        });
    }
};

exports.hubungkanSekolahDenganSiswa = async (req, res) => {
    try {
        const { idSiswa, idSekolah } = req.body;
        const data = await prisma.sekolah.update({
            where: {
                id: idSekolah,
            },
            data: {
                siswa: {
                    connect: {
                        id: idSiswa,
                    },
                },
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
                siswa: {
                    where: {
                        id: idSiswa,
                    },
                    select: {
                        nama: true,
                    },
                },
            },
        });

        return resSuccess({
            res,
            title: "Berhasil menautkan siswa dengan sekolah",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menautkan data siswa dengan sekolah",
            code: 400,
        });
    }
};

exports.putuskanHubunganSekolahDenganSiswa = async (req, res) => {
    try {
        const { idSiswa, idSekolah } = req.body;
        const data = await prisma.sekolah.update({
            where: {
                id: idSekolah,
            },
            data: {
                siswa: {
                    disconnect: {
                        id: idSiswa,
                    },
                },
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil melepas tautan sekolah dengan siswa",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal melepas tautan sekolah dengan siswa",
            code: 400,
        });
    }
};

exports.daftarSiswaDiSekolah = async (req, res) => {
    try {
        const { idSekolah } = req.params;
        const { cursor } = req.query;

        const dataSekolah = await prisma.sekolah.findUniqueOrThrow({
            where: {
                id: idSekolah,
            },
            select: {
                nama: true,
                alamat: true,
            },
        });

        let daftarSiswa;
        if (!cursor) {
            daftarSiswa = await prisma.siswa.findMany({
                where: {
                    sekolahId: idSekolah,
                },
                take: 20,
                select: {
                    id: true,
                    nama: true,
                    nisn: true,
                },
            });
        }
        return resSuccess({
            res,
            title: "Sukses menampilkan daftar siswa",
            data: { dataSekolah, daftarSiswa },
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menampilkan daftar siswa",
            code: 400,
        });
    }
};
