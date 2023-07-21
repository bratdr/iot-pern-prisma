const prisma = require("../prisma/client");
const { resError, resSuccess } = require("../services/responseHandler");
const axios = require("axios");
const ITEM_LIMIT = 2;

exports.setBusPositionMQTT = async (data, feedback) => {
    try {
        const body = JSON.parse(data);
        if (body.type === "uplink") {
            const [type, lat, long, nomorPolisi] = String(
                JSON.parse(body.data).p
            ).split("#");
            console.log(body.data);

            // UPDATE POSITION
            if (type == "L") {
                await prisma.bis.update({
                    where: {
                        nomorPolisi,
                    },
                    data: {
                        position: `${lat},${long}`,
                    },
                });
            }

            // CARD HANDLER
            if (type == "C") {
                const [type, lat, long, cardId, nomorPolisi] = String(
                    JSON.parse(body.data).p
                ).split("#");

                const position = lat + ", " + long;
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

                console.log("Response Title: ", title);
                console.log("Response Data: ", data);
            }

            // PANIC BUTTON
            if (type == "B") {
                const [_, status, lat, long, nomorPolisi] = String(
                    JSON.parse(body.data).p
                ).split("#");
                const position = lat + ", " + long;

                if (status == "DARURAT") {
                    const data = await prisma.bis.update({
                        where: {
                            nomorPolisi: nomorPolisi,
                        },
                        data: {
                            status: "DARURAT",
                            position,
                        },
                    });

                    console.log(
                        "Response Title: ",
                        "Berhasil mengatur status bis menjadi darurat"
                    );
                    console.log("Response Data: ", data);
                }
            }
        }
    } catch (error) {}
};
