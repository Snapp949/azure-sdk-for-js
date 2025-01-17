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
  ExtensionResourceRequest,
  VisualStudioResourceProviderClient
} from "@azure/arm-visualstudio";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates an existing extension registration for the Visual Studio Team Services account.
 *
 * @summary Updates an existing extension registration for the Visual Studio Team Services account.
 * x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/UpdateExtensionResource.json
 */
async function updateAnExtensionResource(): Promise<void> {
  const subscriptionId = "0de7f055-dbea-498d-8e9e-da287eedca90";
  const resourceGroupName = "VS-Example-Group";
  const accountResourceName = "ExampleAccount";
  const extensionResourceName = "Example";
  const body: ExtensionResourceRequest = {
    location: "Central US",
    plan: {
      name: "ExamplePlan",
      product: "ExampleExtensionName",
      promotionCode: "",
      publisher: "ExampleExtensionPublisher",
      version: "1.0"
    },
    properties: {},
    tags: {}
  };
  const credential = new DefaultAzureCredential();
  const client = new VisualStudioResourceProviderClient(
    credential,
    subscriptionId
  );
  const result = await client.extensions.update(
    resourceGroupName,
    accountResourceName,
    extensionResourceName,
    body
  );
  console.log(result);
}

updateAnExtensionResource().catch(console.error);
