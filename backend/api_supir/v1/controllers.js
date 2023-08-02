const prisma = require("../../prisma/client");
const { resError, resSuccess } = require("../../services/responseHandler");
const ITEM_LIMIT = Number(process.env.ITEM_LIMIT) || 10;

exports.create = async (req, res) => {
    try {
        const { nomorTelepon, nama, alamat } = req.body;
        const data = await prisma.supir.create({
            data: {
                nama: nama,
                alamat: alamat,
                nomorTelepon: nomorTelepon,
            },
        });
        resSuccess({
            res,
            title: "Berhasil menambahkan data supir",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal memasukan data supir",
            code: 400,
        });
    }
};

exports.list = async (req, res) => {
    try {
        const { search, cursor } = req.query;
        let daftarSupir;
        if (search) {
            if (!cursor) {
                daftarSupir = await prisma.supir.findMany({
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
                daftarSupir = await prisma.supir.findMany({
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
                daftarSupir = await prisma.supir.findMany({
                    orderBy: {
                        nama: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }
            if (cursor) {
                daftarSupir = await prisma.supir.findMany({
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
            title: "Berhasil menampilkan data supir",
            data: daftarSupir,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menampilkan data supir",
            code: 400,
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, nomorTelepon, nama, alamat } = req.body;
        const data = await prisma.supir.update({
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
            title: "Berhasil mengubah data supir",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengubah data supir",
            code: 400,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await prisma.supir.delete({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil menghapus data supir",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menghapus data supir",
            code: 400,
        });
    }
};

exports.detail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await prisma.supir.findUnique({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil mendapatkan data supir",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mendapatkan data supir",
            code: 400,
        });
    }
};
