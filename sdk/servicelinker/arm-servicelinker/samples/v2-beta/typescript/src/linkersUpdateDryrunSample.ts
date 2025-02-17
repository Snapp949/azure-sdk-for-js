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
  DryrunPatch,
  ServiceLinkerManagementClient,
} from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to add a dryrun job to do necessary check before actual creation
 *
 * @summary add a dryrun job to do necessary check before actual creation
 * x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/preview/2024-07-01-preview/examples/PatchDryrun.json
 */
async function patchDryrun(): Promise<void> {
  const resourceUri =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app";
  const dryrunName = "dryrunName";
  const parameters: DryrunPatch = {
    parameters: {
      actionName: "createOrUpdate",
      authInfo: {
        name: "name",
        authType: "secret",
        secretInfo: { secretType: "rawValue", value: "secret" },
      },
      targetService: {
        type: "AzureResource",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DocumentDb/databaseAccounts/test-acc/mongodbDatabases/test-db",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceLinkerManagementClient(credential);
  const result = await client.linkers.beginUpdateDryrunAndWait(
    resourceUri,
    dryrunName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  patchDryrun();
}

main().catch(console.error);
