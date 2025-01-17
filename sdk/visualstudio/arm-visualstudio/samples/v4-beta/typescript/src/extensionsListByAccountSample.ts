/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { VisualStudioResourceProviderClient } from "@azure/arm-visualstudio";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the details of the extension resources created within the resource group.
 *
 * @summary Gets the details of the extension resources created within the resource group.
 * x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetExtensionResources_List.json
 */
async function getAListOfExtensionResourcesWithinTheResourceGroup(): Promise<void> {
  const subscriptionId = "0de7f055-dbea-498d-8e9e-da287eedca90";
  const resourceGroupName = "VS-Example-Group";
  const accountResourceName = "ExampleAccount";
  const credential = new DefaultAzureCredential();
  const client = new VisualStudioResourceProviderClient(
    credential,
    subscriptionId
  );
  const result = await client.extensions.listByAccount(
    resourceGroupName,
    accountResourceName
  );
  console.log(result);
}

getAListOfExtensionResourcesWithinTheResourceGroup().catch(console.error);
