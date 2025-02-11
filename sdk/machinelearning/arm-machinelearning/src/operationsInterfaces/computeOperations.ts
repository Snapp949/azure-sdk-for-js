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
  ComputeResource,
  ComputeListOptionalParams,
  AmlComputeNodeInformation,
  ComputeListNodesOptionalParams,
  ComputeGetOptionalParams,
  ComputeGetResponse,
  ComputeCreateOrUpdateOptionalParams,
  ComputeCreateOrUpdateResponse,
  ClusterUpdateParameters,
  ComputeUpdateOptionalParams,
  ComputeUpdateResponse,
  UnderlyingResourceAction,
  ComputeDeleteOptionalParams,
  ComputeListKeysOptionalParams,
  ComputeListKeysResponse,
  ComputeStartOptionalParams,
  ComputeStopOptionalParams,
  ComputeRestartOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ComputeOperations. */
export interface ComputeOperations {
  /**
   * Gets computes in specified workspace.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    workspaceName: string,
    options?: ComputeListOptionalParams,
  ): PagedAsyncIterableIterator<ComputeResource>;
  /**
   * Get the details (e.g IP address, port etc) of all the compute nodes in the compute.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  listNodes(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeListNodesOptionalParams,
  ): PagedAsyncIterableIterator<AmlComputeNodeInformation>;
  /**
   * Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not
   * returned - use 'keys' nested resource to get them.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeGetOptionalParams,
  ): Promise<ComputeGetResponse>;
  /**
   * Creates or updates compute. This call will overwrite a compute if it exists. This is a
   * nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that
   * it does not exist yet.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param parameters Payload with Machine Learning compute definition.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ComputeCreateOrUpdateResponse>,
      ComputeCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates compute. This call will overwrite a compute if it exists. This is a
   * nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that
   * it does not exist yet.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param parameters Payload with Machine Learning compute definition.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeCreateOrUpdateOptionalParams,
  ): Promise<ComputeCreateOrUpdateResponse>;
  /**
   * Updates properties of a compute. This call will overwrite a compute if it exists. This is a
   * nonrecoverable operation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param parameters Additional parameters for cluster update.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ComputeUpdateResponse>,
      ComputeUpdateResponse
    >
  >;
  /**
   * Updates properties of a compute. This call will overwrite a compute if it exists. This is a
   * nonrecoverable operation.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param parameters Additional parameters for cluster update.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeUpdateOptionalParams,
  ): Promise<ComputeUpdateResponse>;
  /**
   * Deletes specified Machine Learning compute.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param underlyingResourceAction Delete the underlying compute if 'Delete', or detach the underlying
   *                                 compute from workspace if 'Detach'.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes specified Machine Learning compute.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param underlyingResourceAction Delete the underlying compute if 'Delete', or detach the underlying
   *                                 compute from workspace if 'Detach'.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets secrets related to Machine Learning compute (storage keys, service credentials, etc).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeListKeysOptionalParams,
  ): Promise<ComputeListKeysResponse>;
  /**
   * Posts a start action to a compute instance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  beginStart(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStartOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Posts a start action to a compute instance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  beginStartAndWait(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStartOptionalParams,
  ): Promise<void>;
  /**
   * Posts a stop action to a compute instance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  beginStop(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStopOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Posts a stop action to a compute instance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  beginStopAndWait(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStopOptionalParams,
  ): Promise<void>;
  /**
   * Posts a restart action to a compute instance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  beginRestart(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeRestartOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Posts a restart action to a compute instance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param computeName Name of the Azure Machine Learning compute.
   * @param options The options parameters.
   */
  beginRestartAndWait(
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeRestartOptionalParams,
  ): Promise<void>;
}
