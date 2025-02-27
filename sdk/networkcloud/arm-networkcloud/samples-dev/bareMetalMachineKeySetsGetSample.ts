/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get bare metal machine key set of the provided cluster.
 *
 * @summary Get bare metal machine key set of the provided cluster.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2024-07-01/examples/BareMetalMachineKeySets_Get.json
 */
async function getBareMetalMachineKeySetOfCluster(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const clusterName = "clusterName";
  const bareMetalMachineKeySetName = "bareMetalMachineKeySetName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachineKeySets.get(
    resourceGroupName,
    clusterName,
    bareMetalMachineKeySetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getBareMetalMachineKeySetOfCluster();
}

main().catch(console.error);
