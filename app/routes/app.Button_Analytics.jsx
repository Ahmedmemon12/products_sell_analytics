



import React, { useState, useEffect } from 'react';
import { Page, Card, DataTable, Button, DatePicker } from '@shopify/polaris';

import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { authenticate } from '../shopify.server';
import { PrismaClient } from '@prisma/client';
import { useTranslation } from 'react-i18next';

export const loader = async ({ request }) => {
  const prisma = new PrismaClient();
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

  try {
    const data = await prisma.button_analytics.findMany({
      where: where
    });

    return json(data);
  } catch (error) {
    console.log(error);
    return json({ error: 'Error fetching button analytics data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

const AnalyticsPage = () => {
  const loaderData = useLoaderData();
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [clicks, setClicks] = useState(0);
  const [conversions, setConversions] = useState(0);
  const [data, setData] = useState(loaderData);
  const { t } = useTranslation();
  useEffect(() => {


    const fetchData = async () => {
      try {

        const start = selectedDates.start.toLocaleDateString('en-CA');
        const end = selectedDates.end.toLocaleDateString('en-CA');
        
        const response = await fetch(`/api/button_analytics/get?start=${start}&end=${end}`);
        const result = await response.json();

        if (response.ok) {
          setData(result);
          const totalClicks = result.reduce((acc, item) => acc + item.click_count, 0);
          const totalConversions = result.reduce((acc, item) => acc + item.convertion_count, 0);
          setClicks(totalClicks);
          setConversions(totalConversions);
        } else {
          console.error("Error fetching data:", result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDates]);

  const handleDateChange = (range) => {
    setSelectedDates(range);
  };

  const conversionRate = clicks ? (conversions / clicks) * 100 : 0;

  return (
    <Page fullWidth title={t("Analytics")}>
      <Card sectioned>
        <DatePicker
          month={selectedDates.start.getMonth()}
          year={selectedDates.start.getFullYear()}
          onChange={handleDateChange}
          onMonthChange={(month, year) => handleDateChange({ start: new Date(year, month, 1), end: new Date(year, month + 1, 0) })}
          selected={selectedDates}
          allowRange={true}
        />
      </Card>
      <Card sectioned>
        <DataTable
          columnContentTypes={['text', 'numeric']}
          headings={[t("metric"), t('value')]}
          rows={[
            [t("clicks"), clicks],
            [t('Conversions'), conversions],
            [t('conversionRate'), `${conversionRate.toFixed(2)}%`],
          ]}
        />
      </Card>
    </Page>
  );
};

export default AnalyticsPage;
