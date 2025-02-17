/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This operation Completes Migration of entities by pointing the connection strings to Premium namespace and any entities created after the operation will be under Premium Namespace. CompleteMigration operation will fail when entity migration is in-progress.
 *
 * @summary This operation Completes Migration of entities by pointing the connection strings to Premium namespace and any entities created after the operation will be under Premium Namespace. CompleteMigration operation will fail when entity migration is in-progress.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/Migrationconfigurations/SBMigrationconfigurationCompleteMigration.json
 */
async function migrationConfigurationsCompleteMigration(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "SubscriptionId";
  const resourceGroupName =
    process.env["SERVICEBUS_RESOURCE_GROUP"] || "ResourceGroup";
  const namespaceName = "sdk-Namespace-41";
  const configName = "$default";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.migrationConfigs.completeMigration(
    resourceGroupName,
    namespaceName,
    configName
  );
  console.log(result);
}

async function main(): Promise<void> {
  migrationConfigurationsCompleteMigration();
}

main().catch(console.error);
