// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ServiceEndpointPoliciesGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified service Endpoint Policies in a specified resource group.
 *
 * @summary Gets the specified service Endpoint Policies in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceEndpointPolicyGet.json
 */
async function getServiceEndPointPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "testServiceEndpointPolicy";
  const options: ServiceEndpointPoliciesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}",
      subscriptionId,
      resourceGroupName,
      serviceEndpointPolicyName,
    )
    .get(options);
  console.log(result);
}

getServiceEndPointPolicy().catch(console.error);
