/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ScheduledQueryRuleResourcePatch } from "@azure/arm-monitor";
import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a scheduled query rule.
 *
 * @summary Update a scheduled query rule.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2023-12-01/examples/patchScheduledQueryRule.json
 */
async function createOrUpdateAScheduledQueryRule(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "dd4bfc94-a096-412b-9c43-4bd13e35afbc";
  const resourceGroupName = process.env["MONITOR_RESOURCE_GROUP"] || "QueryResourceGroupName";
  const ruleName = "heartbeat";
  const parameters: ScheduledQueryRuleResourcePatch = { enabled: false };
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.scheduledQueryRules.update(resourceGroupName, ruleName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAScheduledQueryRule();
}

main().catch(console.error);
