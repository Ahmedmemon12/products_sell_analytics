import { PrismaClient } from "@prisma/client";
import ButtonStyle from "../Classes/ButtonStyle";
import { json } from "@remix-run/node";


export const loader = async ({ params }) => {

    const shop = `${params.shop}`;


    // const buttonStyle = new ButtonStyle('myShop', false, 'Click Here', false, false, false, 'lightblue', 'blue', 16, 'No Animation', '#cccccc', 1, 120, 10);
    const prisma = new PrismaClient();

    try {
        const db_button_setting = await prisma.button_style.findUnique({
            where: {
                shop: shop
            }
        });

        if (db_button_setting) {
            // return json({ buttonStyle: db_button_setting });
            return json({ buttonStyle: db_button_setting }, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }
        else {
            return json({ error: "Button Does not exist" }, {
                status: 500, headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }


    } catch (error) {
        console.error("Error fetching button style from database:", error);
        return json({ error: "Failed to load button style" }, {
            status: 500, headers: {
                "Access-Control-Allow-Origin": "*",
            }
        });
    } finally {

        await prisma.$disconnect();
    }
};

