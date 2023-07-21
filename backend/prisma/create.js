const prisma = require("./client");
const { generateHash } = require("../services/auth");

// CRETA ROLE: create.js role "USER"/"ADMIN"/"SUPER ADMIN"
// CRETA SUPERADMIN: create.js superadmin "username" "email" "password"

async function main() {
    const args = process.argv;
    const table = args.slice(2)[0];

    switch (table.toUpperCase()) {
        case "ROLE":
            console.log(" [i]: CREATING ROLE");
            const roleName = args.slice(2)[1];
            try {
                const data = await prisma.role.create({
                    data: {
                        name: roleName,
                    },
                });
                console.log(` [i]: Success create data`);
            } catch (error) {
                console.log(` [x]: Failed to create data ${error}`);
            }
            break;

        case "SUPERADMIN":
            console.log(" [i]: CREATING SUPER ADMIN");
            const username = args.slice(2)[1];
            const email = args.slice(2)[2];
            const password = args.slice(2)[3];
            try {
                const data = await prisma.user.create({
                    data: {
                        username,
                        email,
                        emailIsVerified: true,
                        password: generateHash(password),
                        accountIsVerified: true,
                        passwordUpdatedAt: new Date(Date.now() - 1000),
                        role: {
                            connect: {
                                name: "SUPER ADMIN",
                            },
                        },
                    },
                });
                console.log(` [i]: Success create data`);
            } catch (error) {
                console.log(` [x]: Failed to create data ${error}`);
            }
            break;

        default:
            console.log("COMMAND NOT FOUND");
            break;
    }
}

main()
    .catch((e) => {
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
