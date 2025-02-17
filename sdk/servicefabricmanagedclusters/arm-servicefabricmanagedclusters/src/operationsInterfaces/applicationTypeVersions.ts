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
  ApplicationTypeVersionResource,
  ApplicationTypeVersionsListByApplicationTypesOptionalParams,
  ApplicationTypeVersionsGetOptionalParams,
  ApplicationTypeVersionsGetResponse,
  ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ApplicationTypeVersionsCreateOrUpdateResponse,
  ApplicationTypeVersionUpdateParameters,
  ApplicationTypeVersionsUpdateOptionalParams,
  ApplicationTypeVersionsUpdateResponse,
  ApplicationTypeVersionsDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ApplicationTypeVersions. */
export interface ApplicationTypeVersions {
  /**
   * Gets all application type version resources created or in the process of being created in the
   * Service Fabric managed application type name resource.
   * @param resourceGroupName The name of the resource group.
   * @param clusterName The name of the cluster resource.
   * @param applicationTypeName The name of the application type name resource.
   * @param options The options parameters.
   */
  listByApplicationTypes(
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    options?: ApplicationTypeVersionsListByApplicationTypesOptionalParams,
  ): PagedAsyncIterableIterator<ApplicationTypeVersionResource>;
  /**
   * Get a Service Fabric managed application type version resource created or in the process of being
   * created in the Service Fabric managed application type name resource.
   * @param resourceGroupName The name of the resource group.
   * @param clusterName The name of the cluster resource.
   * @param applicationTypeName The name of the application type name resource.
   * @param version The application type version.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsGetOptionalParams,
  ): Promise<ApplicationTypeVersionsGetResponse>;
  /**
   * Create or update a Service Fabric managed application type version resource with the specified name.
   * @param resourceGroupName The name of the resource group.
   * @param clusterName The name of the cluster resource.
   * @param applicationTypeName The name of the application type name resource.
   * @param version The application type version.
   * @param parameters The application type version resource.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionResource,
    options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ApplicationTypeVersionsCreateOrUpdateResponse>,
      ApplicationTypeVersionsCreateOrUpdateResponse
    >
  >;
  /**
   * Create or update a Service Fabric managed application type version resource with the specified name.
   * @param resourceGroupName The name of the resource group.
   * @param clusterName The name of the cluster resource.
   * @param applicationTypeName The name of the application type name resource.
   * @param version The application type version.
   * @param parameters The application type version resource.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionResource,
    options?: ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ): Promise<ApplicationTypeVersionsCreateOrUpdateResponse>;
  /**
   * Updates the tags of an application type version resource of a given managed cluster.
   * @param resourceGroupName The name of the resource group.
   * @param clusterName The name of the cluster resource.
   * @param applicationTypeName The name of the application type name resource.
   * @param version The application type version.
   * @param parameters The application type version resource updated tags.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    parameters: ApplicationTypeVersionUpdateParameters,
    options?: ApplicationTypeVersionsUpdateOptionalParams,
  ): Promise<ApplicationTypeVersionsUpdateResponse>;
  /**
   * Delete a Service Fabric managed application type version resource with the specified name.
   * @param resourceGroupName The name of the resource group.
   * @param clusterName The name of the cluster resource.
   * @param applicationTypeName The name of the application type name resource.
   * @param version The application type version.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete a Service Fabric managed application type version resource with the specified name.
   * @param resourceGroupName The name of the resource group.
   * @param clusterName The name of the cluster resource.
   * @param applicationTypeName The name of the application type name resource.
   * @param version The application type version.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    clusterName: string,
    applicationTypeName: string,
    version: string,
    options?: ApplicationTypeVersionsDeleteOptionalParams,
  ): Promise<void>;
}
