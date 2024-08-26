import { PrismaClient } from '@prisma/client';
import { json } from '@remix-run/node';
import { authenticate } from '../shopify.server';

const prisma = new PrismaClient();

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const url = new URL(request.url);
  const startDate = url.searchParams.get('start');
  const endDate = url.searchParams.get('end');
  let where = {
    shop: shop,
  };

  if (startDate && endDate) {
    where.date = {
      gte: startDate,
      lte: endDate
    };
  } else if (startDate) {
    where.date = startDate;
  }
  // console.log("where: ", where)
  try {
    const data = await prisma.button_analytics.findMany({
      where: where
    });

    return json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.log(error);
    return json({ error: 'Error fetching button analytics data' }, {
      status: 500, headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } finally {
    await prisma.$disconnect();
  }
};
