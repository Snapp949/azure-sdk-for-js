/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the managed network outbound rules for a machine learning workspace.
 *
 * @summary Lists the managed network outbound rules for a machine learning workspace.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/ManagedNetwork/listRule.json
 */
async function listManagedNetworkSettingsRule(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "aml-workspace-name";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedNetworkSettingsRule.list(
    resourceGroupName,
    workspaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedNetworkSettingsRule();
}

main().catch(console.error);
