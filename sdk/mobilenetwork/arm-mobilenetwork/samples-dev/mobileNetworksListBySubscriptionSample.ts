/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all the mobile networks in a subscription.
 *
 * @summary Lists all the mobile networks in a subscription.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/MobileNetworkListBySubscription.json
 */
async function listMobileNetworksInASubscription(): Promise<void> {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.mobileNetworks.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listMobileNetworksInASubscription();
}

main().catch(console.error);
