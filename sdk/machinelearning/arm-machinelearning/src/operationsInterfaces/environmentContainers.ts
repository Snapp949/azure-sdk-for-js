/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  EnvironmentContainer,
  EnvironmentContainersListOptionalParams,
  EnvironmentContainersDeleteOptionalParams,
  EnvironmentContainersGetOptionalParams,
  EnvironmentContainersGetResponse,
  EnvironmentContainersCreateOrUpdateOptionalParams,
  EnvironmentContainersCreateOrUpdateResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a EnvironmentContainers. */
export interface EnvironmentContainers {
  /**
   * List environment containers.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    workspaceName: string,
    options?: EnvironmentContainersListOptionalParams,
  ): PagedAsyncIterableIterator<EnvironmentContainer>;
  /**
   * Delete container.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param name Container name. This is case-sensitive.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: EnvironmentContainersDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Get container.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param name Container name. This is case-sensitive.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: EnvironmentContainersGetOptionalParams,
  ): Promise<EnvironmentContainersGetResponse>;
  /**
   * Create or update container.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param name Container name. This is case-sensitive.
   * @param body Container entity to create or update.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: EnvironmentContainer,
    options?: EnvironmentContainersCreateOrUpdateOptionalParams,
  ): Promise<EnvironmentContainersCreateOrUpdateResponse>;
}
