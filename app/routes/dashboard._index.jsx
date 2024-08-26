import {
    Badge,
    ButtonGroup,
    FullscreenBar,
    Button,
    Text,
  } from "@shopify/polaris";
  import { useState, useCallback } from 'react';
  import "../css/custom-polaris.css";
  import { NavMenu } from "@shopify/app-bridge-react";
  import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
  import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
  

  export default function DashboardIndex() {

 
  
    return (
   
          <Text variant="headingLg" as="p">
           Dashboard
          </Text>
        
    )
  }
  
  