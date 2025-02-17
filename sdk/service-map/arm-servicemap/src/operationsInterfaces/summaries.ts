/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  SummariesGetMachinesOptionalParams,
  SummariesGetMachinesResponse
} from "../models/index.js";

/** Interface representing a Summaries. */
export interface Summaries {
  /**
   * Returns summary information about the machines in the workspace.
   * @param resourceGroupName Resource group name within the specified subscriptionId.
   * @param workspaceName OMS workspace containing the resources of interest.
   * @param options The options parameters.
   */
  getMachines(
    resourceGroupName: string,
    workspaceName: string,
    options?: SummariesGetMachinesOptionalParams
  ): Promise<SummariesGetMachinesResponse>;
}
