/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionsListByResourceOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsGetResponse,
  PrivateEndpointConnectionsPutOptionalParams,
  PrivateEndpointConnectionsPutResponse,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsDeleteResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PrivateEndpointConnections. */
export interface PrivateEndpointConnections {
  /**
   * The List operation gets information about the private endpoint connections associated with the
   * vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param options The options parameters.
   */
  listByResource(
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams
  ): PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /**
   * Gets the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams
  ): Promise<PrivateEndpointConnectionsGetResponse>;
  /**
   * Updates the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param properties The intended state of private endpoint connection.
   * @param options The options parameters.
   */
  put(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams
  ): Promise<PrivateEndpointConnectionsPutResponse>;
  /**
   * Deletes the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<PrivateEndpointConnectionsDeleteResponse>,
      PrivateEndpointConnectionsDeleteResponse
    >
  >;
  /**
   * Deletes the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams
  ): Promise<PrivateEndpointConnectionsDeleteResponse>;
}
