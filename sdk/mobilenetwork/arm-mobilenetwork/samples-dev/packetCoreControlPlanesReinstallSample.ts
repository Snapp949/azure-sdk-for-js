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
 * This sample demonstrates how to Reinstall the specified packet core control plane. This action will try to restore the packet core to the installed state that was disrupted by a transient failure. This action will cause a service outage.
 *
 * @summary Reinstall the specified packet core control plane. This action will try to restore the packet core to the installed state that was disrupted by a transient failure. This action will cause a service outage.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/PacketCoreControlPlaneReinstall.json
 */
async function reinstallPacketCoreControlPlane(): Promise<void> {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MOBILENETWORK_RESOURCE_GROUP"] || "rg1";
  const packetCoreControlPlaneName = "TestPacketCoreCP";
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const result = await client.packetCoreControlPlanes.beginReinstallAndWait(
    resourceGroupName,
    packetCoreControlPlaneName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reinstallPacketCoreControlPlane();
}

main().catch(console.error);
