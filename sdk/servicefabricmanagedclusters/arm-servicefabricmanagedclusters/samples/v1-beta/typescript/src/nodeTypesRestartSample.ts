/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  NodeTypeActionParameters,
  ServiceFabricManagedClustersManagementClient,
} from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Restarts one or more nodes on the node type. It will disable the fabric nodes, trigger a restart on the VMs and activate the nodes back again.
 *
 * @summary Restarts one or more nodes on the node type. It will disable the fabric nodes, trigger a restart on the VMs and activate the nodes back again.
 * x-ms-original-file: specification/servicefabricmanagedclusters/resource-manager/Microsoft.ServiceFabric/preview/2024-09-01-preview/examples/RestartNodes_example.json
 */
async function restartNodes(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRICMANAGEDCLUSTERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["SERVICEFABRICMANAGEDCLUSTERS_RESOURCE_GROUP"] || "resRg";
  const clusterName = "myCluster";
  const nodeTypeName = "BE";
  const parameters: NodeTypeActionParameters = { nodes: ["BE_0", "BE_3"] };
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagedClustersManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.nodeTypes.beginRestartAndWait(
    resourceGroupName,
    clusterName,
    nodeTypeName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  restartNodes();
}

main().catch(console.error);
