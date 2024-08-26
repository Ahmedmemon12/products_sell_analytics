import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { format } from "date-fns";

export const loader = async ({ params }) => {
  const shop = params.shop;
  const conversionCount = parseInt(params.conversion_count, 10); // Ensure conversion count is an integer

  console.log("Conversion Count: ", conversionCount);
  const prisma = new PrismaClient();

  try {
    const currentDate = format(new Date(), "yyyy-MM-dd");

    // Fetch initial click count of the button
    const existingData = await prisma.button_analytics.findFirst({
      where: {
        shop: shop,
        date: currentDate,
      },
    });
    if (existingData) {
        const dataToBeUpdated = {
          shop: shop,
          date: currentDate,
          click_count: conversionCount ? existingData.click_count : existingData.click_count + 1,
          convertion_count:
            existingData.convertion_count + (conversionCount || 0) || 0,
        };
        console.log("existingData------------->", existingData);
        console.log("Data to be updated:", dataToBeUpdated);
  
        const result = await prisma.button_analytics.upsert({
          where: {
            id:existingData.id,
            shop: shop,
            date: currentDate,
          },
          update: dataToBeUpdated,
          create: dataToBeUpdated,
        });
  
        console.log("Result:", result);
    } else {
        console.log("existingData------------->", existingData);
        const newData = await prisma.button_analytics.create({
          data: {
            shop: shop,
            date: currentDate,
            click_count: 1,
            convertion_count: conversionCount || 0 || 0,
          },
        });
        console.log(newData);
    }

    return json({
      result: "Click count has been added",
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("c", error);
    return json(
      { error: "Error fetching button style from database: " + error.message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } finally {
    await prisma.$disconnect();
  }
};
