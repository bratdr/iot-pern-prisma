const prisma = require("../../prisma/client");
const { resError, resSuccess } = require("../../services/responseHandler");
const ITEM_LIMIT = Number(process.env.ITEM_LIMIT) || 10;

exports.create = async (req, res) => {
    try {
        const { nisn, cardID, nama } = req.body;
        const data = await prisma.siswa.create({
            data: {
                nisn: nisn,
                cardId: cardID,
                nama: nama,
            },
        });
        resSuccess({
            res,
            title: "Berhasil menambahkan data siswa",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal memasukan data siswa",
            code: 400,
        });
    }
};

exports.list = async (req, res) => {
    try {
        const { search, cursor } = req.query;
        let daftarsiswa;
        if (search) {
            if (!cursor) {
                daftarsiswa = await prisma.siswa.findMany({
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
                    select: {
                        id: true,
                        nisn: true,
                        nama: true,
                        Sekolah: {
                            select: {
                                nama: true,
                            },
                        },
                    },
                });
            }

            if (cursor) {
                daftarsiswa = await prisma.siswa.findMany({
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
                    select: {
                        id: true,
                        nisn: true,
                        nama: true,
                        Sekolah: {
                            select: {
                                nama: true,
                            },
                        },
                    },
                });
            }
        }
        if (!search) {
            if (!cursor) {
                daftarsiswa = await prisma.siswa.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                    select: {
                        id: true,
                        nisn: true,
                        nama: true,
                        Sekolah: {
                            select: {
                                nama: true,
                            },
                        },
                    },
                });
            }
            if (cursor) {
                daftarsiswa = await prisma.siswa.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                    skip: 1,
                    cursor: {
                        id: cursor,
                    },
                    select: {
                        id: true,
                        nisn: true,
                        nama: true,
                        Sekolah: {
                            select: {
                                nama: true,
                            },
                        },
                    },
                });
            }
        }
        return resSuccess({
            res,
            title: "Berhasil menampilkan data siswa",
            data: daftarsiswa,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menampilkan data siswa",
            code: 400,
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, nisn, cardID, nama } = req.body;
        const data = await prisma.siswa.update({
            where: {
                id: id,
            },
            data: {
                nisn: nisn,
                cardId: cardID,
                nama: nama,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil mengubah data siswa",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengubah data siswa",
            code: 400,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await prisma.siswa.delete({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil menghapus data siswa",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menghapus data siswa",
            code: 400,
        });
    }
};

exports.detail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.siswa.findUnique({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil mendapatkan data siswa",
            data: data,
        });
    } catch (error) {
        return resError({
            res,
            errors: error,
            title: "Gagal mendapatkan detail siswa",
            code: 400,
        });
    }
};

exports.hubungkanSiswaKeKartu = async (req, res) => {
    try {
        const { id, cardID } = req.body;
        const data = await prisma.siswa.update({
            where: {
                id: id,
            },
            data: {
                cardId: cardID,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil menautkan siswa dengan kartu",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menautkan data siswa dengan kartu",
            code: 400,
        });
    }
};

exports.pustuskanHubungkanSiswaKeKartu = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await prisma.siswa.update({
            where: {
                id: id,
            },
            data: {
                cardId: null,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil melepas tautan siswa dengan kartu",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal melepas tautan data siswa dengan kartu",
            code: 400,
        });
    }
};

exports.hubungkanSiswaKeSekolah = async (req, res) => {
    try {
        const { idSiswa, idSekolah } = req.body;
        const data = await prisma.siswa.update({
            where: {
                id: idSiswa,
            },
            data: {
                Sekolah: {
                    connect: {
                        id: idSekolah,
                    },
                },
            },
            select: {
                id: true,
                nisn: true,
                nama: true,
                Sekolah: {
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

exports.putuskanHubungkanSiswaKeSekolah = async (req, res) => {
    try {
        const { idSiswa } = req.body;
        const data = await prisma.siswa.update({
            where: {
                id: idSiswa,
            },
            data: {
                Sekolah: {
                    disconnect: true,
                },
            },
            select: {
                id: true,
                nisn: true,
                nama: true,
                Sekolah: {
                    select: {
                        nama: true,
                    },
                },
            },
        });

        return resSuccess({
            res,
            title: "Berhasil melepas tautan siswa dengan sekolah",
            data: data,
        });
    } catch (error) {
        console.log(error);
        resError({
            res,
            errors: error,
            title: "Gagal melepas tautan siswa dengan sekolah",
            code: 400,
        });
    }
};
