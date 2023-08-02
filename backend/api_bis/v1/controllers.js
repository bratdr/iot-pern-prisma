const prisma = require("../../prisma/client");
const { resError, resSuccess } = require("../../services/responseHandler");
const axios = require("axios");
const ITEM_LIMIT = Number(process.env.ITEM_LIMIT) || 10;

exports.create = async (req, res) => {
    try {
        const { nomorPolisi, merk } = req.body;
        const data = await prisma.bis.create({
            data: {
                nomorPolisi: nomorPolisi,
                merek: merk,
            },
        });
        resSuccess({
            res,
            title: "Berhasil menambahkan data bis",
            data: data,
        });
    } catch (error) {
        console.log(error);
        resError({
            res,
            errors: error,
            title: "Gagal memasukan data bis",
            code: 400,
        });
    }
};

exports.list = async (req, res) => {
    try {
        const { search, cursor } = req.query;
        let daftarbis;
        if (search) {
            if (!cursor) {
                daftarbis = await prisma.bis.findMany({
                    where: {
                        merek: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    orderBy: {
                        merek: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }

            if (cursor) {
                daftarbis = await prisma.bis.findMany({
                    where: {
                        merek: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    orderBy: {
                        merek: "asc",
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
                daftarbis = await prisma.bis.findMany({
                    orderBy: {
                        merek: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }
            if (cursor) {
                daftarbis = await prisma.bis.findMany({
                    orderBy: {
                        merek: "asc",
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
            title: "Berhasil menampilkan data bis",
            data: daftarbis,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menampilkan data bis",
            code: 400,
        });
    }
};

exports.edit = async (req, res) => {
    try {
        const { id, nomorPolisi, merk } = req.body;
        const data = await prisma.bis.update({
            where: {
                id: id,
            },
            data: {
                nomorPolisi: nomorPolisi,
                merek: merk,
            },
        });

        return resSuccess({
            res,
            title: "Berhasil mengubah data bis",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengubah data bis",
            code: 400,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await prisma.bis.delete({
            where: {
                id: id,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil menghapus data bis",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal menghapus data bis",
            code: 400,
        });
    }
};

exports.setSupirBis = async (req, res) => {
    try {
        const { idBis, idSupirBis } = req.body;
        const data = await prisma.bis.update({
            where: {
                id: idBis,
            },
            data: {
                supir: {
                    connect: {
                        id: idSupirBis,
                    },
                },
            },
            select: {
                nomorPolisi: true,
                status: true,
                id: true,
                merek: true,
                supir: {
                    select: {
                        nama: true,
                    },
                },
            },
        });
        return resSuccess({
            res,
            title: "Berhasil mengatur pengemudi bis",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengatur pengemudi bis",
            code: 400,
        });
    }
};

exports.setKondisiDarurat = async (req, res) => {
    try {
        const { nomorPolisi } = req.body;
        const data = await prisma.bis.update({
            where: {
                nomorPolisi: nomorPolisi,
            },
            data: {
                status: "DARURAT",
            },
        });
        return resSuccess({
            res,
            title: "Berhasil mengatur status bis menjadi darurat",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengatur status bis menjadi darurat",
            code: 400,
        });
    }
};

exports.setKondisiNormal = async (req, res) => {
    try {
        const { nomorPolisi } = req.body;
        const data = await prisma.bis.update({
            where: {
                nomorPolisi: nomorPolisi,
            },
            data: {
                status: "NORMAL",
            },
        });
        return resSuccess({
            res,
            title: "Berhasil mengatur status bis menjadi normal",
            data: data,
        });
    } catch (error) {
        resError({
            res,
            errors: error,
            title: "Gagal mengatur status bis menjadi normal",
            code: 400,
        });
    }
};

exports.setBusPosition = async (req, res) => {
    try {
        const { idBis, position } = req.body;
        const data = await prisma.bis.update({
            where: {
                id: idBis,
            },
            data: {
                position,
            },
        });
        return resSuccess({
            res,
            title: "Berhasil mengatur posisi bis",
            data: data,
        });
    } catch (error) {
        return resError({
            res,
            title: "Gagal mengatur posisi bis",
            data: data,
        });
    }
};

exports.detailBis = async (req, res) => {
    try {
        const { idBis } = req.params;

        const data = await prisma.bis.findUnique({
            where: {
                id: idBis,
            },
            select: {
                id: true,
                nomorPolisi: true,
                merek: true,
                position: true,
                status: true,
                supir: {
                    select: {
                        nama: true,
                        nomorTelepon: true,
                        alamat: true,
                    },
                },
            },
        });

        const openstreetmap = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
                params: {
                    lat: String(data.position)
                        .split(",")[0]
                        .replaceAll(" ", ""),
                    lon: String(data.position)
                        .split(",")[1]
                        .replaceAll(" ", ""),
                    format: "json",
                },
            }
        );
        console.log(openstreetmap.data);
        return resSuccess({
            res,
            title: "Sukses mendapatkan detail bis",
            data: { ...data, streetName: openstreetmap.data.display_name },
        });
    } catch (error) {
        console.log(error);
        return resError({
            res,
            title: "Gagal mendapatkan detail bis",
            data: error,
        });
    }
};

exports.setBusPositionMQTT = async (data, feedback) => {
    const body = JSON.parse(data);
    if (body.type === "uplink") {
        const [type, lat, long, nomorPolisi] = String(
            JSON.parse(body.data).p
        ).split("#");
        console.log(type, lat, long, nomorPolisi);
        await prisma.bis.update({
            where: {
                nomorPolisi,
            },
            data: {
                position: `${lat},${long}`,
            },
        });
    }
};
