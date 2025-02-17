/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Replica } from "@azure/arm-signalr";
import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Operation to update an exiting replica.
 *
 * @summary Operation to update an exiting replica.
 * x-ms-original-file: specification/signalr/resource-manager/Microsoft.SignalRService/preview/2023-08-01-preview/examples/SignalRReplicas_Update.json
 */
async function signalRReplicasUpdate(): Promise<void> {
  const subscriptionId =
    process.env["SIGNALR_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SIGNALR_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "mySignalRService";
  const replicaName = "mySignalRService-eastus";
  const parameters: Replica = {
    location: "eastus",
    resourceStopped: "false",
    sku: { name: "Premium_P1", capacity: 1, tier: "Premium" },
    tags: { key1: "value1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRReplicas.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    replicaName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRReplicasUpdate();
}

main().catch(console.error);
