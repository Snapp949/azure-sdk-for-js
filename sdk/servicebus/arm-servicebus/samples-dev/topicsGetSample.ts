/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns a description for the specified topic.
 *
 * @summary Returns a description for the specified topic.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/Topics/SBTopicGet.json
 */
async function topicGet(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["SERVICEBUS_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-1617";
  const topicName = "sdk-Topics-5488";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.topics.get(resourceGroupName, namespaceName, topicName);
  console.log(result);
}

async function main(): Promise<void> {
  await topicGet();
}

main().catch(console.error);
