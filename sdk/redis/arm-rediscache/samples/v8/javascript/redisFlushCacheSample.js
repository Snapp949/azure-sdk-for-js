/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes all of the keys in a cache.
 *
 * @summary Deletes all of the keys in a cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFlush.json
 */
async function redisCacheFlush() {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subcription-id";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "resource-group-name";
  const cacheName = "cache-name";
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginFlushCacheAndWait(resourceGroupName, cacheName);
  console.log(result);
}

async function main() {
  await redisCacheFlush();
}

main().catch(console.error);
