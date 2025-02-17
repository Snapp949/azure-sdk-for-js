/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceFabricMeshManagementClient } from "@azure/arm-servicefabricmesh";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the information about the service replica with the given name. The information include the description and other properties of the service replica.
 *
 * @summary Gets the information about the service replica with the given name. The information include the description and other properties of the service replica.
 * x-ms-original-file: specification/servicefabricmesh/resource-manager/Microsoft.ServiceFabricMesh/preview/2018-09-01-preview/examples/applications/services/replicas/get.json
 */
async function replicaGet(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRICMESH_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["SERVICEFABRICMESH_RESOURCE_GROUP"] || "sbz_demo";
  const applicationResourceName = "helloWorldApp";
  const serviceResourceName = "helloWorldService";
  const replicaName = "0";
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricMeshManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.serviceReplica.get(
    resourceGroupName,
    applicationResourceName,
    serviceResourceName,
    replicaName
  );
  console.log(result);
}

async function main(): Promise<void> {
  replicaGet();
}

main().catch(console.error);
