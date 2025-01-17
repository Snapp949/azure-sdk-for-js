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
 * This sample demonstrates how to Deletes a Visual Studio Team Services account resource.
 *
 * @summary Deletes a Visual Studio Team Services account resource.
 * x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/DeleteResource.json
 */
async function deleteAnAccountResource(): Promise<void> {
  const subscriptionId = "0de7f055-dbea-498d-8e9e-da287eedca90";
  const resourceGroupName = "VS-Example-Group";
  const resourceName = "Example";
  const credential = new DefaultAzureCredential();
  const client = new VisualStudioResourceProviderClient(
    credential,
    subscriptionId
  );
  const result = await client.accounts.delete(resourceGroupName, resourceName);
  console.log(result);
}

deleteAnAccountResource().catch(console.error);
