/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Security compliance results in the subscription
 *
 * @summary Security compliance results in the subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2017-08-01/examples/ComplianceResults/ListComplianceResults_example.json
 */
async function getComplianceResultsOnSubscription(): Promise<void> {
  const scope = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (let item of client.complianceResults.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  getComplianceResultsOnSubscription();
}

main().catch(console.error);
