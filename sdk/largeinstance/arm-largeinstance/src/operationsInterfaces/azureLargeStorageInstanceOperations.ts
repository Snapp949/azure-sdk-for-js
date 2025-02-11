/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AzureLargeStorageInstance,
  AzureLargeStorageInstanceListBySubscriptionOptionalParams,
  AzureLargeStorageInstanceListByResourceGroupOptionalParams,
  AzureLargeStorageInstanceGetOptionalParams,
  AzureLargeStorageInstanceGetResponse,
  AzureLargeStorageInstanceTagsUpdate,
  AzureLargeStorageInstanceUpdateOptionalParams,
  AzureLargeStorageInstanceUpdateResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AzureLargeStorageInstanceOperations. */
export interface AzureLargeStorageInstanceOperations {
  /**
   * Gets a list of AzureLargeStorageInstances in the specified subscription. The
   * operations returns various properties of each Azure LargeStorage instance.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: AzureLargeStorageInstanceListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<AzureLargeStorageInstance>;
  /**
   * Gets a list of AzureLargeStorageInstances in the specified subscription and
   * resource group. The operations returns various properties of each Azure
   * LargeStorage instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: AzureLargeStorageInstanceListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<AzureLargeStorageInstance>;
  /**
   * Gets an Azure Large Storage instance for the specified subscription, resource
   * group, and instance name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeStorageInstanceName Name of the AzureLargeStorageInstance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    azureLargeStorageInstanceName: string,
    options?: AzureLargeStorageInstanceGetOptionalParams,
  ): Promise<AzureLargeStorageInstanceGetResponse>;
  /**
   * Patches the Tags field of a Azure Large Storage Instance for the specified
   * subscription, resource group, and instance name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureLargeStorageInstanceName Name of the AzureLargeStorageInstance.
   * @param tagsParameter The resource properties to be updated.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    azureLargeStorageInstanceName: string,
    tagsParameter: AzureLargeStorageInstanceTagsUpdate,
    options?: AzureLargeStorageInstanceUpdateOptionalParams,
  ): Promise<AzureLargeStorageInstanceUpdateResponse>;
}
