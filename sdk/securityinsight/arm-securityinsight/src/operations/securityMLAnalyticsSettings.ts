/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { SecurityMLAnalyticsSettings } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { SecurityInsights } from "../securityInsights.js";
import {
  SecurityMLAnalyticsSettingUnion,
  SecurityMLAnalyticsSettingsListNextOptionalParams,
  SecurityMLAnalyticsSettingsListOptionalParams,
  SecurityMLAnalyticsSettingsListResponse,
  SecurityMLAnalyticsSettingsGetOptionalParams,
  SecurityMLAnalyticsSettingsGetResponse,
  SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams,
  SecurityMLAnalyticsSettingsCreateOrUpdateResponse,
  SecurityMLAnalyticsSettingsDeleteOptionalParams,
  SecurityMLAnalyticsSettingsListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing SecurityMLAnalyticsSettings operations. */
export class SecurityMLAnalyticsSettingsImpl
  implements SecurityMLAnalyticsSettings {
  private readonly client: SecurityInsights;

  /**
   * Initialize a new instance of the class SecurityMLAnalyticsSettings class.
   * @param client Reference to the service client
   */
  constructor(client: SecurityInsights) {
    this.client = client;
  }

  /**
   * Gets all Security ML Analytics Settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    workspaceName: string,
    options?: SecurityMLAnalyticsSettingsListOptionalParams
  ): PagedAsyncIterableIterator<SecurityMLAnalyticsSettingUnion> {
    const iter = this.listPagingAll(resourceGroupName, workspaceName, options);
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
        return this.listPagingPage(
          resourceGroupName,
          workspaceName,
          options,
          settings
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    workspaceName: string,
    options?: SecurityMLAnalyticsSettingsListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<SecurityMLAnalyticsSettingUnion[]> {
    let result: SecurityMLAnalyticsSettingsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, workspaceName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        workspaceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    workspaceName: string,
    options?: SecurityMLAnalyticsSettingsListOptionalParams
  ): AsyncIterableIterator<SecurityMLAnalyticsSettingUnion> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      workspaceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all Security ML Analytics Settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    workspaceName: string,
    options?: SecurityMLAnalyticsSettingsListOptionalParams
  ): Promise<SecurityMLAnalyticsSettingsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, options },
      listOperationSpec
    );
  }

  /**
   * Gets the Security ML Analytics Settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param settingsResourceName Security ML Analytics Settings resource name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    settingsResourceName: string,
    options?: SecurityMLAnalyticsSettingsGetOptionalParams
  ): Promise<SecurityMLAnalyticsSettingsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, settingsResourceName, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates the Security ML Analytics Settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param settingsResourceName Security ML Analytics Settings resource name
   * @param securityMLAnalyticsSetting The security ML Analytics setting
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    workspaceName: string,
    settingsResourceName: string,
    securityMLAnalyticsSetting: SecurityMLAnalyticsSettingUnion,
    options?: SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams
  ): Promise<SecurityMLAnalyticsSettingsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        workspaceName,
        settingsResourceName,
        securityMLAnalyticsSetting,
        options
      },
      createOrUpdateOperationSpec
    );
  }

  /**
   * Delete the Security ML Analytics Settings.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param settingsResourceName Security ML Analytics Settings resource name
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    workspaceName: string,
    settingsResourceName: string,
    options?: SecurityMLAnalyticsSettingsDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, settingsResourceName, options },
      deleteOperationSpec
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    workspaceName: string,
    nextLink: string,
    options?: SecurityMLAnalyticsSettingsListNextOptionalParams
  ): Promise<SecurityMLAnalyticsSettingsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecurityMLAnalyticsSettingsList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecurityMLAnalyticsSetting
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.settingsResourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SecurityMLAnalyticsSetting
    },
    201: {
      bodyMapper: Mappers.SecurityMLAnalyticsSetting
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.securityMLAnalyticsSetting,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.settingsResourceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.settingsResourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecurityMLAnalyticsSettingsList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
