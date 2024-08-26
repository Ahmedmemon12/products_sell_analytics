	import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
// import { authenticate, MONTHLY_PLAN } from "../shopify.server";s

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];


export const loader = async ({ request }) => {

  // const { billing, session, admin } = await authenticate.admin(request);
  // const { shop } = session;

  // const { hasActivePayment } = await billing.check({
  //   plans: [MONTHLY_PLAN],
  //   isTest: false,
  // });

  // if (!hasActivePayment) {
  //   await billing.require({
  //     plans: [MONTHLY_PLAN],
  //     onFailure: async () => billing.request({
  //       plan: MONTHLY_PLAN,
  //       isTest: false,
  //       returnUrl: ``,
  //     }),
  //   });
  // }

  // try {

  //   const webhook = new admin.rest.resources.Webhook({ session: session });

  //   webhook.address = `https://aa-drivers-neural-turtle.trycloudflare.com/api/webhook`;
  //   // webhook.address = `https://fast-checkout.helpify24.com/api/webhook`;
  //   webhook.topic = "orders/create";
  //   webhook.format = "json";
  //   await webhook.save({
  //     update: true,
  //   });

  //   console.log("Webhook created successfully:", webhook);
  //   return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
  //   // return json({ apiKey: "ac139a803b0d55144187be4708dd1b0d" || "" });
  // } catch (error) {
  //   console.error("Error creating webhook:", error);
  //   return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
  //   // return json({ apiKey: "ac139a803b0d55144187be4708dd1b0d" || "" });
  // }
  console.log("Api key:",process.env.SHOPIFY_API_KEY);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};


export default function App() {
  const { apiKey } = useLoaderData();
  console.log("Api key:",apiKey);

  return (
    <AppProvider isEmbeddedApp apiKey={'c153ffe3bbdacf470c0198c71cd53a46'}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
