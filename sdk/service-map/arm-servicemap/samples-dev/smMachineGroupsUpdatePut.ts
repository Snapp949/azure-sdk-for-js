/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to Updates a machine group.
 *
 * @summary Updates a machine group.
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/MachineGroups/SMMachineGroupsUpdatePut.json
 */
import type { MachineGroup } from "@azure/arm-servicemap";
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";

async function smMachineGroupsUpdatePut(): Promise<void> {
  const subscriptionId = "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const machineGroupName = "ccfbf4bf-dc08-4371-9e9b-00a8d875d45a";
  const machineGroup: MachineGroup = {
    count: 1,
    displayName: "Foo",
    etag: "8cd3a8a1-4b1f-43fc-ae3c-b2c092561444",
    kind: "machineGroup",
    machines: [
      {
        id: "/subscriptions/63BE4E24-FDF0-4E9C-9342-6A5D5A359722/resourceGroups/rg-sm/providers/Microsoft.OperationalInsights/workspaces/D6F79F14-E563-469B-84B5-9286D2803B2F/machines/m-0fe4b501-7ac9-41d7-a4e1-1591a0789519",
        kind: "ref:machinewithhints",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const result = await client.machineGroups.update(
    resourceGroupName,
    workspaceName,
    machineGroupName,
    machineGroup,
  );
  console.log(result);
}

smMachineGroupsUpdatePut().catch(console.error);
