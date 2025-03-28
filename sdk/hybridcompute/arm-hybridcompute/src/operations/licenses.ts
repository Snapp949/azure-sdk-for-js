/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Licenses } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { HybridComputeManagementClient } from "../hybridComputeManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  License,
  LicensesListByResourceGroupNextOptionalParams,
  LicensesListByResourceGroupOptionalParams,
  LicensesListByResourceGroupResponse,
  LicensesListBySubscriptionNextOptionalParams,
  LicensesListBySubscriptionOptionalParams,
  LicensesListBySubscriptionResponse,
  LicensesValidateLicenseOptionalParams,
  LicensesValidateLicenseResponse,
  LicensesCreateOrUpdateOptionalParams,
  LicensesCreateOrUpdateResponse,
  LicenseUpdate,
  LicensesUpdateOptionalParams,
  LicensesUpdateResponse,
  LicensesGetOptionalParams,
  LicensesGetResponse,
  LicensesDeleteOptionalParams,
  LicensesListByResourceGroupNextResponse,
  LicensesListBySubscriptionNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Licenses operations. */
export class LicensesImpl implements Licenses {
  private readonly client: HybridComputeManagementClient;

  /**
   * Initialize a new instance of the class Licenses class.
   * @param client Reference to the service client
   */
  constructor(client: HybridComputeManagementClient) {
    this.client = client;
  }

  /**
   * The operation to get all licenses of a non-Azure machine
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: LicensesListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<License> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: LicensesListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<License[]> {
    let result: LicensesListByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResourceGroup(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: LicensesListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<License> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * The operation to get all licenses of a non-Azure machine
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: LicensesListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<License> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySubscriptionPagingPage(options, settings);
      },
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: LicensesListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<License[]> {
    let result: LicensesListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: LicensesListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<License> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * The operation to validate a license.
   * @param parameters Parameters supplied to the license validation operation.
   * @param options The options parameters.
   */
  async beginValidateLicense(
    parameters: License,
    options?: LicensesValidateLicenseOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<LicensesValidateLicenseResponse>,
      LicensesValidateLicenseResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<LicensesValidateLicenseResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { parameters, options },
      spec: validateLicenseOperationSpec,
    });
    const poller = await createHttpPoller<
      LicensesValidateLicenseResponse,
      OperationState<LicensesValidateLicenseResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to validate a license.
   * @param parameters Parameters supplied to the license validation operation.
   * @param options The options parameters.
   */
  async beginValidateLicenseAndWait(
    parameters: License,
    options?: LicensesValidateLicenseOptionalParams,
  ): Promise<LicensesValidateLicenseResponse> {
    const poller = await this.beginValidateLicense(parameters, options);
    return poller.pollUntilDone();
  }

  /**
   * The operation to create or update a license.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param licenseName The name of the license.
   * @param parameters Parameters supplied to the Create license operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    licenseName: string,
    parameters: License,
    options?: LicensesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<LicensesCreateOrUpdateResponse>,
      LicensesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<LicensesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, licenseName, parameters, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      LicensesCreateOrUpdateResponse,
      OperationState<LicensesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to create or update a license.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param licenseName The name of the license.
   * @param parameters Parameters supplied to the Create license operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    licenseName: string,
    parameters: License,
    options?: LicensesCreateOrUpdateOptionalParams,
  ): Promise<LicensesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      licenseName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to update a license.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param licenseName The name of the license.
   * @param parameters Parameters supplied to the Update license operation.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    licenseName: string,
    parameters: LicenseUpdate,
    options?: LicensesUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<LicensesUpdateResponse>,
      LicensesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<LicensesUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, licenseName, parameters, options },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      LicensesUpdateResponse,
      OperationState<LicensesUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to update a license.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param licenseName The name of the license.
   * @param parameters Parameters supplied to the Update license operation.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    licenseName: string,
    parameters: LicenseUpdate,
    options?: LicensesUpdateOptionalParams,
  ): Promise<LicensesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      licenseName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Retrieves information about the view of a license.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param licenseName The name of the license.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    licenseName: string,
    options?: LicensesGetOptionalParams,
  ): Promise<LicensesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, licenseName, options },
      getOperationSpec,
    );
  }

  /**
   * The operation to delete a license.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param licenseName The name of the license.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    licenseName: string,
    options?: LicensesDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, licenseName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * The operation to delete a license.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param licenseName The name of the license.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    licenseName: string,
    options?: LicensesDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      licenseName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to get all licenses of a non-Azure machine
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: LicensesListByResourceGroupOptionalParams,
  ): Promise<LicensesListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * The operation to get all licenses of a non-Azure machine
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: LicensesListBySubscriptionOptionalParams,
  ): Promise<LicensesListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: LicensesListByResourceGroupNextOptionalParams,
  ): Promise<LicensesListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: LicensesListBySubscriptionNextOptionalParams,
  ): Promise<LicensesListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const validateLicenseOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/validateLicense",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.License,
    },
    201: {
      bodyMapper: Mappers.License,
    },
    202: {
      bodyMapper: Mappers.License,
    },
    204: {
      bodyMapper: Mappers.License,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.License,
    },
    201: {
      bodyMapper: Mappers.License,
    },
    202: {
      bodyMapper: Mappers.License,
    },
    204: {
      bodyMapper: Mappers.License,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.licenseName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.License,
    },
    201: {
      bodyMapper: Mappers.License,
    },
    202: {
      bodyMapper: Mappers.License,
    },
    204: {
      bodyMapper: Mappers.License,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.licenseName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.License,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.licenseName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.licenseName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LicensesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/licenses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LicensesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LicensesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LicensesListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
