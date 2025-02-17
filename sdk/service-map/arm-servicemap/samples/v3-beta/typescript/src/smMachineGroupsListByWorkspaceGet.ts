/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Returns all machine groups during the specified time interval.
 *
 * @summary Returns all machine groups during the specified time interval.
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/MachineGroups/SMMachineGroupsListByWorkspaceGet.json
 */
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";

async function smMachineGroupsListByWorkspaceGet(): Promise<void> {
  const subscriptionId = "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const startTime = new Date("2018-01-08T19:17:49.333139Z");
  const endTime = new Date("2018-01-08T19:19:49.333139Z");
  const options = { startTime: startTime, endTime: endTime };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.machineGroups.listByWorkspace(
    resourceGroupName,
    workspaceName,
    options
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

smMachineGroupsListByWorkspaceGet().catch(console.error);
