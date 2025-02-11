/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { CodeContainer } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update Code container.
 *
 * @summary Create or update Code container.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Registry/CodeContainer/createOrUpdate.json
 */
async function createOrUpdateRegistryCodeContainer(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "testrg123";
  const registryName = "testregistry";
  const codeName = "testContainer";
  const body: CodeContainer = {
    properties: {
      description: "string",
      tags: { tag1: "value1", tag2: "value2" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryCodeContainers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    registryName,
    codeName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryCodeContainer();
}

main().catch(console.error);
