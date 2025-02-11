/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { RegistryModelVersionsListOptionalParams } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List versions.
 *
 * @summary List versions.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Registry/ModelVersion/list.json
 */
async function listRegistryModelVersion(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const registryName = "my-aml-registry";
  const modelName = "string";
  const orderBy = "string";
  const top = 1;
  const version = "string";
  const description = "string";
  const tags = "string";
  const properties = "string";
  const options: RegistryModelVersionsListOptionalParams = {
    orderBy,
    top,
    version,
    description,
    tags,
    properties,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registryModelVersions.list(
    resourceGroupName,
    registryName,
    modelName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listRegistryModelVersion();
}

main().catch(console.error);
