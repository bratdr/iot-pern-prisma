const prisma = require("../../prisma/client");
const { resError, resSuccess } = require("../../services/responseHandler");
const axios = require("axios");
const ITEM_LIMIT = Number(process.env.ITEM_LIMIT) || 10;

// START COMMUTING
exports.startCommuting = async (req, res) => {
    try {
        const { nomorPolisi, cardId, position } = req.body;
        let title, data;
        // TRY FINDING ACTIVE COMMUTING
        const activeCommuting = await prisma.commute.findMany({
            where: {
                isActiveCommuting: true,
                siswa: {
                    some: {
                        cardId,
                    },
                },
                bis: {
                    some: {
                        nomorPolisi,
                    },
                },
            },
        });
        // IF SYSTEM FIND ACTIVE COMMUTING CHANGE TO NONACTIVE
        if (activeCommuting.length == 1) {
            data = await prisma.commute.update({
                where: {
                    id: activeCommuting[0].id,
                },
                data: {
                    isActiveCommuting: false,
                    finishPosition: position,
                },
            });
            title = "Set Active Commuting Data to Nonactive";
        }

        // IF SYSTEM CANT FIND ACTIVE COMMUTING CREATE NEW
        if (activeCommuting.length == 0) {
            data = await prisma.commute.create({
                data: {
                    siswa: {
                        connect: {
                            cardId,
                        },
                    },
                    bis: {
                        connect: {
                            nomorPolisi,
                        },
                    },
                    startPosition: position,
                    isActiveCommuting: true,
                },
            });
            title = "Create New Commuting Data";
        }

        return resSuccess({
            res,
            title: title,
            data: data,
        });
    } catch (error) {
        return resError({ res, title: "Failed start commuting" });
    }
};

// COMMUTING LIST
exports.commutingList = async (req, res) => {
    const { search, cursor } = req.query;
    let commuteList;
    try {
        if (search) {
            if (!cursor) {
                commuteList = await prisma.commute.findMany({
                    where: {
                        bis: {
                            some: {
                                nomorPolisi: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }

            if (cursor) {
                commuteList = await prisma.commute.findMany({
                    where: {
                        bis: {
                            some: {
                                nomorPolisi: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "asc",
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
                commuteList = await prisma.commute.findMany({
                    orderBy: {
                        createdAt: "asc",
                    },
                    take: ITEM_LIMIT,
                });
            }
            if (cursor) {
                commuteList = await prisma.commute.findMany({
                    orderBy: {
                        createdAt: "asc",
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
            title: "Berhasil menampilkan daftar commuter list",
            data: commuteList,
        });
    } catch (error) {
        return resError({ res, title: "Failed get commuting list" });
    }
};

// COMMUTING DETAIL, BASE OM BUS
exports.detail = async (req, res) => {
    try {
        const { nomorPolisi, cursor } = req.query;
        let detailCommute;
        if (!cursor) {
            detailCommute = await prisma.commute.findMany({
                where: {
                    bis: {
                        some: {
                            nomorPolisi: {
                                contains: nomorPolisi,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    startPosition: true,
                    finishPosition: true,
                    isActiveCommuting: true,
                    siswa: {
                        select: {
                            id: true,
                            nama: true,
                            nisn: true,
                            cardId: true,
                        },
                    },
                },
                take: ITEM_LIMIT,
            });
        }

        if (cursor) {
            detailCommute = await prisma.commute.findMany({
                where: {
                    bis: {
                        some: {
                            nomorPolisi: {
                                contains: nomorPolisi,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    startPosition: true,
                    finishPosition: true,
                    isActiveCommuting: true,
                    siswa: {
                        select: {
                            id: true,
                            nama: true,
                            nisn: true,
                            cardId: true,
                        },
                    },
                },
                take: ITEM_LIMIT,
                skip: 1,
                cursor: {
                    id: cursor,
                },
            });
        }

        return resSuccess({
            res,
            title: "Success get commuting detail",
            data: detailCommute,
        });
    } catch (error) {
        return resError({ res, title: "Failed get commuting detail" });
    }
};

// COMMUTING DETAIL, BASE ON NISN
exports.siswaCommute = async (req, res) => {
    try {
        const { nisn, cursor } = req.query;
        let detailCommute;
        if (!cursor) {
            detailCommute = await prisma.commute.findMany({
                where: {
                    siswa: {
                        some: {
                            nisn: {
                                contains: nisn,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    startPosition: true,
                    finishPosition: true,
                    isActiveCommuting: true,
                    bis: {
                        select: {
                            id: true,
                            nomorPolisi: true,
                            merek: true,
                            supir: {
                                select: {
                                    id: true,
                                    nama: true,
                                    nomorTelepon: true,
                                },
                            },
                        },
                    },
                },
                take: ITEM_LIMIT,
            });
        }

        if (cursor) {
            detailCommute = await prisma.commute.findMany({
                where: {
                    siswa: {
                        some: {
                            nisn: {
                                contains: nisn,
                                mode: "insensitive",
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    startPosition: true,
                    finishPosition: true,
                    isActiveCommuting: true,
                    bis: {
                        select: {
                            id: true,
                            nomorPolisi: true,
                            merek: true,
                            supir: {
                                select: {
                                    id: true,
                                    nama: true,
                                    nomorTelepon: true,
                                },
                            },
                        },
                    },
                },
                take: ITEM_LIMIT,
                skip: 1,
                cursor: {
                    id: cursor,
                },
            });
        }

        return resSuccess({
            res,
            title: "Success get commuting detail base on NISN",
            data: detailCommute,
        });
    } catch (error) {
        return resError({ res, title: "Failed get commuting detail" });
    }
};
