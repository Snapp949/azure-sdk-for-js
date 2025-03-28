/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  LoadBalancingRule,
  LoadBalancerLoadBalancingRulesListOptionalParams,
  LoadBalancerLoadBalancingRulesGetOptionalParams,
  LoadBalancerLoadBalancingRulesGetResponse,
  LoadBalancerLoadBalancingRulesHealthOptionalParams,
  LoadBalancerLoadBalancingRulesHealthResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a LoadBalancerLoadBalancingRules. */
export interface LoadBalancerLoadBalancingRules {
  /**
   * Gets all the load balancing rules in a load balancer.
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerLoadBalancingRulesListOptionalParams,
  ): PagedAsyncIterableIterator<LoadBalancingRule>;
  /**
   * Gets the specified load balancer load balancing rule.
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param loadBalancingRuleName The name of the load balancing rule.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    loadBalancerName: string,
    loadBalancingRuleName: string,
    options?: LoadBalancerLoadBalancingRulesGetOptionalParams,
  ): Promise<LoadBalancerLoadBalancingRulesGetResponse>;
  /**
   * Get health details of a load balancing rule.
   * @param groupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param loadBalancingRuleName The name of the load balancing rule.
   * @param options The options parameters.
   */
  beginHealth(
    groupName: string,
    loadBalancerName: string,
    loadBalancingRuleName: string,
    options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<LoadBalancerLoadBalancingRulesHealthResponse>,
      LoadBalancerLoadBalancingRulesHealthResponse
    >
  >;
  /**
   * Get health details of a load balancing rule.
   * @param groupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param loadBalancingRuleName The name of the load balancing rule.
   * @param options The options parameters.
   */
  beginHealthAndWait(
    groupName: string,
    loadBalancerName: string,
    loadBalancingRuleName: string,
    options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
  ): Promise<LoadBalancerLoadBalancingRulesHealthResponse>;
}
