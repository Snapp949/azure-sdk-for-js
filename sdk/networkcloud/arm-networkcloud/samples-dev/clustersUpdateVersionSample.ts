/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  ClusterUpdateVersionParameters} from "@azure/arm-networkcloud";
import {
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the version of the provided cluster to one of the available supported versions.
 *
 * @summary Update the version of the provided cluster to one of the available supported versions.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2024-07-01/examples/Clusters_UpdateVersion.json
 */
async function updateClusterVersion(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const clusterName = "clusterName";
  const clusterUpdateVersionParameters: ClusterUpdateVersionParameters = {
    targetClusterVersion: "2.0",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.beginUpdateVersionAndWait(
    resourceGroupName,
    clusterName,
    clusterUpdateVersionParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateClusterVersion();
}

main().catch(console.error);
