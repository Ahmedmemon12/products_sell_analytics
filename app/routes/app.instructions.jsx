import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { Card, Text, BlockStack, Page } from "@shopify/polaris";
import { useTranslation } from "react-i18next";


export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function Instruction() {
  const { apiKey } = useLoaderData();
  const { t } = useTranslation();
  return (
    <Page fullWidth title="Instructions">

      <Card>

        <BlockStack gap={"1000"}>
          <BlockStack gap={"300"}>
            <Text variant="heading1xl" fontWeight="bold"  >
              {t('howToAddAppBlock')}
            </Text >
            <ul>
              <li>{t('howtoenableapp')}</li>
              <li>{t('gotothemeeditor')}</li>
              <li>{t('selectDefaultProductPage')}</li>
              <li>{t('selectAreaToDisplayAppBlock')}</li>
              <li>{t('clickAddApp')}</li>
            </ul>
            <Text variant="heading1xl"   >
              <strong>{t('note')}: </strong>{t('enable_app_from_admin')}</Text >
          </BlockStack>

          <BlockStack gap={"300"}>
            <Text variant="heading1xl" fontWeight="bold"  >
              {t('customizingButton')}
            </Text >
            <p>{t('personalizeButtonAppearance')}</p>
            <ul>
              <li><strong>{t('changeButtonText')}</strong> {t('editButtonText')}</li>
              <li><strong>{t('customizeButtonAppearance')}</strong>{t('chooseColorFont')}</li>
            </ul>
          </BlockStack>
          <BlockStack gap={"300"}>
            <Text variant="heading1xl" fontWeight="bold" element="h2">{t('usingButtonProductPages')}</Text >
            <p>{t("buttonAutomaticAppearance")}</p>
          </BlockStack>
          <BlockStack gap={"300"}>
            <Text variant="heading1xl" fontWeight="bold" element="h2">{t("additionalNotes")}</Text >
            <ul>
              <li>{t("buttonFunctionalityDefault")}</li>
              <li>{t("fastCheckoutSeamlessIntegration")}</li>
            </ul>
          </BlockStack>
          <BlockStack gap={"300"}>
            <Text variant="heading1xl" fontWeight="bold" element="h2">{t("support")}</Text >
            <p>{t("supportContactInfo")}</p>
          </BlockStack>


        </BlockStack>
      </Card>

    </Page >
  )
}

