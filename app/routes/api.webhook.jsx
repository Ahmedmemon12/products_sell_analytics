import { json } from "@remix-run/node";
import fs from "fs";
import path from "path";
import { authenticate } from "../shopify.server";


// Helper function to append logs to a file
const logToFile = (message) => {
    const logFilePath = path.resolve("./logs/webhook.log");
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, "utf8");
};

export const action = async ({ request }) => {
    const { shop ,payload} = await authenticate.webhook(request)
    console.log("Store Name ------------------->", shop);
    logToFile("Store Name ------------------->" + shop);
    logToFile(`Payload: ${JSON.stringify(payload)}`);
    switch (request.method) {
        case "POST": {
            try {
                logToFile("Received POST request");

                // const payload = await request;
                

                const lineitems = payload.line_items;
                let count = 0;
                let store = "";

                lineitems.forEach((lineitem) => {
                    const properties = lineitem.properties;
                    store = lineitem.vendor;
                    properties.forEach((property) => {
                        if (property.name === "_Button") {
                            count = 1;
                        }
                    });
                });

                // const button_analytics_api_url = `https://tennis-prominent-rotation-rebates.trycloudflare.com/api/button_analytics/create/Hydrogen Vendor.myshopify.com/1`;
                const button_analytics_api_url = `${process.env.SHOPIFY_APP_URL}/api/button_analytics/create/${shop}/${count}`;
                //  const button_analytics_api_url = `${process.env.SHOPIFY_APP_URL}/api/button_analytics/create/${store}.myshopify.com/${count}`;
                //const button_analytics_api_url = `https://fast-checkout.helpify24.com/api/button_analytics/create/${shop}.myshopify.com/${count}`;
                logToFile(`Endpoint Url: ${button_analytics_api_url}`);

                const response = await fetch(button_analytics_api_url);
                const data = await response.json();

                logToFile(`Count status: ${JSON.stringify(data)}`);

                return json({ count: count, status: "success" });
            } catch (error) {
                logToFile(`Error processing request: ${error}`);
                console.error("Error processing request:", error);
                return json({ error: "Error processing request" }, { status: 500 });
            }
        }

        default:
            logToFile("Method not allowed");
            return json({ error: "Method not allowed" }, { status: 405 });
    }
};
