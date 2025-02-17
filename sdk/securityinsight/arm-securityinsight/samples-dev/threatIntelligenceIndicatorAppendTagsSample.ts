/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ThreatIntelligenceAppendTags } from "@azure/arm-securityinsight";
import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Append tags to a threat intelligence indicator.
 *
 * @summary Append tags to a threat intelligence indicator.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/threatintelligence/AppendTagsThreatIntelligence.json
 */
async function appendTagsToAThreatIntelligenceIndicator(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const name = "d9cd6f0b-96b9-3984-17cd-a779d1e15a93";
  const threatIntelligenceAppendTags: ThreatIntelligenceAppendTags = {
    threatIntelligenceTags: ["tag1", "tag2"],
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligenceIndicator.appendTags(
    resourceGroupName,
    workspaceName,
    name,
    threatIntelligenceAppendTags,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await appendTagsToAThreatIntelligenceIndicator();
}

main().catch(console.error);
