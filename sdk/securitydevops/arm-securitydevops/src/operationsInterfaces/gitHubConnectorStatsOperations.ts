/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  GitHubConnectorStatsGetOptionalParams,
  GitHubConnectorStatsGetResponse
} from "../models/index.js";

/** Interface representing a GitHubConnectorStatsOperations. */
export interface GitHubConnectorStatsOperations {
  /**
   * Returns the summary of the GitHub Connector Stats.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param gitHubConnectorName Name of the GitHub Connector.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    gitHubConnectorName: string,
    options?: GitHubConnectorStatsGetOptionalParams
  ): Promise<GitHubConnectorStatsGetResponse>;
}
